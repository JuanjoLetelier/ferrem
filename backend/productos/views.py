import stripe
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.decorators import action, api_view, permission_classes
from django.contrib.auth.models import User
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.serializers import ModelSerializer
from .models import Producto
from .serializers import ProductoSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser']

@api_view(['GET'])
@permission_classes([IsAdminUser])
def listar_usuarios(request):
    usuarios = User.objects.all().values('id', 'username', 'email', 'is_staff', 'is_superuser')
    serializer = UserSerializer(usuarios, many=True)
    return Response(list(usuarios), status=status.HTTP_200_OK)

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all().order_by('id')
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['patch'])
    def actualizar_stock(self, request, pk=None):
        producto = self.get_object()
        nuevo_stock = request.data.get('stock')
        if nuevo_stock is None:
            return Response({"error": "Campo 'stock' requerido"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            nuevo_stock = int(nuevo_stock)
            if nuevo_stock < 0:
                return Response({"error": "Stock no puede ser negativo"}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "Stock debe ser un número entero"}, status=status.HTTP_400_BAD_REQUEST)

        producto.stock = nuevo_stock
        producto.save()
        serializer = self.get_serializer(producto)
        return Response(serializer.data)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username y password son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'El nombre de usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'Usuario creado exitosamente'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def crear_sesion_pago(request):
    items = request.data.get('items', [])
    line_items = []

    for item in items:
        line_items.append({
            'price_data': {
                'currency': 'clp',
                'product_data': {
                    'name': item['nombre'],
                },
                'unit_amount': int(float(item['precio'])),
            },
            'quantity': item['cantidad'],
        })

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url='http://localhost:4200/pago-exitoso',
            cancel_url='http://localhost:4200/pago-cancelado',
        )
        return Response({'id': session.id})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = 'tu_endpoint_secret_de_stripe'  # Reemplaza con el valor real de Stripe

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return HttpResponse(status=400)  # Payload inválido
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)  # Firma inválida

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        line_items = stripe.checkout.Session.list_line_items(session['id'], limit=100)

        for item in line_items.data:
            nombre = item.description
            cantidad = item.quantity

            try:
                producto = Producto.objects.get(nombre=nombre)
                producto.stock = max(producto.stock - cantidad, 0)
                producto.save()
            except Producto.DoesNotExist:
                pass  # Opcional: log o manejo de error

    return HttpResponse(status=200)

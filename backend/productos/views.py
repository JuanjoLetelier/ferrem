import stripe
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action, api_view
from django.contrib.auth.models import User
from django.conf import settings

from .models import Producto
from .serializers import ProductoSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
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
                'unit_amount': int(float(item['precio']) * 100),  # Stripe espera centavos
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
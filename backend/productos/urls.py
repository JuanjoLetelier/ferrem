from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, crear_sesion_pago


router = DefaultRouter()
router.register(r'productos', ProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Para /api/productos/ y demás
    path('auth/', include('productos.auth_urls')),  # Para /api/auth/token/, /api/auth/register/, etc.
    path('crear-sesion-pago/', crear_sesion_pago, name='crear_sesion_pago'),
    
]

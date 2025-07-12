from django.contrib import admin
from django.urls import path, include
from productos.views import RegisterView # type: ignore
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('productos.urls')),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', obtain_auth_token, name='api_token_auth'),
]

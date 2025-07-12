from django.contrib import admin
from django.urls import path, include
from productos.views import RegisterView # type: ignore

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('productos.urls')),
    path('api/register/', RegisterView.as_view(), name='register'),
]

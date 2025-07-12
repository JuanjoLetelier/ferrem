from django.db import models

class Producto(models.Model):
    imagen = models.URLField(max_length=500, blank=True, null=True)
    codigo = models.CharField(max_length=100, unique=True)
    marca = models.CharField(max_length=100)
    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    categoria = models.CharField(max_length=50, default="General")
    descripcion = models.TextField(blank=True, null=True)
    


    def __str__(self):
        return f"{self.nombre} - {self.codigo}"


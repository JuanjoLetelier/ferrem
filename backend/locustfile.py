from locust import HttpUser, task, between
import random

class FerremasUser(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        # Registro (tu código original)
        self.username = f"usuario_test_{random.randint(1, 1000000)}"
        self.password = "contraseña_test"
        
        self.client.post("/api/register/", json={
            "username": self.username,
            "password": self.password
        })

        # Login para obtener token
        response = self.client.post("/api/login/", json={
            "username": self.username,
            "password": self.password
        })

        if response.status_code == 200:
            self.token = response.json().get("access")
            self.headers = {"Authorization": f"Bearer {self.token}"}
        else:
            self.token = None
            self.headers = {}

    @task(2)
    def ver_productos(self):
        self.client.get("/api/productos/", headers=self.headers, name="Ver productos")

    @task(1)
    def simular_pago(self):
        self.client.post("/api/crear-sesion-pago/", headers=self.headers, json={
            "items": [
                {
                    "nombre": "Producto de prueba",
                    "precio": 1000,
                    "cantidad": 1
                }
            ]
        }, name="Simular sesión de pago")

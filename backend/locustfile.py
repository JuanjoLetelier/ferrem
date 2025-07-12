from locust import HttpUser, task, between
import random

class RegisterUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def register(self):
        unique_username = f"usuario_test_{random.randint(1, 1000000)}"
        self.client.post("/api/register/", json={
            "username": unique_username,
            "password": "contraseña_test"
        })
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
})
export class Registro {
  username = '';
  password = '';
  password2 = '';
  errorMsg = '';

  private baseUrl = 'http://localhost:8000/api';  // Ajusta si tu backend es otra ruta

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.password !== this.password2) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }
    this.http.post(`${this.baseUrl}/register/`, { username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        // Muestra el mensaje de error que envía el backend
        this.errorMsg = err.error?.error || 'Error en el registro';
      }
    });
  }
}

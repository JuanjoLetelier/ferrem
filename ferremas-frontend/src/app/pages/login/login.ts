import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
  console.log('Login con:', this.username, this.password);
  this.authService.login(this.username, this.password).subscribe({
    next: (res: any) => {
      // Guardar el token en localStorage
      localStorage.setItem('access_token', res.access);
      localStorage.setItem('refresh_token', res.refresh);

      // Redirigir al inicio u otra vista protegida
      this.router.navigate(['/']);
    },
    error: () => this.errorMsg = 'Credenciales inválidas'
  });
}

}

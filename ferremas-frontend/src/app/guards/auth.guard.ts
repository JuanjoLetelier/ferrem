import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn.pipe(
      map(isLoggedIn => {
        console.log('¿Está logueado?', isLoggedIn);
        if (isLoggedIn) {
          return true;
        } else {
          // Redirige al login si no está autenticado
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}

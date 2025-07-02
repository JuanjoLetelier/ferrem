import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { Carrito } from './pages/carrito/carrito';
import { Pago } from './pages/pago/pago';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'productos', component: Productos, canActivate: [AuthGuard] },
  { path: 'producto/:id', component: DetalleProducto, canActivate: [AuthGuard] },
  { path: 'carrito', component: Carrito, canActivate: [AuthGuard] },
  { path: 'pago', component: Pago, canActivate: [AuthGuard] },
  { path: 'registro', component: Registro },
  { path: 'login', component: Login },
  { path: '**', component: NotFound }
];

import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { Carrito } from './pages/carrito/carrito';
import { Pago } from './pages/pago/pago';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { PagoExitoso } from './pages/pago-exitoso/pago-exitoso';
import { PagoCancelado } from './pages/pago-cancelado/pago-cancelado';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'productos', component: Productos },
  { path: 'producto/:id', component: DetalleProducto, canActivate: [AuthGuard] },
  { path: 'carrito', component: Carrito, canActivate: [AuthGuard] },
  { path: 'pago', component: Pago},
  { path: 'registro', component: Registro },
  { path: 'login', component: Login },
  { path: 'pago-exitoso', component: PagoExitoso },
  { path: 'pago-cancelado', component: PagoCancelado },
  { path: '**', component: NotFound }
];

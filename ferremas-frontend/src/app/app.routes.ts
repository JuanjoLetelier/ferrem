import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { Carrito } from './pages/carrito/carrito';
import { Pago } from './pages/pago/pago';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'productos', component: Productos },
  { path: 'producto/:id', component: DetalleProducto },
  { path: 'carrito', component: Carrito },
  { path: 'pago', component: Pago},
  { path: '**', component: NotFound },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
];

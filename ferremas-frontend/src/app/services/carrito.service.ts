import { Injectable } from '@angular/core';
import { Producto } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];

  agregar(producto: Producto) {
    this.carrito.push(producto);
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
  }

  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  total(): number {
    return this.carrito.reduce((sum, p) => sum + p.precio, 0);
  }
}

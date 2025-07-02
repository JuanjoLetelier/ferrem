import { Injectable } from '@angular/core';
import { Producto } from './productos.service';

export interface ProductoEnCarrito extends Producto {
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: ProductoEnCarrito[] = [];

  agregar(producto: Producto) {
    const item = this.carrito.find(p => p.id === producto.id);
    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  eliminar(productoId: number) {
    this.carrito = this.carrito.filter(p => p.id !== productoId);
  }

  disminuir(productoId: number) {
    const item = this.carrito.find(p => p.id === productoId);
    if (item) {
      if (item.cantidad > 1) {
        item.cantidad--;
      } else {
        this.eliminar(productoId);
      }
    }
  }

  limpiarCarrito() {
    this.carrito = [];
  }

  obtenerCarrito(): ProductoEnCarrito[] {
    return this.carrito;
  }

  total(): number {
    return this.carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  }
}

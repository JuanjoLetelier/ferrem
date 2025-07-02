import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../services/productos.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  carrito: Producto[] = [];

  constructor(private carritoService: CarritoService) {
    this.carrito = carritoService.obtenerCarrito();
  }

  eliminarProducto(index: number) {
    this.carritoService.eliminar(index);
  }

  obtenerTotal(): number {
    return this.carritoService.total();
  }
}

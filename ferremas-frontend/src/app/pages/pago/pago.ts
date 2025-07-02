import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../services/productos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pago.html',
  styleUrls: ['./pago.css']
})
export class Pago {
  carrito: Producto[] = [];

  constructor(private carritoService: CarritoService) {
    this.carrito = carritoService.obtenerCarrito();
  }

  obtenerTotal(): number {
    return this.carritoService.total();
  }

  pagar() {
    alert('¡Pago realizado con éxito!');
    this.carrito.length = 0; // Limpia el carrito visualmente
    this.carritoService['carrito'] = []; // Limpia internamente
  }
}

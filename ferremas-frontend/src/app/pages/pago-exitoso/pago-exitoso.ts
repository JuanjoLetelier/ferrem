import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CarritoService } from '../../services/carrito.service';
import { ProductosService } from '../../services/productos.service';
import { ProductoEnCarrito } from '../../services/carrito.service';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-exitoso.html',
  styleUrls: ['./pago-exitoso.css']
})
export class PagoExitoso implements OnInit {
  carrito: ProductoEnCarrito[] = [];

  constructor(
    private carritoService: CarritoService,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carritoService.limpiarCarrito();
    const carritoStr = sessionStorage.getItem('carrito');
    this.carrito = carritoStr ? JSON.parse(carritoStr) : [];

    const actualizaciones = this.carrito.map(item => {
      const nuevoStock = item.stock - item.cantidad;
      return this.productosService.updateStock(item.id, nuevoStock).toPromise();
    });

    Promise.all(actualizaciones)
      .then(() => {
        this.carritoService.limpiarCarrito();
        sessionStorage.removeItem('carrito'); // ✅ Aquí borras el carrito persistido
      })
      .catch(error => {
        console.error('Error al actualizar stock después del pago:', error);
      });
  }

  volverAProductos() {
    this.router.navigate(['/productos']);
  }
}
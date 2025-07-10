import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductoEnCarrito, CarritoService } from '../../services/carrito.service';
import { ProductosService } from '../../services/productos.service';

declare var Stripe: any;

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pago.html',
  styleUrls: ['./pago.css']
})
export class Pago {
  carrito: ProductoEnCarrito[] = [];

  constructor(
    private carritoService: CarritoService,
    private productosService: ProductosService
  ) {
    this.carrito = carritoService.obtenerCarrito();
  }

  obtenerTotal(): number {
    return this.carritoService.total();
  }

  pagar() {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const stripe = Stripe('pk_test_51RjJQ52Lm4takNpeEaI3KwgyNgbDecPKclv1k6WICW3WRhU0VZGO91KHIl1cpj8rkJVLLL4vI35zOH5qY1bYEJpy00AzYit0YJ'); // Usa tu clave pública

    const itemsParaPago = this.carrito.map(item => ({
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad
    }));

    this.productosService.crearSesionPago(itemsParaPago).subscribe({
      next: (response: any) => {
        stripe.redirectToCheckout({ sessionId: response.id });
      },
      error: (err) => {
        console.error('Error iniciando sesión de pago', err);
        alert('Hubo un problema con el pago.');
      }
    });
  }

  simularPago() {
  if (this.carrito.length === 0) {
    alert('El carrito está vacío');
    return;
  }

  const actualizaciones = this.carrito.map(item => {
    const nuevoStock = item.stock - item.cantidad;
    return this.productosService.updateStock(item.id, nuevoStock).toPromise().then(productoActualizado => {
      if (!productoActualizado) {
        throw new Error(`No se recibió el producto actualizado con ID ${item.id}`);
      }
    this.productosService.emitirProductoActualizado(productoActualizado.id, productoActualizado.stock);
    });
  });

    Promise.all(actualizaciones)
      .then(() => {
        alert('🧪 Simulación de pago exitosa. Stock actualizado.');
        this.carritoService.limpiarCarrito();
        this.carrito = [];
      })
      .catch(error => {
        console.error('Error simulando pago:', error);
        alert('Error al simular el pago.');
      });
  }
  
}




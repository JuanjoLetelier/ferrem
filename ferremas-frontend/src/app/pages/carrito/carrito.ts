import { Component, OnInit } from '@angular/core';
import { CarritoService, ProductoEnCarrito } from '../../services/carrito.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
  imports: [CommonModule]})
export class Carrito implements OnInit {
  carrito: ProductoEnCarrito[] = [];
  total = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.carritoService.total();
  }

  eliminarProducto(id: number) {
    this.carritoService.eliminar(id);
    this.cargarCarrito();
  }

  disminuirCantidad(id: number) {
    this.carritoService.disminuir(id);
    this.cargarCarrito();
  }

  aumentarCantidad(producto: ProductoEnCarrito) {
    this.carritoService.agregar(producto);
    this.cargarCarrito();
  }

  limpiarCarrito() {
    this.carritoService.limpiarCarrito();
    this.cargarCarrito();
  }
}

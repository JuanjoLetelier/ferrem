import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto, ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule],
})
export class Productos implements OnInit {

  productos: Producto[] = [];
  cantidadPorProducto: { [id: number]: number } = {};
  descripcionExpandida: { [id: number]: boolean } = {};

  constructor(
    private productoService: ProductosService,
    private carritoService: CarritoService 
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        console.log(data);
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
    
    this.productoService.productosActualizados$.subscribe(actualizado => {
      if (actualizado) {
        this.actualizarStockLocal(actualizado.id, actualizado.stock);
      }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    const input = prompt(`¿Cuántas unidades de "${producto.nombre}" quieres agregar al carrito? (Stock disponible: ${producto.stock})`);
    
    if (!input) return;
    const cantidad = parseInt(input, 10);

    if (isNaN(cantidad) || cantidad <= 0) {
      alert('Ingresa una cantidad válida.');
      return;
    }

    if (cantidad > producto.stock) {
      alert(`No puedes agregar más que el stock disponible (${producto.stock}).`);
      return;
    }

    this.carritoService.agregar(producto, cantidad);
    alert(`${cantidad} unidad(es) de "${producto.nombre}" agregadas al carrito.`);
  }

  actualizarStockLocal(id: number, nuevoStock: number) {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index].stock = nuevoStock;
    }
  }

  trackByProducto(index: number, producto: any): number {
    return producto.id;
  }

  toggleDescripcion(id: number) {
    this.descripcionExpandida[id] = !this.descripcionExpandida[id];
  }
}

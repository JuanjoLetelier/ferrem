import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service'; 
import { Producto } from '../../services/productos.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
  productos: Producto[] = [];
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        console.log(data);
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
    
    this.productosService.productosActualizados$.subscribe(actualizado => {
      if (actualizado) {
        this.actualizarStockLocal(actualizado.id, actualizado.stock);
      }
    });
  }

  actualizarStockLocal(id: number, nuevoStock: number) {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index].stock = nuevoStock;
    }
  }
//
//agregarAlCarrito(producto: any) {
//  const cantidad = parseInt(prompt('¿Cuántos deseas agregar?') || '1', 10);
// if (!isNaN(cantidad) && cantidad > 0) {
//    this.carritoService.agregarProducto(producto, cantidad);
//    alert('Producto agregado al carrito');
//  } else {
//    alert('Cantidad inválida');
//  }
//} 

}

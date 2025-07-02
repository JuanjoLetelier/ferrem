import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductosService, Producto } from '../../services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  private productosService = inject(ProductosService);

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }
}

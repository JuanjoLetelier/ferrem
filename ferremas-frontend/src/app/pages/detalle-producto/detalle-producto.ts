import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService, Producto } from '../../services/productos.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.html',
  styleUrls: ['./detalle-producto.css']
})
export class DetalleProducto implements OnInit {
  producto?: Producto;
  private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);
  private carritoService = inject(CarritoService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProducto(id).subscribe({
      next: (data) => this.producto = data,
      error: (err) => console.error('Error al cargar producto', err)
    });
  }
  agregarAlCarrito() {
  if (this.producto) {
    this.carritoService.agregar(this.producto);
    alert('Producto agregado al carrito');
  }
}
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../servicios/carrito';// ajusta si está en otra ruta
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  constructor(private carritoService: CarritoService) {}
  // Array de productos destacados para el carrusel
  featuredProducts = [
    {
    name: 'Taladro Bosch',
    description: 'Potente taladro con percutor.',
    image: 'assets/productos/taladro_bosch.png'
    }
    ,
    {
      name: 'Martillo Stanley',
      description: 'Mango de fibra, cabezal de acero.',
      image: 'assets/productos/Martillo Stanley.png'
    },
    {
      name: 'Sierra Circular',
      description: 'Ideal para cortes precisos.',
      image: 'assets/productos/Sierra Circular.png'
    }
  ];

  // Array de otros productos que se mostrarán como cards debajo
  otherProducts = [
    {
      name: 'Llave Inglesa',
      description: 'Ajustable y resistente.',
      image: 'assets/productos/Llave Inglesa.png',
      price: 1200
    },
    {
      name: 'Caja de Herramientas',
      description: 'Incluye 50 piezas.',
      image: 'assets/productos/Caja de Herramientas.png',
      price: 7500
    },
    {
      name: 'Escalera de Aluminio',
      description: 'Plegable y ligera.',
      image: 'assets/productos/Escalera de Aluminio.png',
      price: 4500
    },
    {
      name: 'Caja de Herramientas',
      description: 'Incluye 50 piezas.',
      image: 'assets/productos/Caja de Herramientas.png',
      price: 7500
    },
    {
      name: 'Llave Inglesa',
      description: 'Ajustable y resistente.',
      image: 'assets/productos/Llave Inglesa.png',
      price: 1200
    },
  ];

agregarAlCarrito(producto: any) {
  const cantidad = parseInt(prompt('¿Cuántos deseas agregar?') || '1', 10);
  if (!isNaN(cantidad) && cantidad > 0) {
    this.carritoService.agregarProducto(producto, cantidad);
    alert('Producto agregado al carrito');
  } else {
    alert('Cantidad inválida');
  }
}

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-cancelado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-cancelado.html',
  styleUrls: ['./pago-cancelado.css']
})
export class PagoCancelado {
  constructor(private router: Router) {}

  volverAProductos() {
    this.router.navigate(['/productos']);
  }
}

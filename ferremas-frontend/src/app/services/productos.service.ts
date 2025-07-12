import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  codigo: string;
  marca: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  descripcion?: string;
  imagen: URL;
}

@Injectable({
  providedIn: 'root' // se provee globalmente
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000/api/productos'; // sin barra al final
  private productosActualizadosSubject = new BehaviorSubject<{id: number, stock: number} | null>(null);
  productosActualizados$: Observable<{id: number, stock: number} | null> = this.productosActualizadosSubject.asObservable();

  constructor(private http: HttpClient) {}

  emitirProductoActualizado(id: number, stock: number) {
    this.productosActualizadosSubject.next({ id, stock });
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/`);
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  updateStock(id: number, nuevoStock: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}/actualizar_stock/`, { stock: nuevoStock });
  }

  crearSesionPago(items: any[]) {
    return this.http.post<any>('http://localhost:8000/api/crear-sesion-pago/', { items });
  }
}

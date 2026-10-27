import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../Entity/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private Url = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.Url + '/productos');
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.Url + `/productos/${id}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.Url + '/create_producto', producto);
  }

  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.Url + `/update_producto/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(this.Url + `/delete_producto/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoProducto } from '../Entity/EstadoProducto';

@Injectable({
  providedIn: 'root'
})
export class EstadoProductoService {

  private Url = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getEstados(): Observable<EstadoProducto[]> {
    return this.http.get<EstadoProducto[]>(this.Url + '/estados_producto');
  }
}

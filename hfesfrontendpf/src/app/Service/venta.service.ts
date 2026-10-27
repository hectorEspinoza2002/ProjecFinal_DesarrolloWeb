import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../Entity/Venta';
import { VentaDetalle } from '../Entity/VentaDetalle';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private Url = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.Url + '/ventas');
  }

  getVentaDetalles(): Observable<VentaDetalle[]> {
    return this.http.get<VentaDetalle[]>(this.Url + '/venta_detalles');
  }

  createVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.Url + '/create_venta', venta);
  }

  createVentaDetalle(detalle: VentaDetalle): Observable<VentaDetalle> {
    return this.http.post<VentaDetalle>(this.Url + '/create_venta_detalle', detalle);
  }
}

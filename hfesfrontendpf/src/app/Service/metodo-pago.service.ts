import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetodoPago } from '../Entity/MetodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  private Url = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getMetodosPago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.Url + '/metodos_pago');
  }
}

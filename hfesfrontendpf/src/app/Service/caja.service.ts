import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caja } from '../Entity/Caja';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private Url = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getCajas(): Observable<Caja[]> {
    return this.http.get<Caja[]>(this.Url + '/cajas');
  }
}

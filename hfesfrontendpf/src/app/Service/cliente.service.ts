import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../Entity/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private Url = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.Url + '/clientes');
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.Url + `/clientes/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.Url + '/create_cliente', cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.Url + `/update_cliente/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(this.Url + `/delete_cliente/${id}`);
  }
}

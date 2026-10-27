import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Entity/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private Url = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.Url + '/usuarios');
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.Url + `/usuarios/${id}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.Url + '/create_usuario', usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.Url + `/update_usuario/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(this.Url + `/delete_usuario/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../Entity/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private Url = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.Url + '/roles');
  }

  getRolById(id: number): Observable<Rol> {
    return this.http.get<Rol>(this.Url + `/roles/${id}`);
  }

  createRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.Url + '/create_rol', rol);
  }

  updateRol(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(this.Url + `/update_role/${id}`, rol);
  }

  deleteRol(id: number): Observable<void> {
    return this.http.delete<void>(this.Url + `/delete_role/${id}`);
  }
}

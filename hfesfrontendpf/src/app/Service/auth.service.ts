import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { Usuario } from '../Entity/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Url = 'http://localhost:9090';
  private SESSION_KEY = 'usuario_sesion';

  constructor(private http: HttpClient) {}

  /** Busca el usuario por nombre de usuario y valida password y estado */
  login(nombreUsuario: string, password: string): Observable<Usuario> {
    return this.http.get<Usuario[]>(this.Url + '/usuarios').pipe(
      map(usuarios => {
        const encontrado = usuarios.find(
          u => u.usuario === nombreUsuario && u.password === password
        );
        if (!encontrado) {
          throw new Error('Usuario o contraseña incorrectos.');
        }
        if (encontrado.estado !== 1) {
          throw new Error('Tu cuenta está inactiva. Contacta al administrador.');
        }
        this.guardarSesion(encontrado);
        return encontrado;
      })
    );
  }

  guardarSesion(usuario: Usuario): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(usuario));
  }

  getUsuarioSesion(): Usuario | null {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }

  getRolId(): number {
    return this.getUsuarioSesion()?.rol?.idRole ?? 0;
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  estaLogueado(): boolean {
    return !!this.getUsuarioSesion();
  }
}

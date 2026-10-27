import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { Usuario } from '../../Entity/Usuario';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {

  usuario: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioSesion();
  }

  get estadoLabel(): string {
    return this.usuario?.estado === 1 ? 'Activo' : 'Inactivo';
  }

  get estadoClase(): string {
    return this.usuario?.estado === 1 ? 'badge badge-activo' : 'badge badge-inactivo';
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

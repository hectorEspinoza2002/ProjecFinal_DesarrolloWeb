import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { Usuario } from '../../Entity/Usuario';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {

  usuario: Usuario | null = null;
  rolId: number = 0;

  // Roles: 1=Admin, 2=Sub Admin, 3=Cajero, 4=Limpieza
  get esAdmin(): boolean { return this.rolId === 1; }
  get esSubAdmin(): boolean { return this.rolId === 2; }
  get esCajero(): boolean { return this.rolId === 3; }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioSesion();
    this.rolId = this.authService.getRolId();

    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

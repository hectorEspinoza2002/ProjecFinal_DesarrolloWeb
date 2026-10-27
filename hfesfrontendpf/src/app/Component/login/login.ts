import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  nombreUsuario: string = '';
  password: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login(): void {
    this.mensajeError = '';

    if (!this.nombreUsuario.trim() || !this.password.trim()) {
      this.mensajeError = 'Ingresa usuario y contraseña.';
      return;
    }

    this.cargando = true;

    this.authService.login(this.nombreUsuario, this.password).subscribe({
      next: (usuario) => {
        this.cargando = false;
        const rolId = usuario.rol?.idRole;

        // Cajero va al punto de venta, los demás al menú principal
        if (rolId === 3) {
          this.router.navigate(['/punto-venta']);
        } else {
          this.router.navigate(['/']);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = err.message;
        this.cdr.detectChanges();
      }
    });
  }
}

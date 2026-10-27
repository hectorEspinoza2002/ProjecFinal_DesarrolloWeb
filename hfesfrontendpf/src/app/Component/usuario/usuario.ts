import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Entity/Usuario';
import { Rol } from '../../Entity/Rol';
import { UsuarioService } from '../../Service/usuario.service';
import { RolService } from '../../Service/rol.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles: Rol[] = [];

  usuarioSeleccionado: Usuario = this.nuevoUsuario();
  modoEdicion: boolean = false;
  mostrarFormulario: boolean = false;
  mensajeError: string = '';

  rolIdSeleccionado: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  nuevoUsuario(): Usuario {
    const u = new Usuario();
    u.rol = new Rol();
    u.estado = 1;
    return u;
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => { this.usuarios = data; this.cdr.detectChanges(); },
      error: (err) => { this.mensajeError = 'Error al cargar usuarios: ' + err.message; this.cdr.detectChanges(); }
    });
  }

  cargarRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (data) => { this.roles = data; this.cdr.detectChanges(); },
      error: (err) => { this.mensajeError = 'Error al cargar roles: ' + err.message; this.cdr.detectChanges(); }
    });
  }

  abrirFormularioNuevo(): void {
    this.usuarioSeleccionado = this.nuevoUsuario();
    this.rolIdSeleccionado = 0;
    this.modoEdicion = false;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario, rol: { ...usuario.rol } };
    this.rolIdSeleccionado = usuario.rol?.idRole ?? 0;
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  guardar(): void {
    if (!this.usuarioSeleccionado.nombre?.trim()) {
      this.mensajeError = 'El nombre es obligatorio.';
      return;
    }
    if (!this.usuarioSeleccionado.usuario?.trim()) {
      this.mensajeError = 'El nombre de usuario es obligatorio.';
      return;
    }
    if (!this.modoEdicion && !this.usuarioSeleccionado.password?.trim()) {
      this.mensajeError = 'La contraseña es obligatoria.';
      return;
    }
    if (!this.rolIdSeleccionado) {
      this.mensajeError = 'Debe seleccionar un rol.';
      return;
    }

    const rolEncontrado = this.roles.find(r => r.idRole === +this.rolIdSeleccionado);
    if (rolEncontrado) this.usuarioSeleccionado.rol = rolEncontrado;

    if (this.modoEdicion) {
      this.usuarioService.updateUsuario(this.usuarioSeleccionado.idUsuario, this.usuarioSeleccionado).subscribe({
        next: () => { this.cargarUsuarios(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al actualizar: ' + err.message; this.cdr.detectChanges(); }
      });
    } else {
      this.usuarioService.createUsuario(this.usuarioSeleccionado).subscribe({
        next: () => { this.cargarUsuarios(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al crear: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Desea eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => { this.mensajeError = 'Error al eliminar: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.usuarioSeleccionado = this.nuevoUsuario();
    this.rolIdSeleccionado = 0;
    this.mensajeError = '';
  }

  estadoLabel(estado: number): string {
    return estado === 1 ? 'Activo' : 'Inactivo';
  }
}

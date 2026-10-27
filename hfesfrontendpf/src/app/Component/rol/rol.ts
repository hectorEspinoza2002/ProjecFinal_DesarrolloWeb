import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rol } from '../../Entity/Rol';
import { RolService } from '../../Service/rol.service';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rol.html',
  styleUrl: './rol.css'
})
export class RolComponent implements OnInit {

  roles: Rol[] = [];
  rolSeleccionado: Rol = new Rol();
  modoEdicion: boolean = false;
  mostrarFormulario: boolean = false;
  mensajeError: string = '';

  constructor(private rolService: RolService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (data) => { this.roles = data; this.cdr.detectChanges(); },
      error: (err) => { this.mensajeError = 'Error al cargar roles: ' + err.message; this.cdr.detectChanges(); }
    });
  }

  abrirFormularioNuevo(): void {
    this.rolSeleccionado = new Rol();
    this.modoEdicion = false;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  editarRol(rol: Rol): void {
    this.rolSeleccionado = { ...rol };
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  guardar(): void {
    if (!this.rolSeleccionado.nombre?.trim()) {
      this.mensajeError = 'El nombre del rol es obligatorio.';
      return;
    }

    if (this.modoEdicion) {
      this.rolService.updateRol(this.rolSeleccionado.idRole, this.rolSeleccionado).subscribe({
        next: () => { this.cargarRoles(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al actualizar: ' + err.message; this.cdr.detectChanges(); }
      });
    } else {
      this.rolService.createRol(this.rolSeleccionado).subscribe({
        next: () => { this.cargarRoles(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al crear: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Desea eliminar este rol?')) {
      this.rolService.deleteRol(id).subscribe({
        next: () => this.cargarRoles(),
        error: (err) => { this.mensajeError = 'Error al eliminar: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.rolSeleccionado = new Rol();
    this.mensajeError = '';
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../Entity/Cliente';
import { ClienteService } from '../../Service/cliente.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente = new Cliente();
  modoEdicion: boolean = false;
  mostrarFormulario: boolean = false;
  mensajeError: string = '';

  constructor(private clienteService: ClienteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => { this.clientes = data; this.cdr.detectChanges(); },
      error: (err) => { this.mensajeError = 'Error al cargar clientes: ' + err.message; this.cdr.detectChanges(); }
    });
  }

  abrirFormularioNuevo(): void {
    this.clienteSeleccionado = new Cliente();
    this.modoEdicion = false;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  editarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = { ...cliente };
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  guardar(): void {
    if (!this.clienteSeleccionado.nombre?.trim()) {
      this.mensajeError = 'El nombre del cliente es obligatorio.';
      return;
    }
    if (!this.clienteSeleccionado.nit?.trim()) {
      this.mensajeError = 'El NIT es obligatorio.';
      return;
    }

    if (this.modoEdicion) {
      this.clienteService.updateCliente(this.clienteSeleccionado.idCliente, this.clienteSeleccionado).subscribe({
        next: () => { this.cargarClientes(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al actualizar: ' + err.message; this.cdr.detectChanges(); }
      });
    } else {
      this.clienteService.createCliente(this.clienteSeleccionado).subscribe({
        next: () => { this.cargarClientes(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al crear: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Desea eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => this.cargarClientes(),
        error: (err) => { this.mensajeError = 'Error al eliminar: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.clienteSeleccionado = new Cliente();
    this.mensajeError = '';
  }
}

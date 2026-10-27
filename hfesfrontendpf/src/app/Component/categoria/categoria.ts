import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../Entity/Categoria';
import { CategoriaService } from '../../Service/categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria = new Categoria();
  modoEdicion: boolean = false;
  mostrarFormulario: boolean = false;
  mensajeError: string = '';

  constructor(private categoriaService: CategoriaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => { this.categorias = data; this.cdr.detectChanges(); },
      error: (err) => { this.mensajeError = 'Error al cargar categorías: ' + err.message; this.cdr.detectChanges(); }
    });
  }

  abrirFormularioNuevo(): void {
    this.categoriaSeleccionada = new Categoria();
    this.modoEdicion = false;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  editarCategoria(categoria: Categoria): void {
    this.categoriaSeleccionada = { ...categoria };
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  guardar(): void {
    if (!this.categoriaSeleccionada.nombre?.trim()) {
      this.mensajeError = 'El nombre de la categoría es obligatorio.';
      return;
    }

    if (this.modoEdicion) {
      this.categoriaService.updateCategoria(this.categoriaSeleccionada.idCategoria, this.categoriaSeleccionada).subscribe({
        next: () => { this.cargarCategorias(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al actualizar: ' + err.message; this.cdr.detectChanges(); }
      });
    } else {
      this.categoriaService.createCategoria(this.categoriaSeleccionada).subscribe({
        next: () => { this.cargarCategorias(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al crear: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Desea eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe({
        next: () => this.cargarCategorias(),
        error: (err) => { this.mensajeError = 'Error al eliminar: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.categoriaSeleccionada = new Categoria();
    this.mensajeError = '';
  }
}

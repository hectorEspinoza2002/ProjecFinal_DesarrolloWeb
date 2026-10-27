import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../Entity/Producto';
import { Categoria } from '../../Entity/Categoria';
import { EstadoProducto } from '../../Entity/EstadoProducto';
import { ProductoService } from '../../Service/producto.service';
import { CategoriaService } from '../../Service/categoria.service';
import { EstadoProductoService } from '../../Service/estado-producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  categorias: Categoria[] = [];
  estadosProducto: EstadoProducto[] = [];

  productoSeleccionado: Producto = this.nuevoProducto();
  modoEdicion: boolean = false;
  mostrarFormulario: boolean = false;
  mensajeError: string = '';

  categoriaIdSeleccionada: number = 0;
  estadoIdSeleccionado: number = 0;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private estadoProductoService: EstadoProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
    this.cargarEstados();
  }

  nuevoProducto(): Producto {
    const p = new Producto();
    p.categoria = new Categoria();
    p.estadoProducto = new EstadoProducto();
    return p;
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => { this.productos = data; this.cdr.detectChanges(); },
      error: (err) => { this.mensajeError = 'Error al cargar productos: ' + err.message; this.cdr.detectChanges(); }
    });
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => { this.categorias = data; this.cdr.detectChanges(); },
      error: (err) => { this.mensajeError = 'Error al cargar categorías: ' + err.message; this.cdr.detectChanges(); }
    });
  }

  cargarEstados(): void {
    this.estadoProductoService.getEstados().subscribe({
      next: (data) => { this.estadosProducto = data; this.cdr.detectChanges(); },
      error: (err) => { this.mensajeError = 'Error al cargar estados: ' + err.message; this.cdr.detectChanges(); }
    });
  }

  abrirFormularioNuevo(): void {
    this.productoSeleccionado = this.nuevoProducto();
    this.categoriaIdSeleccionada = 0;
    this.estadoIdSeleccionado = 0;
    this.modoEdicion = false;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  editarProducto(producto: Producto): void {
    this.productoSeleccionado = {
      ...producto,
      categoria: { ...producto.categoria },
      estadoProducto: { ...producto.estadoProducto }
    };
    this.categoriaIdSeleccionada = producto.categoria?.idCategoria ?? 0;
    this.estadoIdSeleccionado = producto.estadoProducto?.idEstadoProducto ?? 0;
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  guardar(): void {
    if (!this.productoSeleccionado.nombre?.trim()) {
      this.mensajeError = 'El nombre del producto es obligatorio.';
      return;
    }
    if (!this.categoriaIdSeleccionada) {
      this.mensajeError = 'Debe seleccionar una categoría.';
      return;
    }
    if (!this.estadoIdSeleccionado) {
      this.mensajeError = 'Debe seleccionar un estado.';
      return;
    }

    const catEncontrada = this.categorias.find(c => c.idCategoria === +this.categoriaIdSeleccionada);
    const estadoEncontrado = this.estadosProducto.find(e => e.idEstadoProducto === +this.estadoIdSeleccionado);

    if (catEncontrada) this.productoSeleccionado.categoria = catEncontrada;
    if (estadoEncontrado) this.productoSeleccionado.estadoProducto = estadoEncontrado;

    if (this.modoEdicion) {
      this.productoService.updateProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado).subscribe({
        next: () => { this.cargarProductos(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al actualizar: ' + err.message; this.cdr.detectChanges(); }
      });
    } else {
      this.productoService.createProducto(this.productoSeleccionado).subscribe({
        next: () => { this.cargarProductos(); this.cancelar(); },
        error: (err) => { this.mensajeError = 'Error al crear: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Desea eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => { this.mensajeError = 'Error al eliminar: ' + err.message; this.cdr.detectChanges(); }
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.productoSeleccionado = this.nuevoProducto();
    this.categoriaIdSeleccionada = 0;
    this.estadoIdSeleccionado = 0;
    this.mensajeError = '';
  }
}

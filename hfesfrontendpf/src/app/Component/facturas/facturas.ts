import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../Service/venta.service';
import { Venta } from '../../Entity/Venta';
import { VentaDetalle } from '../../Entity/VentaDetalle';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './facturas.html',
  styleUrl: './facturas.css'
})
export class FacturasComponent implements OnInit {

  ventas: Venta[] = [];
  detallesTotal: VentaDetalle[] = [];

  ventaSeleccionada: Venta | null = null;
  detallesVenta: VentaDetalle[] = [];

  busqueda: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  constructor(
    private ventaService: VentaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;

    this.ventaService.getVentas().subscribe({
      next: (ventas) => {
        // Ordenar por fecha descendente
        this.ventas = ventas.sort((a, b) =>
          new Date(b.fechaVenta).getTime() - new Date(a.fechaVenta).getTime()
        );
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.mensajeError = 'Error al cargar ventas: ' + err.message;
        this.cdr.detectChanges();
      }
    });

    this.ventaService.getVentaDetalles().subscribe({
      next: (detalles) => {
        this.detallesTotal = detalles;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => { this.cargando = false; }
    });
  }

  get ventasFiltradas(): Venta[] {
    if (!this.busqueda.trim()) return this.ventas;
    const q = this.busqueda.toLowerCase();
    return this.ventas.filter(v =>
      v.numeroFactura?.toLowerCase().includes(q) ||
      v.usuario?.nombre?.toLowerCase().includes(q) ||
      v.cliente?.nombre?.toLowerCase().includes(q)
    );
  }

  seleccionarVenta(venta: Venta): void {
    this.ventaSeleccionada = venta;
    // Filtrar detalles que pertenecen a esta venta
    this.detallesVenta = this.detallesTotal.filter(
      d => d.venta?.idVenta === venta.idVenta
    );
    this.cdr.detectChanges();
  }

  cerrarDetalle(): void {
    this.ventaSeleccionada = null;
    this.detallesVenta = [];
  }

  get totalDetalles(): number {
    return this.detallesVenta.reduce((acc, d) => acc + Number(d.subtotal), 0);
  }
}

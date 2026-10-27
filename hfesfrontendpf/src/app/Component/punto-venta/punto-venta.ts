import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { ProductoService } from '../../Service/producto.service';
import { MetodoPagoService } from '../../Service/metodo-pago.service';
import { CajaService } from '../../Service/caja.service';
import { VentaService } from '../../Service/venta.service';
import { Producto } from '../../Entity/Producto';
import { MetodoPago } from '../../Entity/MetodoPago';
import { Caja } from '../../Entity/Caja';
import { Usuario } from '../../Entity/Usuario';
import { Venta } from '../../Entity/Venta';
import { VentaDetalle } from '../../Entity/VentaDetalle';
import { Cliente } from '../../Entity/Cliente';

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-punto-venta',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './punto-venta.html',
  styleUrl: './punto-venta.css'
})
export class PuntoVentaComponent implements OnInit {

  usuarioSesion: Usuario | null = null;
  cajaAsignada: Caja | null = null;

  productos: Producto[] = [];
  metodosPago: MetodoPago[] = [];
  carrito: ItemCarrito[] = [];

  metodoPagoSeleccionado: number = 0;
  busqueda: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';
  procesando: boolean = false;

  constructor(
    private authService: AuthService,
    private productoService: ProductoService,
    private metodoPagoService: MetodoPagoService,
    private cajaService: CajaService,
    private ventaService: VentaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuarioSesion = this.authService.getUsuarioSesion();
    if (!this.usuarioSesion) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarProductos();
    this.cargarMetodosPago();
    this.cargarCajaAsignada();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => { this.productos = data; this.cdr.detectChanges(); },
      error: () => {}
    });
  }

  cargarMetodosPago(): void {
    this.metodoPagoService.getMetodosPago().subscribe({
      next: (data) => { this.metodosPago = data; this.cdr.detectChanges(); },
      error: () => {}
    });
  }

  cargarCajaAsignada(): void {
    this.cajaService.getCajas().subscribe({
      next: (cajas) => {
        this.cajaAsignada = cajas.find(
          c => c.usuario?.idUsuario === this.usuarioSesion?.idUsuario
        ) ?? null;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  get productosFiltrados(): Producto[] {
    if (!this.busqueda.trim()) return this.productos;
    const q = this.busqueda.toLowerCase();
    return this.productos.filter(p =>
      p.nombre?.toLowerCase().includes(q) ||
      p.codigoBarras?.toLowerCase().includes(q)
    );
  }

  agregarAlCarrito(producto: Producto): void {
    const existente = this.carrito.find(i => i.producto.idProducto === producto.idProducto);
    if (existente) {
      existente.cantidad++;
      existente.subtotal = existente.cantidad * Number(existente.producto.precioVenta);
    } else {
      this.carrito.push({
        producto,
        cantidad: 1,
        subtotal: Number(producto.precioVenta)
      });
    }
  }

  cambiarCantidad(item: ItemCarrito, delta: number): void {
    item.cantidad += delta;
    if (item.cantidad <= 0) {
      this.quitarDelCarrito(item);
      return;
    }
    item.subtotal = item.cantidad * Number(item.producto.precioVenta);
  }

  quitarDelCarrito(item: ItemCarrito): void {
    this.carrito = this.carrito.filter(i => i !== item);
  }

  get total(): number {
    return this.carrito.reduce((acc, i) => acc + i.subtotal, 0);
  }

  limpiarCarrito(): void {
    this.carrito = [];
    this.metodoPagoSeleccionado = 0;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  procesarVenta(): void {
    if (this.carrito.length === 0) {
      this.mensajeError = 'El carrito está vacío.';
      return;
    }
    if (!this.metodoPagoSeleccionado) {
      this.mensajeError = 'Selecciona un método de pago.';
      return;
    }
    if (!this.cajaAsignada) {
      this.mensajeError = 'No tienes una caja asignada.';
      return;
    }

    // Validar stock antes de procesar
    for (const item of this.carrito) {
      if (item.cantidad > (item.producto.stock ?? 0)) {
        this.mensajeError = `Stock insuficiente para "${item.producto.nombre}". Disponible: ${item.producto.stock}`;
        return;
      }
    }

    this.procesando = true;
    this.mensajeError = '';

    const metodo = this.metodosPago.find(m => m.idMetodoPago === +this.metodoPagoSeleccionado)!;
    const clienteGenerico = new Cliente();
    clienteGenerico.idCliente = 1;

    const venta = new Venta();
    venta.caja = this.cajaAsignada;
    venta.cliente = clienteGenerico;
    venta.usuario = this.usuarioSesion!;
    venta.numeroFactura = 'F-' + Date.now();
    venta.fechaVenta = new Date().toISOString();
    venta.total = this.total;
    venta.metodoPago = metodo;

    this.ventaService.createVenta(venta).subscribe({
      next: (ventaCreada) => {
        // Guardar cada detalle
        const detallesPromesas = this.carrito.map(item => {
          const detalle = new VentaDetalle();
          detalle.venta = ventaCreada;
          detalle.producto = item.producto;
          detalle.cantidad = item.cantidad;
          detalle.precioUnitario = item.producto.precioVenta;
          detalle.subtotal = item.subtotal;
          return { detalle, item };
        });

        let pendientes = detallesPromesas.length;

        detallesPromesas.forEach(({ detalle, item }) => {
          this.ventaService.createVentaDetalle(detalle).subscribe({
            next: () => {
              // Descontar stock del producto
              const productoActualizado = { ...item.producto };
              productoActualizado.stock = (item.producto.stock ?? 0) - item.cantidad;

              this.productoService.updateProducto(
                item.producto.idProducto,
                productoActualizado
              ).subscribe({
                next: (productoGuardado) => {
                  // Actualizar el stock en la lista local
                  const idx = this.productos.findIndex(p => p.idProducto === productoGuardado.idProducto);
                  if (idx !== -1) this.productos[idx].stock = productoGuardado.stock;

                  pendientes--;
                  if (pendientes === 0) {
                    this.procesando = false;
                    this.mensajeExito = `Venta registrada. Factura: ${ventaCreada.numeroFactura}`;
                    this.limpiarCarrito();
                    this.cdr.detectChanges();
                  }
                },
                error: () => {
                  // Si falla el update de stock, igual terminar
                  pendientes--;
                  if (pendientes === 0) {
                    this.procesando = false;
                    this.mensajeExito = `Venta registrada. Factura: ${ventaCreada.numeroFactura}`;
                    this.limpiarCarrito();
                    this.cdr.detectChanges();
                  }
                }
              });
            },
            error: (err) => {
              this.procesando = false;
              this.mensajeError = 'Error al guardar detalle: ' + err.message;
              this.cdr.detectChanges();
            }
          });
        });
      },
      error: (err) => {
        this.procesando = false;
        this.mensajeError = 'Error al crear venta: ' + err.message;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

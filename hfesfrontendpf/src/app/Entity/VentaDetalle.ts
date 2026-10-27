import { Venta } from './Venta';
import { Producto } from './Producto';

export class VentaDetalle {
  idVentaDetalle!: number;
  venta!: Venta;
  producto!: Producto;
  cantidad!: number;
  precioUnitario!: number;
  subtotal!: number;
}

import { Categoria } from './Categoria';
import { EstadoProducto } from './EstadoProducto';

export class Producto {
  idProducto!: number;
  codigoBarras!: string;
  categoria!: Categoria;
  nombre!: string;
  precioVenta!: number;
  stock!: number;
  estadoProducto!: EstadoProducto;
}

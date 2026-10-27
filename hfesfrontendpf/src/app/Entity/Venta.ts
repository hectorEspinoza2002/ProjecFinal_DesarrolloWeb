import { Caja } from './Caja';
import { Cliente } from './Cliente';
import { Usuario } from './Usuario';
import { MetodoPago } from './MetodoPago';

export class Venta {
  idVenta!: number;
  caja!: Caja;
  cliente!: Cliente;
  usuario!: Usuario;
  numeroFactura!: string;
  fechaVenta!: string;
  total!: number;
  metodoPago!: MetodoPago;
}

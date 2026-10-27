import { Usuario } from './Usuario';
import { EstadoCaja } from './EstadoCaja';

export class Caja {
  idCaja!: number;
  usuario!: Usuario;
  montoApertura!: number;
  montoCierre!: number;
  fechaApertura!: string;
  fechaCierre!: string;
  estadoCaja!: EstadoCaja;
}

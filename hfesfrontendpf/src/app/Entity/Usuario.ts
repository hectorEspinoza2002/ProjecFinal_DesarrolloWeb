import { Rol } from './Rol';

export class Usuario {
  idUsuario!: number;
  nombre!: string;
  usuario!: string;
  password!: string;
  rol!: Rol;
  estado!: number;
}

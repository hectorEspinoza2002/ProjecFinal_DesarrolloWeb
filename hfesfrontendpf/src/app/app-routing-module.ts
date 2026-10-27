import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Component/login/login';
import { Menu } from './Component/menu/menu';
import { CategoriaComponent } from './Component/categoria/categoria';
import { ClienteComponent } from './Component/cliente/cliente';
import { ProductoComponent } from './Component/producto/producto';
import { RolComponent } from './Component/rol/rol';
import { UsuarioComponent } from './Component/usuario/usuario';
import { PerfilComponent } from './Component/perfil/perfil';
import { PuntoVentaComponent } from './Component/punto-venta/punto-venta';
import { FacturasComponent } from './Component/facturas/facturas';
import { AuthGuard } from './Service/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Punto de venta: pantalla completa para cajero
  {
    path: 'punto-venta',
    component: PuntoVentaComponent,
    canActivate: [AuthGuard]
  },

  // Menú principal con rutas hijas
  {
    path: '',
    component: Menu,
    canActivate: [AuthGuard],
    children: [
      { path: 'categorias', component: CategoriaComponent },
      { path: 'clientes',   component: ClienteComponent },
      { path: 'productos',  component: ProductoComponent },
      { path: 'roles',      component: RolComponent },
      { path: 'usuarios',   component: UsuarioComponent },
      { path: 'facturas',   component: FacturasComponent },
      { path: 'perfil',     component: PerfilComponent },
      { path: '',           redirectTo: 'categorias', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

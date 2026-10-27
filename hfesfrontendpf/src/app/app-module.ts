import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Todos los componentes son standalone — van en imports
import { Menu } from './Component/menu/menu';
import { LoginComponent } from './Component/login/login';
import { PerfilComponent } from './Component/perfil/perfil';
import { CategoriaComponent } from './Component/categoria/categoria';
import { ClienteComponent } from './Component/cliente/cliente';
import { ProductoComponent } from './Component/producto/producto';
import { RolComponent } from './Component/rol/rol';
import { UsuarioComponent } from './Component/usuario/usuario';
import { PuntoVentaComponent } from './Component/punto-venta/punto-venta';
import { FacturasComponent } from './Component/facturas/facturas';

@NgModule({
  declarations: [
    App   // único componente no-standalone
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // Standalone components
    Menu,
    LoginComponent,
    PerfilComponent,
    CategoriaComponent,
    ClienteComponent,
    ProductoComponent,
    RolComponent,
    UsuarioComponent,
    PuntoVentaComponent,
    FacturasComponent
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App]
})
export class AppModule {}

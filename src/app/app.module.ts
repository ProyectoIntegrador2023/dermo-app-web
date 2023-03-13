import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioModule } from './components/usuario/usuario.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeOutComponent } from './components/home-out/home-out.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeInComponent } from './components/home-in/home-in.component';
import { HeaderPrivadoComponent } from './components/header-privado/header-privado.component';
import { SideBarNavegacionComponent } from './components/side-bar-navegacion/side-bar-navegacion.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { PerfilModule } from './components/perfil/perfil.module';
import { LoaderComponent } from './components/loader/loader.component';
import { TipoLesionComponent } from './components/diagnostico/tipo-lesion/tipo-lesion.component';
import { CasosComponent } from './components/diagnostico/casos/casos.component';
import { DetalleCasoComponent } from './components/diagnostico/detalle-caso/detalle-caso.component';
import { SharedModule } from './shared/shared.module';
import { HistoriaClinicaComponent } from './components/reportes/historia-clinica/historia-clinica.component';
import { TiposReporteComponent } from './components/reportes/tipos-reporte/tipos-reporte.component';
import { SlicePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeOutComponent,
    HeaderComponent,
    HomeInComponent,
    HeaderPrivadoComponent,
    SideBarNavegacionComponent,
    BienvenidoComponent,
    LoaderComponent,
    TipoLesionComponent,
    CasosComponent,
    DetalleCasoComponent,
    HistoriaClinicaComponent,
    TiposReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UsuarioModule,
    PerfilModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [SlicePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

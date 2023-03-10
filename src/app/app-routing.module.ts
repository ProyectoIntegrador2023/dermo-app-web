import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { CrearPerfilComponent } from './components/perfil/crear-perfil/crear-perfil.component';
import { HomeInComponent } from './components/home-in/home-in.component';
import { HomeOutComponent } from './components/home-out/home-out.component';
import { CrearPerfilMedicoComponent } from './components/perfil/crear-perfil-medico/crear-perfil-medico.component';
import {TipoLesionComponent} from "./components/diagnostico/tipo-lesion/tipo-lesion.component";
import {CasosComponent} from "./components/diagnostico/casos/casos.component";
import {DetalleCasoComponent} from "./components/diagnostico/detalle-caso/detalle-caso.component";
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileGuard } from './shared/guards/profile.guard';
import {TiposReporteComponent} from "./components/reportes/tipos-reporte/tipos-reporte.component";
import {HistoriaClinicaComponent} from "./components/reportes/historia-clinica/historia-clinica.component";


const routes: Routes = [
  {
    path: '',
    component: HomeOutComponent,
    pathMatch: 'full'
  },
  {
    path: 'home-in',
    component: HomeInComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BienvenidoComponent
      },
      {
        path: 'crear-perfil',
        component: CrearPerfilComponent
      },
      {
        path: 'crear-perfil-medico',
        component: CrearPerfilMedicoComponent
      },
      {
        path: 'diagnosticos/tipo-lesion',
        component: TipoLesionComponent,
        canActivate: [ProfileGuard],
      },
      {
        path: 'diagnosticos/tipo-lesion/casos',
        component: CasosComponent,
        pathMatch: 'full',
        canActivate: [ProfileGuard],
      },
      {
        path: 'diagnosticos/tipo-lesion/casos/detalle-caso',
        component: DetalleCasoComponent,
        canActivate: [ProfileGuard],
      },
      {
        path: 'reportes/tipos-reporte',
        component: TiposReporteComponent,
      },
      {
        path: 'reportes/tipos-reporte/historia-clinica',
        component: HistoriaClinicaComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { CrearPerfilComponent } from './components/perfil/crear-perfil/crear-perfil.component';
import { HomeInComponent } from './components/home-in/home-in.component';
import { HomeOutComponent } from './components/home-out/home-out.component';
import { CrearPerfilMedicoComponent } from './components/perfil/crear-perfil-medico/crear-perfil-medico.component';
import { GenerarDiagnosticoComponent } from './components/diagnostico/generar-diagnostico/generar-diagnostico.component';
import {TipoLesionComponent} from "./components/diagnostico/tipo-lesion/tipo-lesion.component";
import {CasosComponent} from "./components/diagnostico/casos/casos.component";
import {DetalleCasoComponent} from "./components/diagnostico/detalle-caso/detalle-caso.component";
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeOutComponent,
    pathMatch: 'full'
  },
  {
    path: 'home-in',
    component: HomeInComponent,
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
        component: TipoLesionComponent
      },
      {
        path: 'diagnosticos/tipo-lesion/casos',
        component: CasosComponent,
        pathMatch: 'full'
      },
      {
        path: 'diagnosticos/tipo-lesion/casos/detalle-caso',
        component: DetalleCasoComponent
      },
      {
        path: 'diagnosticos/tipo-lesion/casos/detalle-caso/generar-diagnostico',
        component: GenerarDiagnosticoComponent
      },

    ],
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

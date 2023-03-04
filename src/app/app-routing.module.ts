import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { CrearPerfilComponent } from './components/perfil/crear-perfil/crear-perfil.component';
import { HomeInComponent } from './components/home-in/home-in.component';
import { HomeOutComponent } from './components/home-out/home-out.component';
import { CrearPerfilMedicoComponent } from './components/perfil/crear-perfil-medico/crear-perfil-medico.component';
import { GenerarDiagnosticoComponent } from './components/generar-diagnostico/generar-diagnostico.component';


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
        path: 'generar-diagnostico',
        component: GenerarDiagnosticoComponent
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

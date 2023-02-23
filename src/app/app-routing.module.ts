import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { CrearPerfilComponent } from './components/crear-perfil/crear-perfil.component';
import { HomeInComponent } from './components/home-in/home-in.component';
import { HomeOutComponent } from './components/home-out/home-out.component';

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
        component: CrearPerfilComponent
      }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

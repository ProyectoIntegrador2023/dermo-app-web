import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeOutComponent } from './components/home-out/home-out.component';
import { UsuarioSignupComponent } from './components/usuario/usuario-signup/usuario-signup.component';


const routes: Routes = [
  {
    path: '**',
    component: HomeOutComponent,
    pathMatch: 'full'
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

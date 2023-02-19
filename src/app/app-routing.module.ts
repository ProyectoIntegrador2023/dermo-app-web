import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './components/usuario/usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './components/usuario/usuario-signup/usuario-signup.component';


const routes: Routes = [
  {
    path: '**',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

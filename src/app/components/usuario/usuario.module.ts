import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioSignupComponent } from './usuario-signup/usuario-signup.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuarioLoginComponent,
    UsuarioSignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [
    UsuarioLoginComponent,
    UsuarioSignupComponent]
})
export class UsuarioModule { }

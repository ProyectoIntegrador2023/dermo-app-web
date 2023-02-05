import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioSignupComponent } from './usuario-signup/usuario-signup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuarioSignupComponent],
  imports: [
    CommonModule, ReactiveFormsModule],
  exports: [UsuarioSignupComponent]
})
export class UsuarioModule { }

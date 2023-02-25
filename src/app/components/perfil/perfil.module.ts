import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CrearPerfilComponent],
  exports: [CrearPerfilComponent]
})
export class PerfilModule { }

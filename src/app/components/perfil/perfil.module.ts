import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearPerfilMedicoComponent } from './crear-perfil-medico/crear-perfil-medico.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CrearPerfilComponent, CrearPerfilMedicoComponent],
  exports: [CrearPerfilComponent, CrearPerfilMedicoComponent]
})
export class PerfilModule { }

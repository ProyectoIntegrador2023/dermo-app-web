import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})

export class CrearPerfilComponent implements OnInit {

  formCrearPerfil!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.formCrearPerfil = this.formBuilder.group({
      nombre: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(10)]],
      edad: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(2)]],
      pais: [{ value: 1, disabled: false }, [Validators.required]],
      ciudad: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(10)]]
    })
  }

  guardar() {
    console.log(this.formCrearPerfil);
    console.log(this.formCrearPerfil.value);
    console.log(this.formCrearPerfil.value.nombre);
    console.log(this.formCrearPerfil.value.edad);
    console.log(this.formCrearPerfil.value.pais);
    console.log(this.formCrearPerfil.value.ciudad);
  }

  get formPerfil() {
    return this.formCrearPerfil.controls;
  }

}


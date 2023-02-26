import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent implements OnInit {

  formCrearPerfil!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService  ) {}

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
    this.loaderService.show();
    setTimeout(
      ()=>{
          this.loaderService.hide();
          this.toastr.success("perfil creado", "creacion perfil");
      }, 3000);
  }

  get formPerfil() {
    return this.formCrearPerfil.controls;
  }

}


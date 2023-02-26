import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-crear-perfil-medico',
  templateUrl: './crear-perfil-medico.component.html',
  styleUrls: ['./crear-perfil-medico.component.css']
})
export class CrearPerfilMedicoComponent implements OnInit{

  formCrearPerfilMedico!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.formCrearPerfilMedico = this.formBuilder.group({
      especialidad: [{ value: 1, disabled: false }, [Validators.required]],
      identificacion: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(10)]],
      vigencia: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(2)]],
      licencia: [null]
    });
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0];
      this.formCrearPerfilMedico.patchValue({
        licencia: file
      });
    }
  }

  guardarEspecialidad() {
    console.log(this.formCrearPerfilMedico);
    console.log(this.formCrearPerfilMedico.value);
    console.log(this.formCrearPerfilMedico.value.especialidad);
    console.log(this.formCrearPerfilMedico.value.identificacion);
    console.log(this.formCrearPerfilMedico.value.vigencia);
    console.log(this.formCrearPerfilMedico.value.llicencia);
    this.loaderService.show();
    setTimeout(
      ()=>{
          this.loaderService.hide();
          this.toastr.success("Tu perfil médico ha sido creado", "Creación especialidad");
      }, 3000);
  }

  get formPerfilMedico() {
    return this.formCrearPerfilMedico.controls;
  }

}

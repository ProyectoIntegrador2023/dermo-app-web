import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';
import { UserProfileDoctorRq } from '../models/userProfileDoctor.model';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-crear-perfil-medico',
  templateUrl: './crear-perfil-medico.component.html',
  styleUrls: ['./crear-perfil-medico.component.css']
})
export class CrearPerfilMedicoComponent implements OnInit{

  helper = new JwtHelperService();
  profileDoctorDto: UserProfileDoctorRq;

  formCrearPerfilMedico!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private perfilService: PerfilService,
    private router: Router) { }

  ngOnInit(): void {
    this.formCrearPerfilMedico = this.formBuilder.group({
      especialidad: [{ value: 1, disabled: false }, [Validators.required]],
      identificacion: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(10)]],
      vigencia: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(2)]],
      licencia: [null]
    });
  }

  error = false;

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0];
      this.formCrearPerfilMedico.patchValue({
        licencia: file
      });
    }
  }

  onCreatePerfilDoctor() {
    if (this.formCrearPerfilMedico.invalid) {
      return;
    }
    this.error = false
    this.profileDoctorDto = this.formCrearPerfilMedico.value;
    this.loaderService.show();
    this.router.navigate(['/home-in/crear-perfil-medico'])
    this.perfilService.userProfileDoctor(this.profileDoctorDto)
      .subscribe(res => {
        console.log(res)
        const token = res.token;
        sessionStorage.setItem('especialidad', token);
        this.showSuccess()
        this.router.navigate([`/signup`])
      },
        error => {
          console.error(error);
          this.error = true
        })
  }

  // guardarEspecialidad() {
  //   console.log(this.formCrearPerfilMedico);
  //   console.log(this.formCrearPerfilMedico.value);
  //   console.log(this.formCrearPerfilMedico.value.especialidad);
  //   console.log(this.formCrearPerfilMedico.value.identificacion);
  //   console.log(this.formCrearPerfilMedico.value.vigencia);
  //   console.log(this.formCrearPerfilMedico.value.llicencia);
  //   this.loaderService.show();
  //   setTimeout(
  //     ()=>{
  //         this.loaderService.hide();
  //         this.toastr.success("Tu perfil médico ha sido creado", "Creación especialidad");
  //     }, 3000);
  // }

  showSuccess() {
    this.toastr.success(`Tu perfil ha sido creado.`, "Creación Perfil");
    this.loaderService.hide();
  }

  get formPerfilMedico() {
    return this.formCrearPerfilMedico.controls;
  }

}

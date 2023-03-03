import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';
import {LoaderService} from 'src/app/services/loader.service';
import {UserProfileDoctorRq} from '../models/userProfileDoctor.model';
import {PerfilService} from '../perfil.service';
import {finalize} from "rxjs";

@Component({
  selector: 'app-crear-perfil-medico',
  templateUrl: './crear-perfil-medico.component.html',
  styleUrls: ['./crear-perfil-medico.component.css']
})
export class CrearPerfilMedicoComponent implements OnInit {

  helper = new JwtHelperService();
  profileDoctorDto: UserProfileDoctorRq;
  imageBase64: any;
  imagePreview: any;

  formCrearPerfilMedico!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private perfilService: PerfilService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formCrearPerfilMedico = this.formBuilder.group({
      specialty: [{value: 1, disabled: false}, [Validators.required]],
      licenceId: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(10)]],
      licenceValidityDate: [{value: '', disabled: false}, [Validators.required]]
    });
  }

  error = false;

  onImageSelected(event: Event) {
    this.loaderService.show();
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0];
      this.getBase64(file, (base64: any) => {
        this.imageBase64 = base64.split(',').pop();
        this.imagePreview = base64;
      })
    }
  }

  getBase64(file: Blob, callback: (base64: any) => void) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      callback(fileReader.result);
      this.loaderService.hide();
    };
    fileReader.onerror = (error) => {
      console.error(error);
      this.loaderService.hide();
    }
  }

  onCreatePerfilDoctor() {
    console.log(this.formCrearPerfilMedico)
    if (this.formCrearPerfilMedico.invalid) {
      return;
    }
    this.error = false
    this.profileDoctorDto = this.formCrearPerfilMedico.value;
    this.profileDoctorDto.licenceImage = this.imageBase64;
    this.loaderService.show();
    this.perfilService.userProfileDoctor(this.profileDoctorDto).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.body.statusCode >= 400) {
          this.error = true;
          this.showError(res.message);
        } else {
          this.showSuccess();
          this.router.navigate(['/home-in']);
        }
      },
      error: (error) => {
        console.error(error);
        this.error = true;
        this.showError(error.error.message);
      }
    })
  }

  showSuccess() {
    this.toastr.success(`Tu perfil ha sido creado.`, "Creación Perfil");
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  get formPerfilMedico() {
    return this.formCrearPerfilMedico.controls;
  }

}

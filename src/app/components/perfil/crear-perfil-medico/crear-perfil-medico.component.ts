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
  error = false;
  formCrearPerfilMedico!: FormGroup;
  medicProfileAlreadyExist = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private perfilService: PerfilService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formCrearPerfilMedico = this.formBuilder.group({
      specialty: [{value: '', disabled: false}, [Validators.required]],
      licenceId: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(20)]],
      licenceValidityDate: [{value: '', disabled: false}, [Validators.required]],
      licenceImage: [{value: '', disabled: false}, []],
    });
    this.getMedicProfile();
  }


  onImageSelected(event: Event) {
    this.loaderService.show();
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0];
      this.getBase64(file, (base64: any) => {
        this.imageBase64 = base64.split(',').pop();
        this.imagePreview = base64;
        console.log('onImageSelected imageBase64 ', this.imageBase64);
        console.log('onImageSelected imagePreview ', this.imagePreview);
      })
    }
  }

  getBase64(file: Blob, callback: (base64: any) => void) {
    const fileReader = new FileReader();
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
    this.perfilService.userProfileDoctor(this.profileDoctorDto, this.medicProfileAlreadyExist).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.showSuccess(this.medicProfileAlreadyExist);
        this.router.navigate(['/home-in']);
      },
      error: (error) => {
        console.error(error);
        this.error = true;
        this.showError(error.error.message);
      }
    })
  }

  getMedicProfile() {
    this.error = false
    this.loaderService.show();
    this.perfilService.getProfileDoctor().pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.medicProfileAlreadyExist = true;
        this.formCrearPerfilMedico.controls['specialty'].patchValue(res.body.specialty);
        this.formCrearPerfilMedico.controls['licenceId']?.patchValue(res.body.licenceId);
        this.formCrearPerfilMedico.controls['licenceValidityDate']?.patchValue(res.body.licenceValidityDate);
        console.log('licenceImage.data ', res.body.licenceImage);
        this.imageBase64 = res.body.licenceImage;
        this.imagePreview = 'data:image/png;base64,'+res.body.licenceImage;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  showSuccess(isUpdated: boolean) {
    const message = (isUpdated) ? 'actualizado' : 'creado';
    this.toastr.success(`Tu perfil médico ha sido ${message}.`, "Perfil");
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  get formPerfilMedico() {
    return this.formCrearPerfilMedico.controls;
  }

}

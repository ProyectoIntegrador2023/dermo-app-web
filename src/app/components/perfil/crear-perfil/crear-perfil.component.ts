import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';
import {LoaderService} from 'src/app/services/loader.service';
import {UserProfileRq} from '../models/userProfile.model';
import {PerfilService} from '../perfil.service';
import {finalize} from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent implements OnInit {
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  helper = new JwtHelperService();
  profileDto: UserProfileRq;
  formCrearPerfil!: FormGroup;
  ciudades: any[] = [];
  paises: any[] = [];
  error = false
  personalProfileAlreadyExist = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly loaderService: LoaderService,
    private readonly perfilService: PerfilService,
    private readonly router: Router,
    private readonly utilService: UtilService) {
  }

  ngOnInit(): void {
    this.loadCountries();
    this.formCrearPerfil = this.formBuilder.group({
      name: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      age: [{ value: '', disabled: false }, [Validators.required, Validators.min(18), Validators.max(99)]],
      country: [{ value: '', disabled: false }, [Validators.required]],
      city: [{ value: '', disabled: false }, [Validators.required]]
    });
    this.getPersonalPerfil();
  }

  onCreatePerfil() {
    console.log(this.formCrearPerfil);
    if (this.formCrearPerfil.invalid) {
      return;
    }
    this.error = false
    this.profileDto = this.formCrearPerfil.value;
    this.loaderService.show();
    this.perfilService.userProfile(this.profileDto, this.personalProfileAlreadyExist).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        sessionStorage.setItem('medicId', res.body.id);
        this.showSuccess(this.personalProfileAlreadyExist);
        this.router.navigate([`/home-in`]);
      },
      error: (error) => {
        console.error(error);
        this.error = true;
        this.showError(error.error.message);
      }
    })
  }

  getPersonalPerfil() {
    this.error = false
    this.loaderService.show();
    this.perfilService.getUserProfile().pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.personalProfileAlreadyExist = true;
        this.formCrearPerfil.controls['name'].patchValue(res.body.name);
        this.formCrearPerfil.controls['age']?.patchValue(res.body.age);
        if(res.body.country) {
          this.formCrearPerfil.controls['country']?.patchValue(res.body.country);
          const ciudades = this.paises.filter( (el: any) => el.pais === res.body.country);
          this.ciudades = ciudades[0].ciudades
          this.formCrearPerfil.controls['city']?.patchValue(res.body.city);
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showSuccess(isUpdated: boolean) {
    const message = (isUpdated) ? 'actualizado' : 'creado';
    this.toastr.success(`Tu perfil ha sido ${message}.`, "Perfil");
  }

  get formPerfil() {
    return this.formCrearPerfil.controls;
  }

  loadCountries() {
    this.utilService.getCountriesList().subscribe(
      (data: any) => {
        this.paises = data.data;
      });
  }

  onChangePais(event: any) {
    const pais = event.target.value;
    if (pais){
      const ciudades = this.paises.filter( (el: any) => el.pais === pais);
      this.ciudades = ciudades[0].ciudades
    }
  }
}

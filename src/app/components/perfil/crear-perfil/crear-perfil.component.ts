import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';
import {LoaderService} from 'src/app/services/loader.service';
import {UserProfileRq} from '../models/userProfile.model';
import {PerfilService} from '../perfil.service';
import {HttpClient} from "@angular/common/http";
import {finalize} from 'rxjs';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css']
})
export class CrearPerfilComponent implements OnInit {

  helper = new JwtHelperService();
  profileDto: UserProfileRq;
  formCrearPerfil!: FormGroup;
  ciudades: any[] = [];
  paises: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private perfilService: PerfilService,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadCountries();

    this.formCrearPerfil = this.formBuilder.group({
      name: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(10)]],
      age: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(2)]],
      country: [{value: '', disabled: false}, [Validators.required]],
      city: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(10)]]
    })
  }

  error = false

  onCreatePerfil() {
    if (this.formCrearPerfil.invalid) {
      return;
    }
    this.error = false
    this.profileDto = this.formCrearPerfil.value;
    this.loaderService.show();
    this.perfilService.userProfile(this.profileDto).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.statusCode === 409) {
          this.error = true;
          this.showError(res.message);
        } else {
          this.showSuccess();
          this.router.navigate([`/home-in`]);
        }
      },
      error: (error) => {
        console.error(error);
        this.error = true;
        this.showError('Usuario o contraseña inválidos');
      }
    })
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showSuccess() {
    this.toastr.success(`Tu perfil ha sido creado.`, "Creación Perfil");
    this.loaderService.hide();
  }

  get formPerfil() {
    return this.formCrearPerfil.controls;
  }

  loadCountries() {
    this.http.get('assets/cities/json_cities.json').subscribe(
      (cities: any) => {
        this.paises = cities.data;
      }
    )
  }

  onChange(event: any) {
    let idPais = event.target.value;
    let pais = this.paises.find((pais) => pais.id === idPais);
    if (pais) {
      this.ciudades = pais.ciudades;
    }
  }
}

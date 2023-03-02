import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';
import { UserProfileRq } from '../models/userProfile.model';
import { PerfilService } from '../perfil.service';
import {HttpClient} from "@angular/common/http";


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
    private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCountries();

    this.formCrearPerfil = this.formBuilder.group({
      nombre: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      edad: [{ value: '', disabled: false }, [Validators.required, Validators.min(18), Validators.max(99)]],
      pais: [{ value: '', disabled: false }, [Validators.required]],
      ciudad: [{ value: '', disabled: false }, [Validators.required]]
    })
  }

  error = false;

  // onCreatePerfil() {
  //   if (this.formCrearPerfil.invalid) {
  //     return;
  //   }
  //   this.error = false
  //   this.profileDto = this.formCrearPerfil.value;
  //   this.loaderService.show();
  //   this.router.navigate(['/home-in/crear-perfil'])
  //   this.perfilService.userProfile(this.profileDto)
  //     .subscribe(res => {
  //       console.log(res)
  //       const token = res.token;
  //       sessionStorage.setItem('nombre', token);
  //       this.showSuccess()
  //       this.router.navigate([`/signup`])
  //     },
  //       error => {
  //         console.error(error);
  //         this.error = true
  //       })
  // }

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

  showSuccess() {
    this.toastr.success(`Tu perfil ha sido creado.`, "Creación Perfil");
    this.loaderService.hide();
  }

  get formPerfil() {
    return this.formCrearPerfil.controls;
  }

  loadCountries() {
    this.http.get('assets/cities/json_cities.json').subscribe(
      (data: any) => {
        this.paises = data.data;
      });
  }

  onChangePais(event: any) {
    console.log('onChangePais', event)
    console.log('onChangePais value ', event.target.value)
    const idPais = event.target.value;
    if (idPais){
      const ciudades = this.paises.filter( (el: any) => el.id === idPais);
      this.ciudades = ciudades[0].ciudades
      console.log('onChangePais ciudades', this.ciudades)
    }
  }
}


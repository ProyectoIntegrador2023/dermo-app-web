import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {UsuarioService} from '../usuario.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserSignInRq, UserSignInRs} from '../models/userSignIn.model';
import {LoaderService} from 'src/app/services/loader.service';
import {finalize} from "rxjs";

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName]
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({confirmPasswordValidator: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}


@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  helper = new JwtHelperService();
  loginDto: UserSignInRq;
  viewPassword = false;

  @Output() closeLogin = new EventEmitter<boolean>();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService
  ) {
  }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', Validators.required]
      },
    );
  }

  error = false

  onLogInUsuario() {
    if (this.loginForm.invalid) {
      return;
    }
    this.error = false
    this.loginDto = this.loginForm.value;
    this.loaderService.show();
    this.usuarioService.userLogIn(this.loginDto).pipe(
      finalize(()=>{
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: UserSignInRs) => {
        console.log(res);
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('email', res.email);
        this.showSuccess();
        this.router.navigate(['/home-in']);
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
    this.toastr.success(`Ha ingresado exitosamente`, "Inicio exitoso");
    this.loaderService.hide();
  }

  changeType(id: string) {
    const type = document.getElementById(id)?.getAttribute('type') === 'password' ? 'text' : 'password';
    document.getElementById(id)?.setAttribute('type', type);
    this.viewPassword = !this.viewPassword;
  }

  close() {
    this.closeLogin.emit(false);

  }
}

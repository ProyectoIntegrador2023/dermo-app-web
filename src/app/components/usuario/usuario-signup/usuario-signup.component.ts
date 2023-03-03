import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UsuarioService} from '../usuario.service';
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserSignUpRq} from '../models/userSignUp.model';
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
  selector: 'app-usuario-signup',
  templateUrl: './usuario-signup.component.html',
  styleUrls: ['./usuario-signup.component.css']
})
export class UsuarioSignupComponent implements OnInit {

  helper = new JwtHelperService();
  signUpDto: UserSignUpRq;
  viewPassword = false;
  viewPasswordC = false;

  @Output() closeSignUp = new EventEmitter<boolean>();

  constructor(
    private usuarioService: UsuarioService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  signUpForm: FormGroup;

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }

  error = false;

  onSignUpUsuario() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.error = false
    this.signUpDto = this.signUpForm.value;
    this.loaderService.show();
    this.usuarioService.userSignUp(this.signUpDto).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.statusCode === 409) {
          this.error = true;
          this.showError('El usuario ya existe, inicia sesión');
        } else {
          this.showSuccess();
          this.router.navigate(['/home-in']);
        }
      },
      error: (error) => {
        console.error(error);
        this.error = true;
        this.showError('El usuario ya existe, inicia sesión.');
      }
    })
  }

  showError(error: string) {
    this.toastr.error(error, "Error");
  }

  showSuccess() {
    this.toastr.success(`Gracias por registrarte, ahora puedes disfrutar de tus servicios.`, "Registro exitoso");
    this.loaderService.hide();
  }

  changeType(id: string) {
    const type = document.getElementById(id)?.getAttribute('type') === 'password' ? 'text' : 'password';
    document.getElementById(id)?.setAttribute('type', type);
    if (id==='passwordForm'){
      this.viewPassword = !this.viewPassword;
    } else {
      this.viewPasswordC = !this.viewPasswordC;
    }
  }

  close() {
    this.closeSignUp.emit(false);
  }
}

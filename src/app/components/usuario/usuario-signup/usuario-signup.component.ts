import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserSignUpRq } from '../models/userSignUp.model';

@Component({
  selector: 'app-usuario-signup',
  templateUrl: './usuario-signup.component.html',
  styleUrls: ['./usuario-signup.component.css']
})
export class UsuarioSignupComponent implements OnInit {

  helper = new JwtHelperService();
  signUpDto: UserSignUpRq;
  viewPassword: boolean = false;

  @Output() closeSignUp = new EventEmitter<boolean>();

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  signUpForm: FormGroup;

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
    });
  }

  error = false;

  onSignUpUsuario() {
    this.error = false
    this.signUpDto = this.signUpForm.value;
    this.usuarioService.userSignUp(this.signUpDto)
      .subscribe(res => {
        console.log(res)
        const token = res.lastLoginAt;
        sessionStorage.setItem('lastLoginAt', token);
        this.router.navigate([`/signup`])
        this.showSuccess()
      },

        error => {
          this.showError(`Ha ocurrido un error: ${error.message}`);
          this.error = true
        })
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, "Registro exitoso");
  }

  changeType(id: string) {
    const type = document.getElementById(id)?.getAttribute('type') === 'password' ? 'text' : 'password';
    document.getElementById(id)?.setAttribute('type', type);
    this.viewPassword = !this.viewPassword;
  }

  close() {
    this.closeSignUp.emit(false);
  }
}

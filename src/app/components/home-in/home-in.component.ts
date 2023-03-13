import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { PerfilService } from '../perfil/perfil.service';
import { UsuarioService } from '../usuario/usuario.service';


@Component({
  selector: 'app-home-in',
  templateUrl: './home-in.component.html',
  styleUrls: ['./home-in.component.css']
})
export class HomeInComponent implements OnInit {

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly perfilService: PerfilService,
    private readonly loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    const medicId = sessionStorage.getItem('medicId');
    if(!medicId) {
      this.getMedicId();
    }
  }

  getMedicId() {
    this.perfilService.getUserProfile().pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        sessionStorage.setItem('medicId', res.body.id);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}

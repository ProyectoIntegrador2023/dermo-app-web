import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GenerarDiagnosticoService {
  constructor(
    private readonly router: Router,
  ) { }

}

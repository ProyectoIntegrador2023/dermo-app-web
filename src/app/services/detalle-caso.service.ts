import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DetalleCasoService {
  constructor(private http: HttpClient) { }

  getDetalleCaso(correoElectronico: string) {
    const url = `http://dermoappmovil-env.eba-vqrznmv9.us-east-1.elasticbeanstalk.com/injury/getall?correoElectronico=${correoElectronico}`;
    return this.http.get(url);
  }
}

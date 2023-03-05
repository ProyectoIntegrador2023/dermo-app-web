import {Component} from '@angular/core';
import {DetalleCasoService} from "../../../services/detalle-caso.service";

@Component({
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.css'],
  providers: [DetalleCasoService]
})
export class DetalleCasoComponent {
  detalleCaso: any = {};
  correoElectronico: string;

  constructor(private detalleCasoService: DetalleCasoService) {
  }

  getDetalleCaso(correoElectronico: string) {
    this.detalleCasoService.getDetalleCaso(correoElectronico)
      .subscribe((res) => {
        this.detalleCaso = res;
      });
  }
}

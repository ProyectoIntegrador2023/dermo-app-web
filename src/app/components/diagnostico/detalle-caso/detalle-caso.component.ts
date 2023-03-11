import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {finalize} from 'rxjs';
import {InjuryReportDetailedRs} from 'src/app/models/injury-report-rs.model';
import {LoaderService} from 'src/app/services/loader.service';
import {MedicalRecordService} from 'src/app/services/medical-record.service';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.css'],
})
export class DetalleCasoComponent implements OnInit {
  emailParam = '';
  injuryDetail: InjuryReportDetailedRs;
  correoElectronico: string;
  showForm: boolean = false;

  constructor(
    public readonly medicalRecordService: MedicalRecordService,
    private readonly loaderService: LoaderService,
    private readonly route: ActivatedRoute,
    private readonly scroller: ViewportScroller,
  ) {
  }

  ngOnInit() {
    this.loaderService.show();
    this.route.queryParams.subscribe((params: Params) => this.emailParam = params['paciente']);

    this.medicalRecordService.getAllInjuryFromPacientsByEmail(this.emailParam).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (data) => {
        console.log(data);
        console.log('emailParam ', this.emailParam)
        this.injuryDetail = data;
        this.loaderService.hide();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  showDiagnosticForm() {
    setTimeout(() => {
      this.scroller.scrollToAnchor('contenedorDiagnostico');
    }, 0);
    this.showForm = true;
  }
}

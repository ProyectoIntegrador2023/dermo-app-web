import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {finalize} from 'rxjs';
import {ViewportScroller} from "@angular/common";

import {InjuryReportDetailedRs} from 'src/app/models/injury-report-rs.model';
import {DiagnosticRq} from "../models/diagnostic.model";
import {LoaderService} from 'src/app/services/loader.service';
import {MedicalRecordService} from 'src/app/services/medical-record.service';
import {DiagnosticService} from "../diagnostic.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-detalle-caso',
  templateUrl: './detalle-caso.component.html',
  styleUrls: ['./detalle-caso.component.css'],
})
export class DetalleCasoComponent implements OnInit {
  emailParam = '';
  id = '';
  injuryDetail: InjuryReportDetailedRs;
  correoElectronico: string;
  showForm = false;
  formDiagnostic!: FormGroup;
  diagnosticDto: DiagnosticRq;
  error = false;

  constructor(
    public readonly medicalRecordService: MedicalRecordService,
    private readonly loaderService: LoaderService,
    private readonly route: ActivatedRoute,
    private readonly scroller: ViewportScroller,
    private readonly formBuilder: FormBuilder,
    private readonly diagnosticService: DiagnosticService,
    private router: Router,
    private readonly toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.loaderService.show();
    this.route.queryParams.subscribe((params: Params) => this.emailParam = params['paciente']);
    this.formDiagnostic = this.formBuilder.group({
      condition: [{value: '', disabled: false }, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      level: [{value: '', disabled: false}, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      requeresTreatment: [{value: true, disabled: false}, [Validators.required]],
      treatmentTerm: [{value: '', disabled: false}, [Validators.required]],
      medicines: [{value: '', disabled: false}, [Validators.required]],
      treatmentControl: [{value: '', disabled: false }, [Validators.required]],
      recommendations: [{value: '', disabled: false}, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
    });

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

  onSendDiagnostic() {
    console.log(this.formDiagnostic)
    if (this.formDiagnostic.invalid) {
      return;
    }
    this.error = false
    this.diagnosticDto = this.formDiagnostic.value;
    this.loaderService.show();
    this.diagnosticService.diagnostic(this.diagnosticDto, false).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.showSuccess(false);
        this.router.navigate(['/home-in']);
      },
      error: (error) => {
        console.error(error);
        this.error = true;
        this.showError(error.error.message);

      }
    })
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showSuccess(isUpdated: boolean) {
    const message = (isUpdated) ? 'actualizado' : 'creado';
    this.toastr.success(`Diagnostico ha sido ${message}.`, "Diagnostico");
  }
}

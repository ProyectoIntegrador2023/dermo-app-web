import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {finalize} from 'rxjs';
import {Location, ViewportScroller} from "@angular/common";

import {InjuryReportDetailed, InjuryReportInfo} from 'src/app/models/injury-report-rs.model';
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
  idCasoParam = '';
  injuryDetail: InjuryReportDetailed;
  correoElectronico: string;
  showForm = false;
  formDiagnostic!: FormGroup;
  error = false;
  medicId = '';
  diagnosticAlreadyExist = false;


  constructor(
    public readonly medicalRecordService: MedicalRecordService,
    private readonly loaderService: LoaderService,
    private readonly route: ActivatedRoute,
    private readonly scroller: ViewportScroller,
    private readonly formBuilder: FormBuilder,
    private readonly diagnosticService: DiagnosticService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly location: Location
  ) {
  }

  ngOnInit() {
    this.loaderService.show();
    this.route.queryParams.subscribe((params: Params) => {
      this.emailParam = params['paciente'];
      this.idCasoParam = params['idCaso'];
      if(!params['paciente'] || !params['idCaso']) {
        this.location.back();
        return;
      }
    });

    this.validateIfMedicPerfilExist();

    this.formDiagnostic = this.formBuilder.group({
      condition: [{value: '', disabled: false }, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      level: [{value: '', disabled: false}, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      requeresTreatment: [{value: true, disabled: false}, [Validators.required]],
      treatmentTerm: [{value: '', disabled: false}, [Validators.required]],
      medicines: [{value: '', disabled: false}, [Validators.required]],
      treatmentControl: [{value: '', disabled: false }, [Validators.required]],
      recommendations: [{value: '', disabled: false}, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    });

    this.medicalRecordService.getAllInjuryFromPacientsByEmail(this.emailParam).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (data) => {
        console.log('injuryDetail', data);
        console.log('emailParam ', this.emailParam)
        console.log('idCaso ', this.idCasoParam)
        const lesion: InjuryReportInfo = {
          id: '',
          tipo_de_lesion: '',
          forma_de_lesion: '',
          numero_de_lesiones: '',
          distribucion: '',
          foto_de_lesion: '',
          created_at: '',
        }
        this.injuryDetail = {
          correo_electronico: data.correo_electronico,
          nombre: data.nombre,
          edad: data.edad,
          ciudad: data.ciudad,
          tipo_de_piel: data.tipo_de_piel,
          foto_de_piel: data.foto_de_piel,
          description: data.description,
          created_at: data.created_at,
          lesion: data.lesiones.filter( (lesion) => lesion.id === this.idCasoParam)[0] || lesion
        };
        this.getDiagnosticInjury(this.injuryDetail.lesion.id);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getDiagnosticInjury(injuryId: string){
    console.log('getDiagnosticInjury injuryId ', injuryId)
    this.diagnosticService.getDiagnostic(injuryId).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (data) => {
        console.log('getDiagnosticInjury', data);
        this.diagnosticAlreadyExist = true;
        this.formDiagnostic.controls['condition'].setValue(data.body.condition);
        this.formDiagnostic.controls['level'].setValue(data.body.level);
        this.formDiagnostic.controls['requeresTreatment'].setValue(data.body.requeresTreatment);
        this.formDiagnostic.controls['treatmentTerm'].setValue(data.body.treatmentTerm);
        this.formDiagnostic.controls['medicines'].setValue(data.body.medicines);
        this.formDiagnostic.controls['treatmentControl'].setValue(data.body.treatmentControl);
        this.formDiagnostic.controls['recommendations'].setValue(data.body.recommendations);
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
    this.loaderService.show();
    this.error = false
    const diagnosticDto: DiagnosticRq = {
      condition: this.formDiagnostic.controls['condition'].value,
      level: this.formDiagnostic.controls['level'].value,
      requeresTreatment: this.formDiagnostic.controls['requeresTreatment'].value,
      treatmentTerm: this.formDiagnostic.controls['treatmentTerm'].value,
      medicines: this.formDiagnostic.controls['medicines'].value,
      treatmentControl: this.formDiagnostic.controls['treatmentControl'].value,
      recommendations: this.formDiagnostic.controls['recommendations'].value,
      injuryId: this.idCasoParam,
      medicId: this.medicId,
    };
    this.diagnosticService.registerDiagnostic(diagnosticDto, this.diagnosticAlreadyExist).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.showSuccess(this.diagnosticAlreadyExist);
        this.router.navigate(['/home-in']);
      },
      error: (error) => {
        console.error(error);
        this.error = true;
        this.showError(error.error.message);

      }
    })
  }

  private validateIfMedicPerfilExist() {
    const medicId = sessionStorage.getItem('medicId');
    if(!medicId || Number(medicId) === 0) {
      this.showError('Registre su perfil, por favor registre su perfil antes de realizar un diagnostico');
      setTimeout(() => {
        this.router.navigate(['home-in/crear-perfil'])
      }, 3000);
      return;
    }
    this.medicId = medicId;
  }

  private showError(error: string) {
    this.toastr.error(error, "Error")
  }

  private showSuccess(isUpdated: boolean) {
    const message = (isUpdated) ? 'actualizado' : 'creado';
    this.toastr.success(`Diagnostico ha sido ${message}.`, "Diagnostico");
  }
}

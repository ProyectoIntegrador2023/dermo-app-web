import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { InjuryReportInfo } from 'src/app/models/injury-report-rs.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.css']
})
export class CasosComponent implements OnInit {

  injuryTypeParam: string;
  patientEmailParam: string;
  injuryList: InjuryReportInfo[]
  injuryListFiltered: InjuryReportInfo[]
  searchText = '';

  constructor(
    public readonly medicalRecordService: MedicalRecordService,
    private readonly loaderService: LoaderService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.route.queryParams.subscribe((params: Params) => {
      this.injuryTypeParam = params['tipo-lesion'];
      this.patientEmailParam = params['paciente'];
    });

    if(this.injuryTypeParam) {
      this.getAllInjuriesByType();
    } else if(this.patientEmailParam) {
      this.getInjuriesByPatient();
    }
  }

  getAllInjuriesByType() {
    this.medicalRecordService.getAllInjuryFromPacients().pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (data) => {
        console.log(data);
        console.log('injuryTypeParam ', this.injuryTypeParam)
        this.injuryList = data.lesiones;
        if (this.injuryTypeParam) {
          this.injuryListFiltered = data.lesiones.filter((resp) => {
            console.log(resp.tipo_de_lesion == this.injuryTypeParam)
            return resp.tipo_de_lesion == this.injuryTypeParam
          })
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getInjuriesByPatient() {
    this.medicalRecordService.getAllInjuryFromPacientsByEmail(this.patientEmailParam).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (data) => {
        console.log(data);
        console.log('injuryTypeParam ', this.injuryTypeParam)
        console.log('patientEmailParam ', this.patientEmailParam)
        this.injuryListFiltered = data.lesiones.map((resp) => {
          console.log(resp.correo_electronico)
          resp.correo_electronico = this.patientEmailParam;
          console.log(resp.correo_electronico)
          return resp
        })
        this.injuryList = this.injuryListFiltered;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  injuryDetail(injury: InjuryReportInfo) {
    console.log(injury);
    this.router.navigate(['/home-in/diagnosticos/tipo-lesion/casos/detalle-caso'], {
      queryParams: {
        paciente: injury.correo_electronico,
        idCaso: injury.id
      }
    });
  }

  filtrar(searchText: string) {
    this.searchText = searchText;
    if (searchText === '') {
      this.injuryListFiltered = this.injuryList;
    } else {
      this.injuryListFiltered = this.injuryList.filter((injury) => {
        return injury.id.toString().startsWith(searchText);
      });
    }
  }

  limpiar() {
    this.searchText = '';
    this.filtrar('');
  }
}

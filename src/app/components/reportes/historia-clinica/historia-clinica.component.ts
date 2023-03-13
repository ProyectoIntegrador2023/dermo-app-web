import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PatientsRegistered } from 'src/app/models/patients-registered.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {
  error = false
  patientsRegistered: PatientsRegistered[];
  patientsRegisteredFiltered: PatientsRegistered[];
  searchText: string;
  searchDate: string

  constructor(
    private readonly medicalRecordService: MedicalRecordService,
    private readonly loaderService: LoaderService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.medicalRecordService.getAllPatientsRegistered().pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.patientsRegistered = res.usuarios;
        this.patientsRegisteredFiltered = res.usuarios;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  filterByName(searchText: string) {
    console.log('filterByName ', searchText)
    this.searchText = searchText;
    if (searchText) {
      this.patientsRegisteredFiltered = this.patientsRegistered.filter((patient) => {
        return patient.nombre.toString().toLowerCase().startsWith(searchText.toLowerCase());
      });
    } else {
      this.patientsRegisteredFiltered = this.patientsRegistered;
    }
  }

  filterByDate(searchDate: string) {
    console.log('filterByDate ', searchDate)
    this.searchDate = searchDate;
    if (searchDate === '' || searchDate === null) {
      this.patientsRegisteredFiltered = this.patientsRegistered;
    } else {
      this.patientsRegisteredFiltered = this.patientsRegistered.filter((patient) => {
        return patient.created_at.toString().startsWith(searchDate);
      });
    }
  }

  cleanSearch() {
    this.searchText = '';
    this.filterByName('');
    this.searchDate = '';
    this.filterByDate('');
  }

  goToDiagnostic(patien: PatientsRegistered) {
    console.log('goToDiagnostic ', patien)
    this.router.navigate(['home-in/diagnosticos/tipo-lesion/casos'], {queryParams: { paciente: patien.correo_electronico }});

  }


}

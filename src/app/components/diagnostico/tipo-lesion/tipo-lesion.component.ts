import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { InjuryTypes } from 'src/app/models/injury-types.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-tipo-lesion',
  templateUrl: './tipo-lesion.component.html',
  styleUrls: ['./tipo-lesion.component.css']
})
export class TipoLesionComponent implements OnInit {

  injurytypeList: InjuryTypes[]

  constructor(
    public medicalRecordService: MedicalRecordService,
    private readonly loaderService: LoaderService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.medicalRecordService.getInjuryTypes().pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    ).subscribe({
      next: (resp) => {
        console.log(resp);
        this.injurytypeList = resp.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  injuryDetail(injury: InjuryTypes) {
    console.log(injury);
    this.router.navigate(['/home-in/diagnosticos/tipo-lesion/casos'], { queryParams: {'tipo-lesion': injury.nombre}})
  }
}

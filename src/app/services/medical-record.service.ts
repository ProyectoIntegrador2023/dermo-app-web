import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INJURY_REPORT_ENDPOINT } from 'src/environments/environment';
import {
  InjuryReportDetailedRs,
  InjuryReportRs,
} from '../models/injury-report-rs.model';
import { InjuryTypes } from '../models/injury-types.model';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService {
  constructor(private readonly http: HttpClient) {}

  getInjuryTypes() {
    return this.http.get<{ data: InjuryTypes[] }>(
      'assets/json/injury-types.json'
    );
  }

  getAllInjuryFromPacients(): Observable<InjuryReportRs> {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('dermo-traceability-id', 'c2f579cd-ed18-40dc-9ef3-26f33a637175');
    return this.http.get<InjuryReportRs>(
      `${INJURY_REPORT_ENDPOINT.baseEndpoint}${INJURY_REPORT_ENDPOINT.getAllLessonsPath}`,
      { headers }
    );
  }

  getAllInjuryFromPacientsByEmail(
    email: string
  ): Observable<InjuryReportDetailedRs> {
    // let headers = new HttpHeaders();
    // headers = headers
    //   .set('Content-Type', 'application/json; charset=utf-8')
    //   .set('dermo-traceability-id', 'c2f579cd-ed18-40dc-9ef3-26f33a637175');
    // return this.http.get<InjuryReportDetailedRs>(`${INJURY_REPORT_ENDPOINT.baseEndpoint}${INJURY_REPORT_ENDPOINT.getLessonsByEmailPath}`,
    // { headers,
    //   params: {
    //     correoElectronico: email
    //   } });

    const injuryMock: InjuryReportDetailedRs = {
      correo_electronico: 'mazf1006@gmail.com',
      nombre: 'Mario Zambrano',
      edad: '23',
      ciudad: 'Bogota',
      tipo_de_piel: 'blanca',
      foto_de_piel: 'base64_foto',
      lesiones: [
        {
          tipo_de_lesion: 'Placa',
          forma_de_lesion: 'Ovalada',
          numero_de_lesiones: 'Multiple',
          distribucion: 'Esparcida',
          foto_de_lesion: 'base64/foto',
          created_at: '2023-02-25 20:14:02'
        },
        {
          tipo_de_lesion: 'Placa',
          forma_de_lesion: 'Ovalada',
          numero_de_lesiones: 'Multiple',
          distribucion: 'Esparcida',
          foto_de_lesion: 'base64/foto',
          created_at: '2023-02-25 20:15:50',
        },
        {
          tipo_de_lesion: 'Placa',
          forma_de_lesion: 'Ovalada',
          numero_de_lesiones: 'Multiple',
          distribucion: 'Esparcida',
          foto_de_lesion: 'base64/foto',
          created_at: '2023-02-25 20:15:59',
        },
      ],
      description: 'Lesiones registradas a la fecha',
      created_at: '2023-03-05 13:35:28',
    };
    return new Observable( (subs) => {
      console.log('detalle de paciente mockeado...', email);
      subs.next(injuryMock);
    });
  }

  checkInjuryImage(urlImage: string) {
    const defaultImage = 'assets/img/lesion.svg';
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    const isBase64Img = base64regex.test(urlImage.replace('data:image/png;base64,',''));
    if(isBase64Img) {
      return urlImage;
    }
    return defaultImage;
  }
}

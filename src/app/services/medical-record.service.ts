import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INJURY_REPORT_ENDPOINT } from 'src/environments/environment';
import {
  InjuryReportDetailedRs,
  InjuryReportRs,
} from '../models/injury-report-rs.model';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService {

  constructor(private readonly http: HttpClient) {}

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
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('dermo-traceability-id', 'c2f579cd-ed18-40dc-9ef3-26f33a637175');
    return this.http.get<InjuryReportDetailedRs>(`${INJURY_REPORT_ENDPOINT.baseEndpoint}${INJURY_REPORT_ENDPOINT.getLessonsByEmailPath}`,
    { headers,
      params: {
        correoElectronico: email
      } });
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

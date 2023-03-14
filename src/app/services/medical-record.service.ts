import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INJURY_REPORT_ENDPOINT } from 'src/environments/environment';
import {
  InjuryReportDetailedRs,
  InjuryReportRs,
} from '../models/injury-report-rs.model';
import { PatientsRegistered } from '../models/patients-registered.model';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService {

  constructor(private readonly http: HttpClient) {}

  getAllInjuryFromPacients(): Observable<InjuryReportRs> {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('dermo-traceability-id', '9aabe392-4399-4eb4-95da-c8de9393c0c0');
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

  getAllPatientsRegistered(
  ): Observable<{usuarios: PatientsRegistered[]}> {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('dermo-traceability-id', 'b8e8a459-d34f-4ff9-8a97-203d55c659eb');
    return this.http.get<{usuarios: PatientsRegistered[]}>(`${INJURY_REPORT_ENDPOINT.baseEndpoint}${INJURY_REPORT_ENDPOINT.getAllPatientsPath}`,
    { headers });
  }

  checkInjuryImage(urlImage: string) {
    const initialBase64Image = 'data:image/png;base64,';
    const defaultImage = 'assets/img/lesion.svg';
    if(urlImage === defaultImage || urlImage.includes('assets')) {
      return urlImage;
    } else if(urlImage.includes('base64/foto')) {
      return defaultImage;
    } else {
      return initialBase64Image+urlImage.replace(initialBase64Image,'').replace('base64,','');
    }
  }
}

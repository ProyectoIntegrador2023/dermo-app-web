import {Injectable} from '@angular/core';
import {DiagnosticRq} from "./models/diagnostic.model";
import {Observable} from "rxjs";
import {DIAGNOSTIC_ENDPOINT} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  constructor(
    private http: HttpClient
  ) {
  }

  diagnostic(diagnosticDto: DiagnosticRq, isUpdate: boolean): Observable<any> {
    const diagnosticRq: DiagnosticRq = {
      condition: diagnosticDto.condition,
      level: diagnosticDto.level,
      requeresTreatment: diagnosticDto.requeresTreatment,
      medicines: diagnosticDto.medicines,
      treatmentTerm: diagnosticDto.treatmentTerm,
      treatmentControl: diagnosticDto.treatmentControl,
      recommendations: diagnosticDto.recommendations
    };

    const endpoint = `${DIAGNOSTIC_ENDPOINT.baseEndpoint}${DIAGNOSTIC_ENDPOINT.registerPath}`
    return (isUpdate) ? this.diagnosticoPut(endpoint, diagnosticRq) : this.diagnosticoPost(endpoint, diagnosticRq);

  }

  private diagnosticoPost(endpoint: string, diagnosticRq: DiagnosticRq) {
    return this.http.post<any>(endpoint, diagnosticRq,
      {
        observe: 'response'
      }
    );
  }

  private diagnosticoPut(endpoint: string, diagnosticRq: DiagnosticRq) {
    return this.http.put<any>(endpoint, diagnosticRq,
      {
        observe: 'response'
      }
    );
  }
}

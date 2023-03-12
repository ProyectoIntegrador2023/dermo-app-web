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

  getDiagnostic(injuryUId: string): Observable<any> {
    return this.http.get<any>(`${DIAGNOSTIC_ENDPOINT.baseEndpoint}${DIAGNOSTIC_ENDPOINT.queryInjuryPath}/${injuryUId}`,
      {
        observe: 'response'
      }
    )
  }

  registerDiagnostic(diagnosticDto: DiagnosticRq, isUpdate: boolean): Observable<any> {
    const endpoint = `${DIAGNOSTIC_ENDPOINT.baseEndpoint}${DIAGNOSTIC_ENDPOINT.registerPath}`
    return (isUpdate) ? this.diagnosticoPut(endpoint, diagnosticDto) : this.diagnosticoPost(endpoint, diagnosticDto);

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

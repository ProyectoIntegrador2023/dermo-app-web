import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InjuryTypes } from 'src/app/shared/models/injury-types.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private readonly http: HttpClient) {}

  getCountriesList() {
    return this.http.get('assets/json/countries-cities.json');
  }

  getInjuryTypes() {
    return this.http.get<{ data: InjuryTypes[] }>(
      'assets/json/injury-types.json'
    );
  }
}

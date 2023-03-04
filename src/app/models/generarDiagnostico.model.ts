export interface GenerarDiagnosticoRq {
  condition: number;
  level: string;
  requeresTreatment: true;
  treatmentTerm: string;
  medicines: string;
  treatmentControl: string;
  recommendations: string;
  medicId: string
}

export interface GenerarDiagnosticoRs {

}

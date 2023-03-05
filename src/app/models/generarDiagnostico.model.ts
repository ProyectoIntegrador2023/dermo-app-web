export interface GenerarDiagnosticoRq {
  id: number;
}

export interface GenerarDiagnosticoRs {
  id: number;
  medicId: number;
  injuryId: number;
  condition: string;
  level: string;
  requeresTreatment: true;
  treatmentTerm: string;
  medicines: string;
  treatmentControl: string;
  recommendations: string;
  createdAt: string;
  updatedAt: string;
}

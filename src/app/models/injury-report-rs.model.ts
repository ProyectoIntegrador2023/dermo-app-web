export interface InjuryReportRs {
  lesiones: [InjuryReportInfo]
}

export interface InjuryReportDetailedRs {
  correo_electronico: string,
  nombre: string,
  edad: string,
  ciudad: string,
  tipo_de_piel: string,
  foto_de_piel: string,
  description: string,
  created_at: string,
  lesiones: InjuryReportInfo[],
}

export interface InjuryReportInfo {
  correo_electronico?: string
  tipo_de_lesion: string,
  forma_de_lesion: string,
  numero_de_lesiones: string,
  distribucion: string,
  foto_de_lesion: string,
  created_at: string,
}

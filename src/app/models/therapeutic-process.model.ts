export type ProcessStatus = 'concluido' | 'deserta' | 'va_y_vuelve' | 'remision';
export type FollowUpPeriod = '1m' | '3m' | '6m' | '1a';

export interface ConsultationMotive {
  reason: string;
  cieCode?: string;
  dsmCode?: string;
  situationDescription: string;
}

export interface Session {
  sessionNumber: number;
  date: string;
  time: string;
  objectivesAndTechniques: string;
  sessionDescription: string;
}

export interface ProcessClosureConcluded {
  status: 'concluido';
  hadFollowUp: boolean;
  followUpPeriod?: FollowUpPeriod;
}

export interface ProcessClosureDeserted {
  status: 'deserta';
  followUpPeriod: FollowUpPeriod;
}

export interface ProcessClosureBackAndForth {
  status: 'va_y_vuelve';
  hadRelapses: boolean;
}

export interface ProcessClosureReferral {
  status: 'remision';
  hadImprovement: boolean;
}

export type ProcessClosureInfo =
  | ProcessClosureConcluded
  | ProcessClosureDeserted
  | ProcessClosureBackAndForth
  | ProcessClosureReferral;

export interface ProcessClosure {
  closureInfo: ProcessClosureInfo;
  observations: string;
  recommendations: string;
}

export interface TherapeuticProcess {
  patientId?: string;
  consultationMotive: ConsultationMotive;
  sessions: Session[];
  closure?: ProcessClosure;
  createdAt?: string;
  updatedAt?: string;
}


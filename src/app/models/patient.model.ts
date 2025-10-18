export type Sex = 'masculino' | 'femenino';

export type IdType = 'CC' | 'CE' | 'PA' | 'TI' | 'RC';

export type MaritalStatus =
  | 'soltero'
  | 'casado'
  | 'union_libre'
  | 'separado'
  | 'viudo';

export type EducationLevel =
  | 'ninguna'
  | 'primaria_completa'
  | 'primaria_incompleta'
  | 'secundaria_completa'
  | 'secundaria_incompleta'
  | 'tecnico_completo'
  | 'tecnico_incompleto'
  | 'tecnologico_completo'
  | 'tecnologico_incompleto'
  | 'universitario_completo'
  | 'universitario_incompleto'
  | 'postgrado_completo'
  | 'postgrado_incompleto';

export type Occupation = 'estudiante' | 'empleado' | 'independiente' | 'desempleado' | 'hogar' | 'otro';

export type MinorOccupation = 'estudiante' | 'hogar' | 'otra';

export type MembershipType = 'cotizante' | 'beneficiario';

export type Relationship = 'padre' | 'madre' | 'hermano' | 'hermana' | 'abuelo' | 'abuela' | 'tio' | 'tia' | 'otro';

export type ParentsMaritalStatus =
  | 'solteros'
  | 'casados'
  | 'union_libre'
  | 'separados'
  | 'viudo_a';

export interface PersonalInfo {
  fullName: string;
  birthDate: string;
  age: number;
  sex: Sex;
  idType: IdType;
  idNumber: string;
  birthPlace: string;
}

export interface ContactInfo {
  address: string;
  municipality: string;
  neighborhood: string;
  socioeconomicLevel: number;
  phone: string;
}

export interface CivilEducationalInfo {
  maritalStatus: MaritalStatus;
  educationLevel: EducationLevel;
  occupation: Occupation;
  otherOccupation?: string;
  institution?: string;
}

export interface HealthInfo {
  hasHealthService: boolean;
  healthServiceName?: string;
  membershipType?: MembershipType;
  takesMedication: boolean;
  medications?: string;
}

export interface ReferralInfo {
  wasReferred: boolean;
  referredBy?: string;
  referralReason?: string;
}

export interface PreviousAttentionInfo {
  hadPreviousAttention: boolean;
  location?: string;
  duration?: string;
  endReason?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface AdultPatientData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  civilEducationalInfo: CivilEducationalInfo;
  healthInfo: HealthInfo;
  referralInfo: ReferralInfo;
  psychologicalAttention: PreviousAttentionInfo;
  psychiatricAttention: PreviousAttentionInfo;
  familyMembers: FamilyMember[];
  emergencyContact: EmergencyContact;
  healthBackground: HealthBackground;
}

// Minor-specific interfaces
export interface GuardianInfo {
  name: string;
  idNumber: string;
  relationship: string;
}

export interface MinorEducationalInfo {
  occupation: MinorOccupation;
  otherOccupation?: string;
  grade?: string;
  institution?: string;
}

export interface ParentInfo {
  fullName: string;
  age: number;
  education: EducationLevel;
  landlinePhone?: string;
  cellPhone: string;
  occupation: string;
  workplace?: string;
}

export interface ParentsInfo {
  maritalStatus: ParentsMaritalStatus;
  father: ParentInfo;
  mother: ParentInfo;
}

export interface FamilyMember {
  name: string;
  relationship: string;
  age: number;
  occupation: string;
}

export interface HealthBackground {
  personalSomaticConditions: string;
  familySomaticConditions: string;
  personalPsychologicalHistory: string;
  familyPsychologicalHistory: string;
}

export interface MinorPatientData {
  guardianInfo: GuardianInfo;
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  educationalInfo: MinorEducationalInfo;
  healthInfo: Omit<HealthInfo, 'membershipType'>; // Menores no tienen tipo de vinculación
  referralInfo: ReferralInfo;
  psychologicalAttention: PreviousAttentionInfo;
  psychiatricAttention: PreviousAttentionInfo;
  parentsInfo: ParentsInfo;
  familyMembers: FamilyMember[];
  healthBackground: HealthBackground;
}

export type PatientData = AdultPatientData | MinorPatientData;


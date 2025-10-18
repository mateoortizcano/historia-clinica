import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import {
  AdultPatientData,
  MinorPatientData,
  PersonalInfo,
} from '../../models/patient.model';
import { PersonalInfoSectionComponent } from './sections/personal-info-section/personal-info-section.component';
import { ContactInfoSectionComponent } from './sections/contact-info-section/contact-info-section.component';
import { CivilEducationalSectionComponent } from './sections/civil-educational-section/civil-educational-section.component';
import { MinorEducationalSectionComponent } from './sections/minor-educational-section/minor-educational-section.component';
import {
  HealthHistorySectionComponent,
  HealthHistoryInfo,
} from './sections/health-history-section/health-history-section.component';
import { EmergencyContactSectionComponent } from './sections/emergency-contact-section/emergency-contact-section.component';
import { GuardianInfoSectionComponent } from './sections/guardian-info-section/guardian-info-section.component';
import { ParentsInfoSectionComponent } from './sections/parents-info-section/parents-info-section.component';
import { FamilyMembersSectionComponent } from './sections/family-members-section/family-members-section.component';
import { HealthBackgroundSectionComponent } from './sections/health-background-section/health-background-section.component';
import { StepperComponent, Step } from '../shared/stepper/stepper.component';

type PatientDataUnion = Partial<AdultPatientData & MinorPatientData>;

interface StepValidations {
  guardianInfo: boolean;
  personalInfo: boolean;
  contactInfo: boolean;
  educationalInfo: boolean;
  healthHistory: boolean;
  parentsInfo: boolean;
  familyMembers: boolean;
  emergencyContact: boolean;
  healthBackground: boolean;
}

@Component({
  selector: 'app-patient-registration',
  imports: [
    StepperComponent,
    PersonalInfoSectionComponent,
    ContactInfoSectionComponent,
    CivilEducationalSectionComponent,
    MinorEducationalSectionComponent,
    HealthHistorySectionComponent,
    EmergencyContactSectionComponent,
    GuardianInfoSectionComponent,
    ParentsInfoSectionComponent,
    FamilyMembersSectionComponent,
    HealthBackgroundSectionComponent,
  ],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientRegistrationComponent {
  patientData = signal<PatientDataUnion>({});
  currentStepIndex = signal(0);

  // Computed: detecta automáticamente si es menor de edad según la fecha de nacimiento
  isMinor = computed(() => {
    const personalInfo = this.patientData().personalInfo;
    if (!personalInfo?.age) return false;
    return personalInfo.age < 18;
  });

  // Step validation states - dinámicas según tipo de paciente
  private stepValidations = signal<StepValidations>({
    guardianInfo: false,
    personalInfo: false,
    contactInfo: false,
    educationalInfo: false,
    healthHistory: false,
    parentsInfo: false,
    familyMembers: false,
    emergencyContact: false,
    healthBackground: false,
  });

  // Steps dinámicos según tipo de paciente
  steps = computed<Step[]>(() => {
    const validations = this.stepValidations();
    const minor = this.isMinor();

    if (minor) {
      // Steps para menor de edad
      return [
        {
          id: 'personal',
          label: 'Información Personal',
          completed: validations.personalInfo,
          valid: validations.personalInfo,
        },
        {
          id: 'guardian',
          label: 'Acompañante',
          completed: validations.guardianInfo,
          valid: validations.guardianInfo,
        },
        {
          id: 'contact',
          label: 'Contacto',
          completed: validations.contactInfo,
          valid: validations.contactInfo,
        },
        {
          id: 'educational',
          label: 'Educación',
          completed: validations.educationalInfo,
          valid: validations.educationalInfo,
        },
        {
          id: 'health-history',
          label: 'Salud e Historia Clínica',
          completed: validations.healthHistory,
          valid: validations.healthHistory,
        },
        {
          id: 'parents',
          label: 'Información de Padres',
          completed: validations.parentsInfo,
          valid: validations.parentsInfo,
        },
        {
          id: 'family',
          label: 'Información Familiar',
          completed: validations.familyMembers,
          valid: validations.familyMembers,
        },
        {
          id: 'health-background',
          label: 'Antecedentes',
          completed: validations.healthBackground,
          valid: validations.healthBackground,
        },
      ];
    } else {
      // Steps para adulto
      return [
        {
          id: 'personal',
          label: 'Información Personal',
          completed: validations.personalInfo,
          valid: validations.personalInfo,
        },
        {
          id: 'contact',
          label: 'Contacto',
          completed: validations.contactInfo,
          valid: validations.contactInfo,
        },
        {
          id: 'civil',
          label: 'Civil y Educativa',
          completed: validations.educationalInfo,
          valid: validations.educationalInfo,
        },
        {
          id: 'health-history',
          label: 'Salud e Historia Clínica',
          completed: validations.healthHistory,
          valid: validations.healthHistory,
        },
        {
          id: 'family',
          label: 'Información Familiar',
          completed: validations.familyMembers,
          valid: validations.familyMembers,
        },
        {
          id: 'emergency',
          label: 'Contacto Emergencia',
          completed: validations.emergencyContact,
          valid: validations.emergencyContact,
        },
        {
          id: 'health-background',
          label: 'Antecedentes',
          completed: validations.healthBackground,
          valid: validations.healthBackground,
        },
      ];
    }
  });

  onGuardianInfoChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      guardianInfo: data,
    }));
    this.stepValidations.update((v) => ({ ...v, guardianInfo: true }));
  }

  onPersonalInfoChange(data: Partial<PersonalInfo>) {
    this.patientData.update((current) => ({
      ...current,
      personalInfo: data as PersonalInfo,
    }));
    // Solo marcar como válido si los datos están completos
    const isComplete = !!(
      data.fullName &&
      data.birthDate &&
      data.age &&
      data.sex &&
      data.idType &&
      data.idNumber &&
      data.birthPlace
    );
    this.stepValidations.update((v) => ({ ...v, personalInfo: isComplete }));
  }

  onContactInfoChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      contactInfo: data,
    }));
    this.stepValidations.update((v) => ({ ...v, contactInfo: true }));
  }

  onCivilEducationalInfoChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      civilEducationalInfo: data,
    }));
    this.stepValidations.update((v) => ({ ...v, educationalInfo: true }));
  }

  onMinorEducationalInfoChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      educationalInfo: data,
    }));
    this.stepValidations.update((v) => ({ ...v, educationalInfo: true }));
  }

  onHealthHistoryChange(data: Partial<HealthHistoryInfo>) {
    this.patientData.update((current) => ({
      ...current,
      healthInfo: data.healthInfo,
      referralInfo: data.referralInfo,
      psychologicalAttention: data.psychologicalAttention,
      psychiatricAttention: data.psychiatricAttention,
    }));
    this.stepValidations.update((v) => ({ ...v, healthHistory: true }));
  }

  onParentsInfoChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      parentsInfo: data,
    }));
    this.stepValidations.update((v) => ({ ...v, parentsInfo: true }));
  }

  onFamilyMembersChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      familyMembers: data,
    }));
    this.stepValidations.update((v) => ({ ...v, familyMembers: true }));
  }

  onEmergencyContactChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      emergencyContact: data,
    }));
    this.stepValidations.update((v) => ({ ...v, emergencyContact: true }));
  }

  onHealthBackgroundChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      healthBackground: data,
    }));
    this.stepValidations.update((v) => ({ ...v, healthBackground: true }));
  }

  onStepChange(stepIndex: number) {
    this.currentStepIndex.set(stepIndex);
  }

  saveDraft() {
    console.log('Guardando borrador...', this.patientData());
    // TODO: Implementar guardado de borrador en el backend
    alert(
      'Borrador guardado exitosamente (funcionalidad pendiente de implementación)'
    );
  }

  submitForm() {
    if (!this.isFormValid()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    console.log('Enviando formulario...', this.patientData());
    // TODO: Implementar envío al backend
    alert(
      'Formulario enviado exitosamente (funcionalidad pendiente de implementación)'
    );
  }

  isFormValid(): boolean {
    const validations = this.stepValidations();
    const minor = this.isMinor();

    if (minor) {
      // Validar campos de menor
      return !!(
        validations.guardianInfo &&
        validations.personalInfo &&
        validations.contactInfo &&
        validations.educationalInfo &&
        validations.healthHistory &&
        validations.parentsInfo &&
        validations.familyMembers &&
        validations.healthBackground
      );
    } else {
      // Validar campos de adulto
      return !!(
        validations.personalInfo &&
        validations.contactInfo &&
        validations.educationalInfo &&
        validations.healthHistory &&
        validations.familyMembers &&
        validations.emergencyContact &&
        validations.healthBackground
      );
    }
  }

  isStepVisible(stepId: string): boolean {
    const currentSteps = this.steps();
    const currentStepIndex = this.currentStepIndex();
    if (currentStepIndex >= currentSteps.length) return false;
    return currentSteps[currentStepIndex]?.id === stepId;
  }

  getStepDataForHealthHistory() {
    const data = this.patientData();
    return {
      healthInfo: data.healthInfo,
      referralInfo: data.referralInfo,
      psychologicalAttention: data.psychologicalAttention,
      psychiatricAttention: data.psychiatricAttention,
    };
  }
}


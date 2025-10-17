import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { AdultPatientData } from '../../models/patient.model';
import { PersonalInfoSectionComponent } from './sections/personal-info-section/personal-info-section.component';
import { ContactInfoSectionComponent } from './sections/contact-info-section/contact-info-section.component';
import { CivilEducationalSectionComponent } from './sections/civil-educational-section/civil-educational-section.component';
import { HealthHistorySectionComponent, HealthHistoryInfo } from './sections/health-history-section/health-history-section.component';
import { EmergencyContactSectionComponent } from './sections/emergency-contact-section/emergency-contact-section.component';
import { StepperComponent, Step } from '../shared/stepper/stepper.component';

@Component({
  selector: 'app-adult-patient-registration',
  imports: [
    StepperComponent,
    PersonalInfoSectionComponent,
    ContactInfoSectionComponent,
    CivilEducationalSectionComponent,
    HealthHistorySectionComponent,
    EmergencyContactSectionComponent,
  ],
  templateUrl: './adult-patient-registration.component.html',
  styleUrl: './adult-patient-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdultPatientRegistrationComponent {
  patientData = signal<Partial<AdultPatientData>>({});
  currentStepIndex = signal(0);

  // Step validation states
  private stepValidations = signal({
    personalInfo: false,
    contactInfo: false,
    civilEducationalInfo: false,
    healthHistory: false,
    emergencyContact: false,
  });

  steps = computed<Step[]>(() => {
    const validations = this.stepValidations();
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
        completed: validations.civilEducationalInfo,
        valid: validations.civilEducationalInfo,
      },
      {
        id: 'health-history',
        label: 'Salud e Historia Clínica',
        completed: validations.healthHistory,
        valid: validations.healthHistory,
      },
      {
        id: 'emergency',
        label: 'Contacto Emergencia',
        completed: validations.emergencyContact,
        valid: validations.emergencyContact,
      },
    ];
  });

  onPersonalInfoChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      personalInfo: data,
    }));
    this.stepValidations.update((v) => ({ ...v, personalInfo: true }));
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
    this.stepValidations.update((v) => ({ ...v, civilEducationalInfo: true }));
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

  onEmergencyContactChange(data: any) {
    this.patientData.update((current) => ({
      ...current,
      emergencyContact: data,
    }));
    this.stepValidations.update((v) => ({ ...v, emergencyContact: true }));
  }

  onStepChange(stepIndex: number) {
    this.currentStepIndex.set(stepIndex);
  }

  saveDraft() {
    console.log('Guardando borrador...', this.patientData());
    // TODO: Implementar guardado de borrador en el backend
    alert('Borrador guardado exitosamente (funcionalidad pendiente de implementación)');
  }

  submitForm() {
    if (!this.isFormValid()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    console.log('Enviando formulario...', this.patientData());
    // TODO: Implementar envío al backend
    alert('Formulario enviado exitosamente (funcionalidad pendiente de implementación)');
  }

  isFormValid(): boolean {
    const validations = this.stepValidations();
    return Object.values(validations).every((v) => v === true);
  }

  isStepVisible(stepIndex: number): boolean {
    return this.currentStepIndex() === stepIndex;
  }
}


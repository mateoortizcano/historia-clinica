import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  OnInit,
  inject,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';

interface PatientData {
  id: string;
  patientType: 'adult' | 'minor';
  personalInfo: any;
  civilEducationalInfo?: any;
  contactInfo: any;
  emergencyContact: any;
  healthInfo: any;
  healthHistory: any;
  healthBackground: any;
  referralInfo: any;
  psychiatricAttention?: any;
  psychologicalAttention?: any;
  parentsInfo?: any;
  guardianInfo?: any;
  familyMembers?: any[];
  minorEducationalInfo?: any;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-patient-detail',
  imports: [CommonModule],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private mockDataService = inject(MockDataService);

  patientId = signal('');
  patient = signal<PatientData | null>(null);
  isLoading = signal(false);

  isAdult = computed(() => this.patient()?.patientType === 'adult');
  isMinor = computed(() => this.patient()?.patientType === 'minor');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('patientId');
    if (id) {
      this.patientId.set(id);
      this.loadPatientData(id);
    }
  }

  private loadPatientData(patientId: string) {
    this.isLoading.set(true);

    this.mockDataService.getPatientById(patientId).subscribe({
      next: (patient) => {
        if (patient) {
          this.patient.set(patient as PatientData);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading patient:', error);
        this.isLoading.set(false);
      },
    });
  }

  goBack() {
    this.router.navigate(['/proceso-terapeutico/paciente', this.patientId()]);
  }

  goToProcesses() {
    this.router.navigate(['/proceso-terapeutico/paciente', this.patientId()]);
  }

  calculateAge(birthDate: string): number {
    return this.mockDataService.calculateAge(birthDate);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'No especificado';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getGenderLabel(gender: string): string {
    const labels: Record<string, string> = {
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
    };
    return labels[gender] || gender;
  }

  getIdTypeLabel(idType: string): string {
    const labels: Record<string, string> = {
      cc: 'Cédula de Ciudadanía',
      ti: 'Tarjeta de Identidad',
      ce: 'Cédula de Extranjería',
      passport: 'Pasaporte',
      rc: 'Registro Civil',
    };
    return labels[idType] || idType;
  }

  getMaritalStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      single: 'Soltero/a',
      married: 'Casado/a',
      divorced: 'Divorciado/a',
      widowed: 'Viudo/a',
      separated: 'Separado/a',
      union: 'Unión libre',
    };
    return labels[status] || status;
  }

  getEducationLevelLabel(level: string): string {
    const labels: Record<string, string> = {
      none: 'Ninguno',
      primary: 'Primaria',
      secondary: 'Secundaria',
      technical: 'Técnico',
      university: 'Universitario',
      postgraduate: 'Postgrado',
    };
    return labels[level] || level;
  }

  getReferralSourceLabel(source: string): string {
    const labels: Record<string, string> = {
      self: 'Iniciativa propia',
      medical: 'Remisión médica',
      educational: 'Institución educativa',
      legal: 'Entidad legal',
      family: 'Familiar',
      other: 'Otro',
    };
    return labels[source] || source;
  }

  getInstitutionTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      public: 'Pública',
      private: 'Privada',
      subsidized: 'Subsidiada',
    };
    return labels[type] || type;
  }
}


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
  returnTo = signal<string>('process-list'); // Default a lista de procesos

  isAdult = computed(() => this.patient()?.patientType === 'adult');
  isMinor = computed(() => this.patient()?.patientType === 'minor');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('patientId');
    const returnToParam = this.route.snapshot.queryParamMap.get('returnTo');
    
    if (returnToParam) {
      this.returnTo.set(returnToParam);
    }
    
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
    if (this.returnTo() === 'patient-list') {
      // Volver al listado de pacientes
      this.router.navigate(['/proceso-terapeutico']);
    } else {
      // Volver al listado de procesos del paciente
      this.router.navigate(['/proceso-terapeutico/paciente', this.patientId()]);
    }
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

  formatMaritalStatus(status: string): string {
    const labels: Record<string, string> = {
      soltero: 'Soltero/a',
      casado: 'Casado/a',
      union_libre: 'Unión libre',
      separado: 'Separado/a',
      viudo: 'Viudo/a',
    };
    return labels[status] || status;
  }

  formatParentsMaritalStatus(status: string): string {
    const labels: Record<string, string> = {
      solteros: 'Solteros',
      casados: 'Casados',
      union_libre: 'Unión libre',
      separados: 'Separados',
      viudo_a: 'Viudo(a)',
    };
    return labels[status] || status;
  }

  formatEducationLevel(level: string): string {
    const labels: Record<string, string> = {
      ninguna: 'Ninguna',
      primaria_completa: 'Primaria completa',
      primaria_incompleta: 'Primaria incompleta',
      secundaria_completa: 'Secundaria completa',
      secundaria_incompleta: 'Secundaria incompleta',
      tecnico_completo: 'Técnico completo',
      tecnico_incompleto: 'Técnico incompleto',
      tecnologico_completo: 'Tecnológico completo',
      tecnologico_incompleto: 'Tecnológico incompleto',
      universitario_completo: 'Universitario completo',
      universitario_incompleto: 'Universitario incompleto',
      postgrado_completo: 'Postgrado completo',
      postgrado_incompleto: 'Postgrado incompleto',
    };
    return labels[level] || level;
  }

  // Helper methods to safely access type-specific properties
  getGuardianInfo(): any {
    return (this.patient() as any)?.guardianInfo;
  }

  getCivilEducationalInfo(): any {
    return (this.patient() as any)?.civilEducationalInfo;
  }

  getEducationalInfo(): any {
    return (this.patient() as any)?.educationalInfo;
  }

  getParentsInfo(): any {
    return (this.patient() as any)?.parentsInfo;
  }

  getEmergencyContact(): any {
    return (this.patient() as any)?.emergencyContact;
  }

  getMembershipType(): string | undefined {
    return (this.patient()?.healthInfo as any)?.membershipType;
  }
}


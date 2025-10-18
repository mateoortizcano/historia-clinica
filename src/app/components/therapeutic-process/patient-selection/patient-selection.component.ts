import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

// Interfaz temporal para pacientes (luego vendrá del backend)
interface PatientSummary {
  id: string;
  fullName: string;
  idNumber: string;
  age: number;
  phone?: string;
  activeProcesses: number;
  closedProcesses: number;
}

@Component({
  selector: 'app-patient-selection',
  imports: [ReactiveFormsModule],
  templateUrl: './patient-selection.component.html',
  styleUrl: './patient-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientSelectionComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  searchForm = this.fb.group({
    searchTerm: [''],
  });

  // TODO: Reemplazar con datos reales del backend
  allPatients = signal<PatientSummary[]>([
    {
      id: '1',
      fullName: 'Juan Pérez García',
      idNumber: '1234567890',
      age: 35,
      phone: '3001234567',
      activeProcesses: 1,
      closedProcesses: 2,
    },
    {
      id: '2',
      fullName: 'María Rodríguez López',
      idNumber: '0987654321',
      age: 28,
      phone: '3109876543',
      activeProcesses: 0,
      closedProcesses: 1,
    },
    {
      id: '3',
      fullName: 'Carlos Martínez Sánchez',
      idNumber: '1122334455',
      age: 42,
      phone: '3201122334',
      activeProcesses: 1,
      closedProcesses: 0,
    },
  ]);

  searchTerm = signal('');

  filteredPatients = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.allPatients();

    return this.allPatients().filter(
      (patient) =>
        patient.fullName.toLowerCase().includes(term) ||
        patient.idNumber.includes(term) ||
        patient.phone?.includes(term)
    );
  });

  constructor() {
    this.searchForm.get('searchTerm')?.valueChanges.subscribe((value) => {
      this.searchTerm.set(value || '');
    });
  }

  selectPatient(patientId: string) {
    this.router.navigate(['/proceso-terapeutico/paciente', patientId]);
  }

  goToPatientRegistration() {
    this.router.navigate(['/pacientes/registro']);
  }

  getStatusBadgeClass(patient: PatientSummary): string {
    if (patient.activeProcesses > 0) return 'bg-success';
    if (patient.closedProcesses > 0) return 'bg-secondary';
    return 'bg-warning';
  }

  getStatusText(patient: PatientSummary): string {
    if (patient.activeProcesses > 0) {
      return `${patient.activeProcesses} proceso(s) activo(s)`;
    }
    if (patient.closedProcesses > 0) {
      return 'Sin procesos activos';
    }
    return 'Sin procesos';
  }
}


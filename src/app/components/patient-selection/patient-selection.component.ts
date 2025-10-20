import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';

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
export class PatientSelectionComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private mockDataService = inject(MockDataService);

  searchForm = this.fb.group({
    searchTerm: [''],
  });

  allPatients = signal<PatientSummary[]>([]);
  searchTerm = signal('');
  isLoading = signal(false);

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

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.isLoading.set(true);
    
    this.mockDataService.getAllPatients().subscribe({
      next: (patients) => {
        const patientSummaries: PatientSummary[] = patients.map((patient) => ({
          id: patient.id,
          fullName: this.mockDataService.getFullName(patient),
          idNumber: patient.personalInfo.idNumber,
          age: this.mockDataService.calculateAge(patient.personalInfo.birthDate),
          phone: patient.contactInfo?.phone,
          activeProcesses: 0, // Will be updated with process stats
          closedProcesses: 0,
        }));

        // Load process stats for each patient
        patientSummaries.forEach((summary, index) => {
          this.mockDataService.getProcessStats(summary.id).subscribe({
            next: (stats) => {
              summary.activeProcesses = stats.active;
              summary.closedProcesses = stats.closed;
              // Trigger signal update
              if (index === patientSummaries.length - 1) {
                this.allPatients.set([...patientSummaries]);
                this.isLoading.set(false);
              }
            },
          });
        });

        // If no patients, still set loading to false
        if (patientSummaries.length === 0) {
          this.allPatients.set(patientSummaries);
          this.isLoading.set(false);
        }
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.isLoading.set(false);
      },
    });
  }

  selectPatient(patientId: string) {
    this.router.navigate(['/proceso-terapeutico/paciente', patientId]);
  }

  viewPatientDetail(patientId: string) {
    this.router.navigate(['/paciente', patientId, 'detalle'], {
      queryParams: { returnTo: 'patient-list' }
    });
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


import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  inject,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { PatientInfoHeaderComponent, PatientHeaderInfo } from '../shared/patient-info-header/patient-info-header.component';

interface PatientInfo extends PatientHeaderInfo {
  id: string;
}

interface ProcessSummary {
  id: string;
  status: 'active' | 'closed';
  consultationReason: string;
  startDate: string;
  lastSessionDate?: string;
  closureDate?: string;
  sessionsCount: number;
  closureStatus?: string;
}

@Component({
  selector: 'app-process-selection',
  imports: [CommonModule, PatientInfoHeaderComponent],
  templateUrl: './process-selection.component.html',
  styleUrl: './process-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSelectionComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private mockDataService = inject(MockDataService);

  patientId = signal('');
  patient = signal<PatientInfo | null>(null);
  processes = signal<ProcessSummary[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('patientId');
    if (id) {
      this.patientId.set(id);
      this.loadPatientData(id);
      this.loadProcesses(id);
    }
  }

  private loadPatientData(patientId: string) {
    this.isLoading.set(true);
    
    this.mockDataService.getPatientById(patientId).subscribe({
      next: (patient) => {
        if (patient) {
          this.patient.set({
            id: patient.id,
            fullName: this.mockDataService.getFullName(patient),
            idType: patient.personalInfo.idType,
            idNumber: patient.personalInfo.idNumber,
            age: this.mockDataService.calculateAge(patient.personalInfo.birthDate),
          });
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading patient:', error);
        this.isLoading.set(false);
      },
    });
  }

  private loadProcesses(patientId: string) {
    this.mockDataService.getProcessesByPatientId(patientId).subscribe({
      next: (processes) => {
        const processSummaries: ProcessSummary[] = processes.map((process) => {
          const lastSession = process.sessions.length > 0
            ? process.sessions[process.sessions.length - 1]
            : null;

          const closureStatusLabel = process.closure?.closureInfo?.status
            ? this.getClosureStatusLabel(process.closure.closureInfo.status)
            : undefined;

          return {
            id: process.id,
            status: process.status,
            consultationReason: process.consultationMotive.reason,
            startDate: process.startDate,
            lastSessionDate: lastSession?.date,
            closureDate: process.closureDate,
            sessionsCount: process.sessions.length,
            closureStatus: closureStatusLabel,
          };
        });

        this.processes.set(processSummaries);
      },
      error: (error) => {
        console.error('Error loading processes:', error);
      },
    });
  }

  private getClosureStatusLabel(status: string): string {
    const statusMap: Record<string, string> = {
      'concluido': 'Concluido',
      'deserta': 'Deserta',
      'va_y_vuelve': 'Va y vuelve',
      'remision': 'Remisión',
    };
    return statusMap[status] || status;
  }

  goBack() {
    this.router.navigate(['/proceso-terapeutico']);
  }

  viewPatientDetail() {
    this.router.navigate(['/paciente', this.patientId(), 'detalle'], {
      queryParams: { returnTo: 'process-list' }
    });
  }

  createNewProcess() {
    this.router.navigate([
      '/proceso-terapeutico/paciente',
      this.patientId(),
      'nuevo',
    ]);
  }

  openProcess(processId: string) {
    this.router.navigate([
      '/proceso-terapeutico/paciente',
      this.patientId(),
      'proceso',
      processId,
    ]);
  }

  getActiveProcesses() {
    return this.processes().filter((p) => p.status === 'active');
  }

  getClosedProcesses() {
    return this.processes().filter((p) => p.status === 'closed');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}


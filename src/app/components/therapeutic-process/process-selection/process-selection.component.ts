import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  inject,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// Interfaces temporales (luego vendrán del backend)
interface PatientInfo {
  id: string;
  fullName: string;
  idNumber: string;
  age: number;
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
  imports: [CommonModule],
  templateUrl: './process-selection.component.html',
  styleUrl: './process-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSelectionComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  patientId = signal('');
  patient = signal<PatientInfo | null>(null);
  processes = signal<ProcessSummary[]>([]);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('patientId');
    if (id) {
      this.patientId.set(id);
      this.loadPatientData(id);
      this.loadProcesses(id);
    }
  }

  // TODO: Reemplazar con llamadas reales al backend
  private loadPatientData(patientId: string) {
    // Mock data
    const mockPatients: Record<string, PatientInfo> = {
      '1': {
        id: '1',
        fullName: 'Juan Pérez García',
        idNumber: '1234567890',
        age: 35,
      },
      '2': {
        id: '2',
        fullName: 'María Rodríguez López',
        idNumber: '0987654321',
        age: 28,
      },
      '3': {
        id: '3',
        fullName: 'Carlos Martínez Sánchez',
        idNumber: '1122334455',
        age: 42,
      },
    };
    
    this.patient.set(mockPatients[patientId] || null);
  }

  private loadProcesses(patientId: string) {
    // Mock data
    const mockProcesses: Record<string, ProcessSummary[]> = {
      '1': [
        {
          id: 'proc-1',
          status: 'active',
          consultationReason: 'Manejo de ansiedad y estrés laboral',
          startDate: '2025-01-15',
          lastSessionDate: '2025-10-10',
          sessionsCount: 8,
        },
        {
          id: 'proc-2',
          status: 'closed',
          consultationReason: 'Proceso de duelo',
          startDate: '2024-05-20',
          closureDate: '2024-11-30',
          sessionsCount: 12,
          closureStatus: 'Concluido',
        },
      ],
      '2': [
        {
          id: 'proc-3',
          status: 'closed',
          consultationReason: 'Depresión post-parto',
          startDate: '2024-08-01',
          closureDate: '2025-02-15',
          sessionsCount: 15,
          closureStatus: 'Concluido',
        },
      ],
      '3': [
        {
          id: 'proc-4',
          status: 'active',
          consultationReason: 'Trastorno de pánico',
          startDate: '2025-09-01',
          lastSessionDate: '2025-10-15',
          sessionsCount: 3,
        },
      ],
    };

    this.processes.set(mockProcesses[patientId] || []);
  }

  goBack() {
    this.router.navigate(['/proceso-terapeutico']);
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


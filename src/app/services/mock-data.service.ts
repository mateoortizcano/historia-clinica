import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import mockPatientsData from '../data/mock-patients.json';
import mockProcessesData from '../data/mock-processes.json';
import { TherapeuticProcess } from '../models/therapeutic-process.model';

// Tipos para los datos mock
interface MockPatient {
  id: string;
  patientType: 'adult' | 'minor';
  personalInfo: {
    firstName: string;
    secondName?: string;
    firstLastName: string;
    secondLastName?: string;
    birthDate: string;
    gender: string;
    idType: string;
    idNumber: string;
    birthPlace: string;
  };
  contactInfo: {
    address: string;
    neighborhood: string;
    city: string;
    phone: string;
    email?: string;
  };
  [key: string]: any;
}

interface MockProcess {
  id: string;
  patientId: string;
  status: 'active' | 'closed';
  startDate: string;
  closureDate?: string;
  consultationMotive: any;
  sessions: any[];
  closure: any;
  [key: string]: any;
}

/**
 * Servicio que simula llamadas a un API REST
 * Utiliza datos JSON mockeados y añade delays para simular latencia de red
 */
@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private readonly NETWORK_DELAY = 500; // Milliseconds
  private patients = signal<MockPatient[]>(mockPatientsData.patients as MockPatient[]);
  private processes = signal<MockProcess[]>(mockProcessesData.processes as MockProcess[]);

  constructor() {
    console.log('MockDataService initialized with:', {
      patients: this.patients().length,
      processes: this.processes().length,
    });
  }

  // ============================================
  // PATIENT ENDPOINTS
  // ============================================

  /**
   * GET /api/patients
   * Obtiene todos los pacientes
   */
  getAllPatients(): Observable<MockPatient[]> {
    return of(this.patients()).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * GET /api/patients/:id
   * Obtiene un paciente por ID
   */
  getPatientById(id: string): Observable<MockPatient | null> {
    const patient = this.patients().find((p) => p.id === id) || null;

    if (!patient) {
      return throwError(() => new Error(`Patient with id ${id} not found`)).pipe(
        delay(this.NETWORK_DELAY)
      );
    }

    return of(patient).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * GET /api/patients/search?term=xxx
   * Busca pacientes por término (nombre, ID, teléfono)
   */
  searchPatients(searchTerm: string): Observable<MockPatient[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return this.getAllPatients();
    }

    const term = searchTerm.toLowerCase().trim();

    return of(this.patients()).pipe(
      map((patients) =>
        patients.filter((patient) => {
          const fullName =
            `${patient.personalInfo.firstName} ${patient.personalInfo.secondName || ''} ${patient.personalInfo.firstLastName} ${patient.personalInfo.secondLastName || ''}`
              .toLowerCase()
              .trim();
          const idNumber = patient.personalInfo.idNumber.toLowerCase();
          const phone = patient.contactInfo?.phone?.toLowerCase() || '';

          return (
            fullName.includes(term) ||
            idNumber.includes(term) ||
            phone.includes(term)
          );
        })
      ),
      delay(this.NETWORK_DELAY)
    );
  }

  /**
   * POST /api/patients
   * Crea un nuevo paciente
   */
  createPatient(patientData: Partial<MockPatient>): Observable<MockPatient> {
    const newPatient: MockPatient = {
      id: `pat-${Date.now()}`,
      ...patientData,
    } as MockPatient;

    this.patients.update((patients) => [...patients, newPatient]);

    return of(newPatient).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * PUT /api/patients/:id
   * Actualiza un paciente existente
   */
  updatePatient(
    id: string,
    patientData: Partial<MockPatient>
  ): Observable<MockPatient> {
    const index = this.patients().findIndex((p) => p.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Patient with id ${id} not found`)).pipe(
        delay(this.NETWORK_DELAY)
      );
    }

    const updatedPatient = { ...this.patients()[index], ...patientData };
    this.patients.update((patients) => {
      const newPatients = [...patients];
      newPatients[index] = updatedPatient;
      return newPatients;
    });

    return of(updatedPatient).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * DELETE /api/patients/:id
   * Elimina un paciente
   */
  deletePatient(id: string): Observable<void> {
    const index = this.patients().findIndex((p) => p.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Patient with id ${id} not found`)).pipe(
        delay(this.NETWORK_DELAY)
      );
    }

    this.patients.update((patients) => patients.filter((p) => p.id !== id));

    return of(void 0).pipe(delay(this.NETWORK_DELAY));
  }

  // ============================================
  // PROCESS ENDPOINTS
  // ============================================

  /**
   * GET /api/processes/patient/:patientId
   * Obtiene todos los procesos de un paciente
   */
  getProcessesByPatientId(patientId: string): Observable<MockProcess[]> {
    const processes = this.processes().filter((p) => p.patientId === patientId);

    return of(processes).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * GET /api/processes/:id
   * Obtiene un proceso por ID
   */
  getProcessById(id: string): Observable<MockProcess | null> {
    const process = this.processes().find((p) => p.id === id) || null;

    if (!process) {
      return throwError(() => new Error(`Process with id ${id} not found`)).pipe(
        delay(this.NETWORK_DELAY)
      );
    }

    return of(process).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * POST /api/processes
   * Crea un nuevo proceso terapéutico
   */
  createProcess(processData: Partial<TherapeuticProcess>): Observable<TherapeuticProcess> {
    const newProcess: any = {
      id: `proc-${Date.now()}`,
      status: 'active',
      sessions: [],
      closure: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...processData,
    };

    this.processes.update((processes) => [...processes, newProcess]);

    return of(newProcess as TherapeuticProcess).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * PUT /api/processes/:id
   * Actualiza un proceso existente
   */
  updateProcess(
    id: string,
    processData: Partial<TherapeuticProcess>
  ): Observable<TherapeuticProcess> {
    const index = this.processes().findIndex((p) => p.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Process with id ${id} not found`)).pipe(
        delay(this.NETWORK_DELAY)
      );
    }

    const updatedProcess = {
      ...this.processes()[index],
      ...processData,
      updatedAt: new Date().toISOString(),
    };

    this.processes.update((processes) => {
      const newProcesses = [...processes];
      newProcesses[index] = updatedProcess;
      return newProcesses;
    });

    return of(updatedProcess as TherapeuticProcess).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * DELETE /api/processes/:id
   * Elimina un proceso (normalmente no se elimina, se cierra)
   */
  deleteProcess(id: string): Observable<void> {
    const index = this.processes().findIndex((p) => p.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Process with id ${id} not found`)).pipe(
        delay(this.NETWORK_DELAY)
      );
    }

    this.processes.update((processes) => processes.filter((p) => p.id !== id));

    return of(void 0).pipe(delay(this.NETWORK_DELAY));
  }

  /**
   * PATCH /api/processes/:id/close
   * Cierra un proceso terapéutico
   */
  closeProcess(id: string, closureData: any): Observable<TherapeuticProcess> {
    const index = this.processes().findIndex((p) => p.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Process with id ${id} not found`)).pipe(
        delay(this.NETWORK_DELAY)
      );
    }

    const closedProcess = {
      ...this.processes()[index],
      status: 'closed' as const,
      closureDate: new Date().toISOString().split('T')[0],
      closure: closureData,
      updatedAt: new Date().toISOString(),
    };

    this.processes.update((processes) => {
      const newProcesses = [...processes];
      newProcesses[index] = closedProcess;
      return newProcesses;
    });

    return of(closedProcess as TherapeuticProcess).pipe(delay(this.NETWORK_DELAY));
  }

  // ============================================
  // HELPER METHODS
  // ============================================

  /**
   * Calcula la edad a partir de la fecha de nacimiento
   */
  calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  /**
   * Obtiene el nombre completo de un paciente
   */
  getFullName(patient: MockPatient): string {
    const { firstName, secondName, firstLastName, secondLastName } =
      patient.personalInfo;
    return `${firstName} ${secondName || ''} ${firstLastName} ${secondLastName || ''}`
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Cuenta procesos activos y cerrados de un paciente
   */
  getProcessStats(patientId: string): Observable<{
    active: number;
    closed: number;
    total: number;
  }> {
    return this.getProcessesByPatientId(patientId).pipe(
      map((processes) => {
        const active = processes.filter((p) => p.status === 'active').length;
        const closed = processes.filter((p) => p.status === 'closed').length;
        return {
          active,
          closed,
          total: processes.length,
        };
      })
    );
  }

  /**
   * Simula un error de red
   */
  simulateNetworkError(): Observable<never> {
    return throwError(() => new Error('Network error: Unable to connect to server')).pipe(
      delay(this.NETWORK_DELAY)
    );
  }

  /**
   * Resetea los datos a su estado inicial
   * Útil para desarrollo/testing
   */
  resetData(): void {
    this.patients.set(mockPatientsData.patients as MockPatient[]);
    this.processes.set(mockProcessesData.processes as MockProcess[]);
    console.log('Mock data reset to initial state');
  }

  /**
   * Obtiene estadísticas generales del sistema
   */
  getSystemStats(): Observable<{
    totalPatients: number;
    totalProcesses: number;
    activeProcesses: number;
    closedProcesses: number;
  }> {
    return of({
      totalPatients: this.patients().length,
      totalProcesses: this.processes().length,
      activeProcesses: this.processes().filter((p) => p.status === 'active').length,
      closedProcesses: this.processes().filter((p) => p.status === 'closed').length,
    }).pipe(delay(this.NETWORK_DELAY));
  }
}


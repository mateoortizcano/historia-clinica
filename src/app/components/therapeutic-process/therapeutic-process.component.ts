import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TherapeuticProcess,
  ConsultationMotive,
  Session,
  ProcessClosure,
} from '../../models/therapeutic-process.model';
import { ConsultationMotiveSectionComponent } from './sections/consultation-motive-section/consultation-motive-section.component';
import { SessionRegistrationSectionComponent } from './sections/session-registration-section/session-registration-section.component';
import { ProcessClosureSectionComponent } from './sections/process-closure-section/process-closure-section.component';
import { MockDataService } from '../../services/mock-data.service';
import { PatientInfoHeaderComponent, PatientHeaderInfo } from '../shared/patient-info-header/patient-info-header.component';

type TabId = 'consultation-motive' | 'sessions' | 'closure';

interface TabValidations {
  consultationMotive: boolean;
  sessions: boolean;
  closure: boolean;
}

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  completed: boolean;
}

interface PatientInfo extends PatientHeaderInfo {
  id: string;
}

@Component({
  selector: 'app-therapeutic-process',
  imports: [
    ConsultationMotiveSectionComponent,
    SessionRegistrationSectionComponent,
    ProcessClosureSectionComponent,
    PatientInfoHeaderComponent,
  ],
  templateUrl: './therapeutic-process.component.html',
  styleUrl: './therapeutic-process.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TherapeuticProcessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private mockDataService = inject(MockDataService);

  patientId = signal('');
  processId = signal<string | null>(null);
  patient = signal<PatientInfo | null>(null);
  isNewProcess = computed(() => !this.processId());
  isProcessClosed = signal(false);
  isReadOnly = computed(() => this.isProcessClosed());
  isLoading = signal(false);
  
  processData = signal<Partial<TherapeuticProcess>>({
    sessions: [],
  });
  activeTab = signal<TabId>('consultation-motive');

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('patientId');
    const processId = this.route.snapshot.paramMap.get('processId');
    
    if (patientId) {
      this.patientId.set(patientId);
      this.loadPatientData(patientId);
    }
    
    if (processId) {
      this.processId.set(processId);
      this.loadProcessData(processId);
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

  private loadProcessData(processId: string) {
    this.isLoading.set(true);
    
    this.mockDataService.getProcessById(processId).subscribe({
      next: (process) => {
        if (process) {
          this.processData.set({
            consultationMotive: process.consultationMotive,
            sessions: process.sessions || [],
            closure: process.closure,
          });
          
          this.isProcessClosed.set(process.status === 'closed');
          
          // Actualizar validaciones según los datos cargados
          if (process.consultationMotive) {
            this.tabValidations.update((v) => ({ ...v, consultationMotive: true }));
          }
          if (process.sessions && process.sessions.length > 0) {
            this.tabValidations.update((v) => ({ ...v, sessions: true }));
          }
          if (process.closure) {
            this.tabValidations.update((v) => ({ ...v, closure: true }));
          }
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading process:', error);
        this.isLoading.set(false);
      },
    });
  }

  // Tab validation states
  private tabValidations = signal<TabValidations>({
    consultationMotive: false,
    sessions: false,
    closure: false,
  });

  // Tabs definition
  tabs = computed<Tab[]>(() => {
    const validations = this.tabValidations();

    return [
      {
        id: 'consultation-motive' as TabId,
        label: 'Motivo de Consulta',
        icon: 'bi-clipboard-pulse',
        completed: validations.consultationMotive,
      },
      {
        id: 'sessions' as TabId,
        label: 'Sesiones',
        icon: 'bi-calendar-check',
        completed: validations.sessions,
      },
      {
        id: 'closure' as TabId,
        label: 'Cierre del Proceso',
        icon: 'bi-check-circle',
        completed: validations.closure,
      },
    ];
  });

  sessionsCount = computed(() => this.processData().sessions?.length || 0);

  onConsultationMotiveChange(data: Partial<ConsultationMotive>) {
    this.processData.update((current) => ({
      ...current,
      consultationMotive: data as ConsultationMotive,
    }));
    
    // Validar que los campos requeridos estén completos
    const isComplete = !!(
      data.reason &&
      data.situationDescription
    );
    this.tabValidations.update((v) => ({
      ...v,
      consultationMotive: isComplete,
    }));
  }

  onSessionsChange(sessions: Session[]) {
    this.processData.update((current) => ({
      ...current,
      sessions,
    }));
    
    // Validar que haya al menos una sesión registrada
    const isComplete = sessions.length > 0;
    this.tabValidations.update((v) => ({
      ...v,
      sessions: isComplete,
    }));
  }

  onClosureChange(data: Partial<ProcessClosure>) {
    this.processData.update((current) => ({
      ...current,
      closure: data as ProcessClosure,
    }));
    
    // Validar que los campos requeridos estén completos
    const isComplete = !!(
      data.closureInfo &&
      data.observations &&
      data.recommendations
    );
    this.tabValidations.update((v) => ({
      ...v,
      closure: isComplete,
    }));
  }

  selectTab(tabId: TabId) {
    this.activeTab.set(tabId);
  }

  isTabActive(tabId: TabId): boolean {
    return this.activeTab() === tabId;
  }

  goBack() {
    this.router.navigate(['/proceso-terapeutico/paciente', this.patientId()]);
  }

  saveDraft() {
    console.log('Guardando borrador del proceso...', this.processData());
    // TODO: Implementar guardado de borrador en el backend
    alert(
      'Borrador guardado exitosamente (funcionalidad pendiente de implementación)'
    );
  }

  submitForm() {
    if (!this.isFormValid()) {
      alert('Por favor complete todos los pasos requeridos antes de finalizar');
      return;
    }

    const finalData = {
      ...this.processData(),
      patientId: this.patientId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('Enviando proceso terapéutico...', finalData);
    // TODO: Implementar envío al backend
    alert(
      'Proceso terapéutico guardado exitosamente (funcionalidad pendiente de implementación)'
    );
    
    // Redirigir a la lista de procesos del paciente
    this.goBack();
  }

  isFormValid(): boolean {
    const validations = this.tabValidations();
    return !!(
      validations.consultationMotive &&
      validations.sessions &&
      validations.closure
    );
  }

  canFinishWithoutClosure(): boolean {
    const validations = this.tabValidations();
    return !!(validations.consultationMotive && validations.sessions);
  }

  saveWithoutClosure() {
    if (!this.canFinishWithoutClosure()) {
      alert(
        'Debe completar al menos el motivo de consulta y registrar las sesiones'
      );
      return;
    }

    const finalData = {
      ...this.processData(),
      patientId: this.patientId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(
      'Guardando proceso terapéutico sin cierre...',
      finalData
    );
    // TODO: Implementar guardado en el backend
    alert(
      'Proceso guardado exitosamente. Puede completar el cierre posteriormente.'
    );
    
    // Redirigir a la lista de procesos del paciente
    this.goBack();
  }
}


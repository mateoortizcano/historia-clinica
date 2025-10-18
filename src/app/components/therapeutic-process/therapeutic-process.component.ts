import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import {
  TherapeuticProcess,
  ConsultationMotive,
  Session,
  ProcessClosure,
} from '../../models/therapeutic-process.model';
import { ConsultationMotiveSectionComponent } from './sections/consultation-motive-section/consultation-motive-section.component';
import { SessionRegistrationSectionComponent } from './sections/session-registration-section/session-registration-section.component';
import { ProcessClosureSectionComponent } from './sections/process-closure-section/process-closure-section.component';

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

@Component({
  selector: 'app-therapeutic-process',
  imports: [
    ConsultationMotiveSectionComponent,
    SessionRegistrationSectionComponent,
    ProcessClosureSectionComponent,
  ],
  templateUrl: './therapeutic-process.component.html',
  styleUrl: './therapeutic-process.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TherapeuticProcessComponent {
  processData = signal<Partial<TherapeuticProcess>>({
    sessions: [],
  });
  activeTab = signal<TabId>('consultation-motive');

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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('Enviando proceso terapéutico...', finalData);
    // TODO: Implementar envío al backend
    alert(
      'Proceso terapéutico guardado exitosamente (funcionalidad pendiente de implementación)'
    );
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
  }
}


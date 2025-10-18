import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
  effect,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Session } from '../../../../models/therapeutic-process.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-registration-section',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './session-registration-section.component.html',
  styleUrl: './session-registration-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionRegistrationSectionComponent {
  private fb = inject(FormBuilder);

  initialData = input<Session[]>([]);
  readOnly = input(false);
  dataChange = output<Session[]>();

  sessions = signal<Session[]>([]);
  editingSessionIndex = signal<number | null>(null);
  showForm = signal(false);
  expandedSessionIndex = signal<number | null>(null);

  sessionsCount = computed(() => this.sessions().length);
  isEditing = computed(() => this.editingSessionIndex() !== null);

  form = this.fb.group({
    sessionNumber: [
      { value: 1, disabled: false },
      [Validators.required, Validators.min(1)],
    ],
    date: ['', Validators.required],
    time: ['', Validators.required],
    objectivesAndTechniques: [
      '',
      [Validators.required, Validators.maxLength(2000)],
    ],
    sessionDescription: [
      '',
      [Validators.required, Validators.maxLength(5000)],
    ],
  });

  constructor() {
    // Effect para cargar datos iniciales cuando cambien
    effect(() => {
      const initial = this.initialData();
      if (initial && initial.length > 0) {
        this.sessions.set([...initial]);
      }
    });
  }

  startNewSession() {
    const nextSessionNumber = this.sessions().length + 1;
    this.form.reset({
      sessionNumber: nextSessionNumber,
      date: '',
      time: '',
      objectivesAndTechniques: '',
      sessionDescription: '',
    });
    this.form.get('sessionNumber')?.disable();
    this.editingSessionIndex.set(null);
    this.showForm.set(true);
  }

  saveSession() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = {
      ...this.form.getRawValue(),
    } as Session;

    // Solo se pueden agregar nuevas sesiones, no editar existentes
    this.sessions.update((sessions) => [...sessions, formValue]);

    this.dataChange.emit(this.sessions());
    this.cancelEdit();
  }

  cancelEdit() {
    this.showForm.set(false);
    this.editingSessionIndex.set(null);
    this.form.reset();
  }

  getSessionSummary(session: Session): string {
    const maxLength = 100;
    const description = session.sessionDescription;
    return description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  }

  toggleSessionDetails(index: number) {
    if (this.expandedSessionIndex() === index) {
      this.expandedSessionIndex.set(null);
    } else {
      this.expandedSessionIndex.set(index);
    }
  }

  isSessionExpanded(index: number): boolean {
    return this.expandedSessionIndex() === index;
  }
}


import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HealthBackground } from '../../../../models/patient.model';

@Component({
  selector: 'app-health-background-section',
  imports: [FormsModule],
  templateUrl: './health-background-section.component.html',
  styleUrl: './health-background-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthBackgroundSectionComponent {
  initialData = input<Partial<HealthBackground>>();
  dataChange = output<Partial<HealthBackground>>();

  formData = signal<Partial<HealthBackground>>({
    personalSomaticConditions: '',
    familySomaticConditions: '',
    personalPsychologicalHistory: '',
    familyPsychologicalHistory: '',
  });

  constructor() {
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.formData.set(data);
      }
    });
  }

  updateField<K extends keyof HealthBackground>(
    field: K,
    value: HealthBackground[K]
  ) {
    this.formData.update((current) => ({
      ...current,
      [field]: value,
    }));
    this.emitChange();
  }

  private emitChange() {
    this.dataChange.emit(this.formData());
  }
}


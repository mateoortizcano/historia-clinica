import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuardianInfo } from '../../../../models/patient.model';

@Component({
  selector: 'app-guardian-info-section',
  imports: [FormsModule],
  templateUrl: './guardian-info-section.component.html',
  styleUrl: './guardian-info-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuardianInfoSectionComponent {
  initialData = input<Partial<GuardianInfo>>();
  dataChange = output<GuardianInfo>();

  guardianData = signal<Partial<GuardianInfo>>({
    name: '',
    idNumber: '',
    relationship: '',
  });

  constructor() {
    effect(() => {
      const initial = this.initialData();
      if (initial) {
        this.guardianData.set(initial);
      }
    });
  }

  onFieldChange() {
    const data = this.guardianData();
    if (this.isFormValid(data)) {
      this.dataChange.emit(data as GuardianInfo);
    }
  }

  private isFormValid(data: Partial<GuardianInfo>): data is GuardianInfo {
    return !!(data.name && data.idNumber && data.relationship);
  }

  updateField(field: keyof GuardianInfo, value: string) {
    this.guardianData.update((current) => ({
      ...current,
      [field]: value,
    }));
    this.onFieldChange();
  }
}


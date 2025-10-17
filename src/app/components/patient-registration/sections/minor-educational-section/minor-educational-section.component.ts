import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MinorEducationalInfo, MinorOccupation } from '../../../../models/patient.model';

@Component({
  selector: 'app-minor-educational-section',
  imports: [FormsModule],
  templateUrl: './minor-educational-section.component.html',
  styleUrl: './minor-educational-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinorEducationalSectionComponent {
  initialData = input<Partial<MinorEducationalInfo>>();
  dataChange = output<MinorEducationalInfo>();

  educationalData = signal<Partial<MinorEducationalInfo>>({
    occupation: undefined,
    otherOccupation: '',
    grade: '',
    institution: '',
  });

  occupationOptions: { value: MinorOccupation; label: string }[] = [
    { value: 'estudiante', label: 'Estudiante' },
    { value: 'hogar', label: 'Hogar' },
    { value: 'otra', label: 'Otra' },
  ];

  constructor() {
    effect(() => {
      const initial = this.initialData();
      if (initial) {
        this.educationalData.set(initial);
      }
    });
  }

  onFieldChange() {
    const data = this.educationalData();
    if (this.isFormValid(data)) {
      this.dataChange.emit(data as MinorEducationalInfo);
    }
  }

  private isFormValid(data: Partial<MinorEducationalInfo>): data is MinorEducationalInfo {
    if (!data.occupation) return false;
    
    // Si es "otra", requiere especificar cuál
    if (data.occupation === 'otra' && !data.otherOccupation) return false;
    
    // Si es estudiante, requiere grado e institución
    if (data.occupation === 'estudiante' && (!data.grade || !data.institution)) return false;
    
    return true;
  }

  updateField(field: keyof MinorEducationalInfo, value: string) {
    this.educationalData.update((current) => ({
      ...current,
      [field]: value,
    }));
    this.onFieldChange();
  }

  isStudent(): boolean {
    return this.educationalData().occupation === 'estudiante';
  }

  isOtherOccupation(): boolean {
    return this.educationalData().occupation === 'otra';
  }
}


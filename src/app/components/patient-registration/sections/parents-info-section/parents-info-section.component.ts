import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParentsInfo, ParentsMaritalStatus, EducationLevel } from '../../../../models/patient.model';

@Component({
  selector: 'app-parents-info-section',
  imports: [FormsModule],
  templateUrl: './parents-info-section.component.html',
  styleUrl: './parents-info-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentsInfoSectionComponent {
  initialData = input<Partial<ParentsInfo>>();
  dataChange = output<ParentsInfo>();

  parentsData = signal<Partial<ParentsInfo>>({
    maritalStatus: undefined,
    father: {
      fullName: '',
      age: 0,
      education: 'ninguna',
      landlinePhone: '',
      cellPhone: '',
      occupation: '',
      workplace: '',
    },
    mother: {
      fullName: '',
      age: 0,
      education: 'ninguna',
      landlinePhone: '',
      cellPhone: '',
      occupation: '',
      workplace: '',
    },
  });

  maritalStatusOptions: { value: ParentsMaritalStatus; label: string }[] = [
    { value: 'solteros', label: 'Solteros' },
    { value: 'casados', label: 'Casados' },
    { value: 'union_libre', label: 'Unión Libre' },
    { value: 'separados', label: 'Separados' },
    { value: 'viudo_a', label: 'Viudo(a)' },
  ];

  educationLevelOptions: { value: EducationLevel; label: string }[] = [
    { value: 'ninguna', label: 'Ninguna' },
    { value: 'primaria_completa', label: 'Primaria Completa' },
    { value: 'primaria_incompleta', label: 'Primaria Incompleta' },
    { value: 'secundaria_completa', label: 'Secundaria Completa' },
    { value: 'secundaria_incompleta', label: 'Secundaria Incompleta' },
    { value: 'tecnico_completo', label: 'Técnico Completo' },
    { value: 'tecnico_incompleto', label: 'Técnico Incompleto' },
    { value: 'tecnologico_completo', label: 'Tecnológico Completo' },
    { value: 'tecnologico_incompleto', label: 'Tecnológico Incompleto' },
    { value: 'universitario_completo', label: 'Universitario Completo' },
    { value: 'universitario_incompleto', label: 'Universitario Incompleto' },
    { value: 'postgrado_completo', label: 'Postgrado Completo' },
    { value: 'postgrado_incompleto', label: 'Postgrado Incompleto' },
  ];

  constructor() {
    effect(() => {
      const initial = this.initialData();
      if (initial) {
        this.parentsData.set(initial);
      }
    });
  }

  onFieldChange() {
    const data = this.parentsData();
    if (this.isFormValid(data)) {
      this.dataChange.emit(data as ParentsInfo);
    }
  }

  private isFormValid(data: Partial<ParentsInfo>): data is ParentsInfo {
    return !!(
      data.maritalStatus &&
      data.father?.fullName &&
      data.father?.age &&
      data.father?.cellPhone &&
      data.father?.occupation &&
      data.mother?.fullName &&
      data.mother?.age &&
      data.mother?.cellPhone &&
      data.mother?.occupation
    );
  }

  updateMaritalStatus(value: ParentsMaritalStatus) {
    this.parentsData.update((current) => ({
      ...current,
      maritalStatus: value,
    }));
    this.onFieldChange();
  }

  updateFatherField(field: string, value: string | number) {
    this.parentsData.update((current) => ({
      ...current,
      father: {
        ...current.father!,
        [field]: value,
      },
    }));
    this.onFieldChange();
  }

  updateMotherField(field: string, value: string | number) {
    this.parentsData.update((current) => ({
      ...current,
      mother: {
        ...current.mother!,
        [field]: value,
      },
    }));
    this.onFieldChange();
  }
}


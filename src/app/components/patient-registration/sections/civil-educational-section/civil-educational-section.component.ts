import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CivilEducationalInfo, MaritalStatus, EducationLevel, Occupation } from '../../../../models/patient.model';

@Component({
  selector: 'app-civil-educational-section',
  imports: [ReactiveFormsModule],
  templateUrl: './civil-educational-section.component.html',
  styleUrl: './civil-educational-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CivilEducationalSectionComponent {
  private fb = new FormBuilder();
  
  sectionTitle = input<string>('Información Civil y Educativa');
  initialData = input<Partial<CivilEducationalInfo>>();
  
  dataChange = output<Partial<CivilEducationalInfo>>();

  form: FormGroup;

  maritalStatusOptions: Array<{ value: MaritalStatus; label: string }> = [
    { value: 'soltero', label: 'Soltero(a)' },
    { value: 'casado', label: 'Casado(a)' },
    { value: 'union_libre', label: 'Unión Libre' },
    { value: 'separado', label: 'Separado(a)' },
    { value: 'viudo', label: 'Viudo(a)' },
  ];

  educationLevelOptions: Array<{ value: EducationLevel; label: string }> = [
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

  occupationOptions: Array<{ value: Occupation; label: string }> = [
    { value: 'estudiante', label: 'Estudiante' },
    { value: 'empleado', label: 'Empleado' },
    { value: 'independiente', label: 'Independiente' },
    { value: 'desempleado', label: 'Desempleado' },
    { value: 'hogar', label: 'Hogar' },
    { value: 'otro', label: 'Otro' },
  ];

  constructor() {
    this.form = this.fb.group({
      maritalStatus: ['', Validators.required],
      educationLevel: ['', Validators.required],
      occupation: ['', Validators.required],
      otherOccupation: ['', Validators.maxLength(100)],
      institution: ['', Validators.maxLength(150)],
    });

    // Load initial data when available
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.form.patchValue(data, { emitEvent: false });
      }
    });

    // Show/hide other occupation field based on occupation selection
    this.form.get('occupation')?.valueChanges.subscribe((occupation) => {
      const otherOccupationControl = this.form.get('otherOccupation');
      if (occupation === 'otro') {
        otherOccupationControl?.setValidators([Validators.required, Validators.maxLength(100)]);
      } else {
        otherOccupationControl?.clearValidators();
        otherOccupationControl?.setValue('');
      }
      otherOccupationControl?.updateValueAndValidity();
    });

    // Emit changes when form values change
    this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        this.dataChange.emit(value);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  showOtherOccupation(): boolean {
    return this.form.get('occupation')?.value === 'otro';
  }
}


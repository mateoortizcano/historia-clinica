import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalInfo, Sex, IdType } from '../../../../models/patient.model';

@Component({
  selector: 'app-personal-info-section',
  imports: [ReactiveFormsModule],
  templateUrl: './personal-info-section.component.html',
  styleUrl: './personal-info-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoSectionComponent {
  private fb = new FormBuilder();
  
  sectionTitle = input<string>('Información Personal');
  initialData = input<Partial<PersonalInfo>>();
  
  dataChange = output<Partial<PersonalInfo>>();

  form: FormGroup;

  sexOptions: Array<{ value: Sex; label: string }> = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
  ];

  idTypeOptions: Array<{ value: IdType; label: string }> = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'PA', label: 'Pasaporte' },
    { value: 'TI', label: 'Tarjeta de Identidad' },
    { value: 'RC', label: 'Registro Civil' },
  ];

  constructor() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      birthDate: ['', Validators.required],
      age: [{ value: '', disabled: true }],
      sex: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', [Validators.required, Validators.maxLength(20)]],
      birthPlace: ['', [Validators.required, Validators.maxLength(100)]],
    });

    // Load initial data when available
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.form.patchValue(data, { emitEvent: false });
        if (data.age !== undefined) {
          this.form.get('age')?.setValue(data.age, { emitEvent: false });
        }
      }
    });

    // Calculate age when birth date changes
    this.form.get('birthDate')?.valueChanges.subscribe((birthDate) => {
      if (birthDate) {
        const age = this.calculateAge(birthDate);
        this.form.get('age')?.setValue(age);
      }
    });

    // Emit changes when form values change
    this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        this.dataChange.emit({
          ...value,
          age: this.form.get('age')?.value,
        });
      }
    });
  }

  private calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}


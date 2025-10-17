import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HealthInfo, MembershipType } from '../../../../models/patient.model';

@Component({
  selector: 'app-health-info-section',
  imports: [ReactiveFormsModule],
  templateUrl: './health-info-section.component.html',
  styleUrl: './health-info-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthInfoSectionComponent {
  private fb = new FormBuilder();
  
  sectionTitle = input<string>('Información de Salud');
  initialData = input<Partial<HealthInfo>>();
  
  dataChange = output<Partial<HealthInfo>>();

  form: FormGroup;

  membershipTypeOptions: Array<{ value: MembershipType; label: string }> = [
    { value: 'cotizante', label: 'Cotizante' },
    { value: 'beneficiario', label: 'Beneficiario' },
  ];

  constructor() {
    this.form = this.fb.group({
      hasHealthService: [false, Validators.required],
      healthServiceName: [''],
      membershipType: [''],
      takesMedication: [false, Validators.required],
      medications: [''],
    });

    // Load initial data when available
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.form.patchValue(data, { emitEvent: false });
      }
    });

    // Show/hide health service name based on selection
    this.form.get('hasHealthService')?.valueChanges.subscribe((hasService) => {
      const healthServiceControl = this.form.get('healthServiceName');
      const membershipControl = this.form.get('membershipType');
      
      if (hasService) {
        healthServiceControl?.setValidators([Validators.required, Validators.maxLength(150)]);
        membershipControl?.setValidators(Validators.required);
      } else {
        healthServiceControl?.clearValidators();
        healthServiceControl?.setValue('');
        membershipControl?.clearValidators();
        membershipControl?.setValue('');
      }
      healthServiceControl?.updateValueAndValidity();
      membershipControl?.updateValueAndValidity();
    });

    // Show/hide medications field based on selection
    this.form.get('takesMedication')?.valueChanges.subscribe((takesMedication) => {
      const medicationsControl = this.form.get('medications');
      
      if (takesMedication) {
        medicationsControl?.setValidators([Validators.required, Validators.maxLength(500)]);
      } else {
        medicationsControl?.clearValidators();
        medicationsControl?.setValue('');
      }
      medicationsControl?.updateValueAndValidity();
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

  hasHealthService(): boolean {
    return this.form.get('hasHealthService')?.value === true;
  }

  takesMedication(): boolean {
    return this.form.get('takesMedication')?.value === true;
  }
}


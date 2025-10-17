import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmergencyContact } from '../../../../models/patient.model';

@Component({
  selector: 'app-emergency-contact-section',
  imports: [ReactiveFormsModule],
  templateUrl: './emergency-contact-section.component.html',
  styleUrl: './emergency-contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmergencyContactSectionComponent {
  private fb = new FormBuilder();
  
  sectionTitle = input<string>('Contacto de Emergencia');
  initialData = input<Partial<EmergencyContact>>();
  
  dataChange = output<Partial<EmergencyContact>>();

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
    });

    // Load initial data when available
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.form.patchValue(data, { emitEvent: false });
      }
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
}


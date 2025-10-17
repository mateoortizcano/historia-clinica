import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactInfo } from '../../../../models/patient.model';

@Component({
  selector: 'app-contact-info-section',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-info-section.component.html',
  styleUrl: './contact-info-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoSectionComponent {
  private fb = new FormBuilder();
  
  sectionTitle = input<string>('Información de Contacto');
  initialData = input<Partial<ContactInfo>>();
  
  dataChange = output<Partial<ContactInfo>>();

  form: FormGroup;

  socioeconomicLevels = [1, 2, 3, 4, 5, 6];

  constructor() {
    this.form = this.fb.group({
      address: ['', [Validators.required, Validators.maxLength(200)]],
      municipality: ['', [Validators.required, Validators.maxLength(100)]],
      neighborhood: ['', [Validators.required, Validators.maxLength(100)]],
      socioeconomicLevel: ['', Validators.required],
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


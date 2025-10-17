import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReferralInfo } from '../../../../models/patient.model';

@Component({
  selector: 'app-referral-info-section',
  imports: [ReactiveFormsModule],
  templateUrl: './referral-info-section.component.html',
  styleUrl: './referral-info-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralInfoSectionComponent {
  private fb = new FormBuilder();
  
  sectionTitle = input<string>('Información de Remisión');
  initialData = input<Partial<ReferralInfo>>();
  
  dataChange = output<Partial<ReferralInfo>>();

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      wasReferred: [false, Validators.required],
      referredBy: [''],
      referralReason: [''],
    });

    // Load initial data when available
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.form.patchValue(data, { emitEvent: false });
      }
    });

    // Show/hide referral details based on selection
    this.form.get('wasReferred')?.valueChanges.subscribe((wasReferred) => {
      const referredByControl = this.form.get('referredBy');
      const referralReasonControl = this.form.get('referralReason');
      
      if (wasReferred) {
        referredByControl?.setValidators([Validators.required, Validators.maxLength(150)]);
        referralReasonControl?.setValidators([Validators.required, Validators.maxLength(500)]);
      } else {
        referredByControl?.clearValidators();
        referredByControl?.setValue('');
        referralReasonControl?.clearValidators();
        referralReasonControl?.setValue('');
      }
      referredByControl?.updateValueAndValidity();
      referralReasonControl?.updateValueAndValidity();
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

  wasReferred(): boolean {
    return this.form.get('wasReferred')?.value === true;
  }
}


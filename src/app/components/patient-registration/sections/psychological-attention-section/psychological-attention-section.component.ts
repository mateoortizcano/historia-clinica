import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreviousAttentionInfo } from '../../../../models/patient.model';

@Component({
  selector: 'app-psychological-attention-section',
  imports: [ReactiveFormsModule],
  templateUrl: './psychological-attention-section.component.html',
  styleUrl: './psychological-attention-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsychologicalAttentionSectionComponent {
  private fb = new FormBuilder();
  
  sectionTitle = input<string>('Atención Psicológica Anterior');
  initialData = input<Partial<PreviousAttentionInfo>>();
  
  dataChange = output<Partial<PreviousAttentionInfo>>();

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      hadPreviousAttention: [false, Validators.required],
      location: [''],
      duration: [''],
      endReason: [''],
    });

    // Load initial data when available
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.form.patchValue(data, { emitEvent: false });
      }
    });

    // Show/hide previous attention details based on selection
    this.form.get('hadPreviousAttention')?.valueChanges.subscribe((hadPrevious) => {
      const locationControl = this.form.get('location');
      const durationControl = this.form.get('duration');
      const endReasonControl = this.form.get('endReason');
      
      if (hadPrevious) {
        locationControl?.setValidators([Validators.required, Validators.maxLength(200)]);
        durationControl?.setValidators([Validators.required, Validators.maxLength(100)]);
        endReasonControl?.setValidators([Validators.required, Validators.maxLength(500)]);
      } else {
        locationControl?.clearValidators();
        locationControl?.setValue('');
        durationControl?.clearValidators();
        durationControl?.setValue('');
        endReasonControl?.clearValidators();
        endReasonControl?.setValue('');
      }
      locationControl?.updateValueAndValidity();
      durationControl?.updateValueAndValidity();
      endReasonControl?.updateValueAndValidity();
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

  hadPreviousAttention(): boolean {
    return this.form.get('hadPreviousAttention')?.value === true;
  }
}


import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HealthInfo, ReferralInfo, PreviousAttentionInfo, MembershipType } from '../../../../models/patient.model';

export interface HealthHistoryInfo {
  healthInfo: HealthInfo;
  referralInfo: ReferralInfo;
  psychologicalAttention: PreviousAttentionInfo;
  psychiatricAttention: PreviousAttentionInfo;
}

@Component({
  selector: 'app-health-history-section',
  imports: [ReactiveFormsModule],
  templateUrl: './health-history-section.component.html',
  styleUrl: './health-history-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthHistorySectionComponent {
  private fb = new FormBuilder();
  
  sectionTitle = input<string>('Información de Salud e Historia Clínica');
  initialData = input<Partial<HealthHistoryInfo>>();
  isMinor = input<boolean>(false); // Indica si es menor de edad
  
  dataChange = output<Partial<HealthHistoryInfo>>();

  form: FormGroup;

  membershipTypeOptions: Array<{ value: MembershipType; label: string }> = [
    { value: 'cotizante', label: 'Cotizante' },
    { value: 'beneficiario', label: 'Beneficiario' },
  ];

  constructor() {
    this.form = this.fb.group({
      // Health Info
      hasHealthService: [false, Validators.required],
      healthServiceName: [''],
      membershipType: [''],
      takesMedication: [false, Validators.required],
      medications: [''],
      
      // Referral Info
      wasReferred: [false, Validators.required],
      referredBy: [''],
      referralReason: [''],
      
      // Psychological Attention
      hadPsychologicalAttention: [false, Validators.required],
      psychologicalLocation: [''],
      psychologicalDuration: [''],
      psychologicalEndReason: [''],
      
      // Psychiatric Attention
      hadPsychiatricAttention: [false, Validators.required],
      psychiatricLocation: [''],
      psychiatricDuration: [''],
      psychiatricEndReason: [''],
    });

    // Load initial data when available
    effect(() => {
      const data = this.initialData();
      if (data) {
        if (data.healthInfo) {
          this.form.patchValue({
            hasHealthService: data.healthInfo.hasHealthService,
            healthServiceName: data.healthInfo.healthServiceName,
            membershipType: data.healthInfo.membershipType,
            takesMedication: data.healthInfo.takesMedication,
            medications: data.healthInfo.medications,
          }, { emitEvent: false });
        }
        if (data.referralInfo) {
          this.form.patchValue({
            wasReferred: data.referralInfo.wasReferred,
            referredBy: data.referralInfo.referredBy,
            referralReason: data.referralInfo.referralReason,
          }, { emitEvent: false });
        }
        if (data.psychologicalAttention) {
          this.form.patchValue({
            hadPsychologicalAttention: data.psychologicalAttention.hadPreviousAttention,
            psychologicalLocation: data.psychologicalAttention.location,
            psychologicalDuration: data.psychologicalAttention.duration,
            psychologicalEndReason: data.psychologicalAttention.endReason,
          }, { emitEvent: false });
        }
        if (data.psychiatricAttention) {
          this.form.patchValue({
            hadPsychiatricAttention: data.psychiatricAttention.hadPreviousAttention,
            psychiatricLocation: data.psychiatricAttention.location,
            psychiatricDuration: data.psychiatricAttention.duration,
            psychiatricEndReason: data.psychiatricAttention.endReason,
          }, { emitEvent: false });
        }
      }
    });

    // Health Service validation
    this.form.get('hasHealthService')?.valueChanges.subscribe((hasService) => {
      const healthServiceControl = this.form.get('healthServiceName');
      const membershipControl = this.form.get('membershipType');
      
      if (hasService) {
        healthServiceControl?.setValidators([Validators.required, Validators.maxLength(150)]);
        // Solo requerir tipo de vinculación si NO es menor
        if (!this.isMinor()) {
          membershipControl?.setValidators(Validators.required);
        }
      } else {
        healthServiceControl?.clearValidators();
        healthServiceControl?.setValue('');
        membershipControl?.clearValidators();
        membershipControl?.setValue('');
      }
      healthServiceControl?.updateValueAndValidity();
      membershipControl?.updateValueAndValidity();
    });

    // Medication validation
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

    // Referral validation
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

    // Psychological attention validation
    this.form.get('hadPsychologicalAttention')?.valueChanges.subscribe((hadPrevious) => {
      const locationControl = this.form.get('psychologicalLocation');
      const durationControl = this.form.get('psychologicalDuration');
      const endReasonControl = this.form.get('psychologicalEndReason');
      
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

    // Psychiatric attention validation
    this.form.get('hadPsychiatricAttention')?.valueChanges.subscribe((hadPrevious) => {
      const locationControl = this.form.get('psychiatricLocation');
      const durationControl = this.form.get('psychiatricDuration');
      const endReasonControl = this.form.get('psychiatricEndReason');
      
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
        const formValue = this.form.getRawValue();
        this.dataChange.emit({
          healthInfo: {
            hasHealthService: formValue.hasHealthService,
            healthServiceName: formValue.healthServiceName,
            membershipType: formValue.membershipType,
            takesMedication: formValue.takesMedication,
            medications: formValue.medications,
          },
          referralInfo: {
            wasReferred: formValue.wasReferred,
            referredBy: formValue.referredBy,
            referralReason: formValue.referralReason,
          },
          psychologicalAttention: {
            hadPreviousAttention: formValue.hadPsychologicalAttention,
            location: formValue.psychologicalLocation,
            duration: formValue.psychologicalDuration,
            endReason: formValue.psychologicalEndReason,
          },
          psychiatricAttention: {
            hadPreviousAttention: formValue.hadPsychiatricAttention,
            location: formValue.psychiatricLocation,
            duration: formValue.psychiatricDuration,
            endReason: formValue.psychiatricEndReason,
          },
        });
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

  wasReferred(): boolean {
    return this.form.get('wasReferred')?.value === true;
  }

  hadPsychologicalAttention(): boolean {
    return this.form.get('hadPsychologicalAttention')?.value === true;
  }

  hadPsychiatricAttention(): boolean {
    return this.form.get('hadPsychiatricAttention')?.value === true;
  }
}


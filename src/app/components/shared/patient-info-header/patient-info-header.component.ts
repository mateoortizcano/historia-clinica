import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface PatientHeaderInfo {
  fullName: string;
  idType: string;
  idNumber: string;
  age: number;
}

@Component({
  selector: 'app-patient-info-header',
  templateUrl: './patient-info-header.component.html',
  styleUrl: './patient-info-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientInfoHeaderComponent {
  patient = input.required<PatientHeaderInfo>();
}


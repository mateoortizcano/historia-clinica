import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultationMotive } from '../../../../models/therapeutic-process.model';

@Component({
  selector: 'app-consultation-motive-section',
  imports: [ReactiveFormsModule],
  templateUrl: './consultation-motive-section.component.html',
  styleUrl: './consultation-motive-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationMotiveSectionComponent implements OnInit {
  private fb = inject(FormBuilder);

  initialData = input<Partial<ConsultationMotive>>();
  dataChange = output<Partial<ConsultationMotive>>();

  form = this.fb.group({
    reason: ['', [Validators.required, Validators.maxLength(1000)]],
    cieCode: ['', Validators.maxLength(50)],
    dsmCode: ['', Validators.maxLength(50)],
    situationDescription: [
      '',
      [Validators.required, Validators.maxLength(5000)],
    ],
  });

  ngOnInit() {
    const data = this.initialData();
    if (data) {
      this.form.patchValue(data);
    }

    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.dataChange.emit(this.form.value as ConsultationMotive);
      }
    });
  }
}


import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  OnInit,
  inject,
  computed,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ProcessClosure,
  ProcessStatus,
  FollowUpPeriod,
} from '../../../../models/therapeutic-process.model';

@Component({
  selector: 'app-process-closure-section',
  imports: [ReactiveFormsModule],
  templateUrl: './process-closure-section.component.html',
  styleUrl: './process-closure-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessClosureSectionComponent implements OnInit {
  private fb = inject(FormBuilder);

  initialData = input<Partial<ProcessClosure>>();
  readOnly = input(false);
  dataChange = output<Partial<ProcessClosure>>();

  selectedStatus = signal<ProcessStatus | null>(null);

  // Computed para determinar qué campos condicionales mostrar
  showFollowUpQuestion = computed(
    () => this.selectedStatus() === 'concluido'
  );
  showFollowUpPeriod = computed(
    () =>
      this.selectedStatus() === 'concluido' ||
      this.selectedStatus() === 'deserta'
  );
  showRelapsesQuestion = computed(
    () => this.selectedStatus() === 'va_y_vuelve'
  );
  showImprovementQuestion = computed(
    () => this.selectedStatus() === 'remision'
  );

  form = this.fb.group({
    status: ['', Validators.required],
    // Campos condicionales para "Concluido"
    hadFollowUp: [false],
    followUpPeriodConcluded: [''],
    // Campos condicionales para "Deserta"
    followUpPeriodDeserted: [''],
    // Campos condicionales para "Va y vuelve"
    hadRelapses: [false],
    // Campos condicionales para "Remisión"
    hadImprovement: [false],
    // Campos comunes
    observations: ['', [Validators.required, Validators.maxLength(5000)]],
    recommendations: ['', [Validators.required, Validators.maxLength(5000)]],
  });

  processStatuses: Array<{ value: ProcessStatus; label: string }> = [
    { value: 'concluido', label: 'Concluye' },
    { value: 'deserta', label: 'Deserta' },
    { value: 'va_y_vuelve', label: 'Va y vuelve' },
    { value: 'remision', label: 'Remisión' },
  ];

  followUpPeriods: Array<{ value: FollowUpPeriod; label: string }> = [
    { value: '1m', label: '1 mes' },
    { value: '3m', label: '3 meses' },
    { value: '6m', label: '6 meses' },
    { value: '1a', label: '1 año' },
  ];

  ngOnInit() {
    // Deshabilitar el formulario si es solo lectura
    if (this.readOnly()) {
      this.form.disable();
    }

    const data = this.initialData();
    if (data) {
      // Cargar datos iniciales
      const closureInfo = data.closureInfo;
      if (closureInfo) {
        this.selectedStatus.set(closureInfo.status);
        this.form.patchValue({
          status: closureInfo.status,
          observations: data.observations,
          recommendations: data.recommendations,
        });

        // Cargar campos condicionales según el estado
        switch (closureInfo.status) {
          case 'concluido':
            this.form.patchValue({
              hadFollowUp: closureInfo.hadFollowUp,
              followUpPeriodConcluded: closureInfo.followUpPeriod || '',
            });
            break;
          case 'deserta':
            this.form.patchValue({
              followUpPeriodDeserted: closureInfo.followUpPeriod,
            });
            break;
          case 'va_y_vuelve':
            this.form.patchValue({
              hadRelapses: closureInfo.hadRelapses,
            });
            break;
          case 'remision':
            this.form.patchValue({
              hadImprovement: closureInfo.hadImprovement,
            });
            break;
        }
      }
    }

    // Observar cambios en el estado para actualizar validaciones
    this.form.get('status')?.valueChanges.subscribe((status) => {
      this.selectedStatus.set(status as ProcessStatus);
      this.updateConditionalValidations(status as ProcessStatus);
    });

    // Observar cambios en hadFollowUp para "Concluido"
    this.form.get('hadFollowUp')?.valueChanges.subscribe((hadFollowUp) => {
      const followUpControl = this.form.get('followUpPeriodConcluded');
      if (hadFollowUp) {
        followUpControl?.setValidators(Validators.required);
      } else {
        followUpControl?.clearValidators();
      }
      followUpControl?.updateValueAndValidity();
    });

    // Emitir cambios
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid && !this.readOnly()) {
        this.dataChange.emit(this.buildClosureData());
      }
    });
  }

  private updateConditionalValidations(status: ProcessStatus) {
    // Limpiar todas las validaciones condicionales
    this.form.get('followUpPeriodConcluded')?.clearValidators();
    this.form.get('followUpPeriodDeserted')?.clearValidators();

    // Aplicar validaciones según el estado
    switch (status) {
      case 'concluido':
        // followUpPeriodConcluded es condicional según hadFollowUp
        const hadFollowUp = this.form.get('hadFollowUp')?.value;
        if (hadFollowUp) {
          this.form
            .get('followUpPeriodConcluded')
            ?.setValidators(Validators.required);
        }
        break;
      case 'deserta':
        this.form
          .get('followUpPeriodDeserted')
          ?.setValidators(Validators.required);
        break;
    }

    // Actualizar validaciones
    this.form.get('followUpPeriodConcluded')?.updateValueAndValidity();
    this.form.get('followUpPeriodDeserted')?.updateValueAndValidity();
  }

  private buildClosureData(): ProcessClosure {
    const formValue = this.form.value;
    const status = formValue.status as ProcessStatus;

    let closureInfo: any = { status };

    switch (status) {
      case 'concluido':
        closureInfo = {
          status: 'concluido',
          hadFollowUp: formValue.hadFollowUp || false,
          followUpPeriod: formValue.hadFollowUp
            ? (formValue.followUpPeriodConcluded as FollowUpPeriod)
            : undefined,
        };
        break;
      case 'deserta':
        closureInfo = {
          status: 'deserta',
          followUpPeriod: formValue.followUpPeriodDeserted as FollowUpPeriod,
        };
        break;
      case 'va_y_vuelve':
        closureInfo = {
          status: 'va_y_vuelve',
          hadRelapses: formValue.hadRelapses || false,
        };
        break;
      case 'remision':
        closureInfo = {
          status: 'remision',
          hadImprovement: formValue.hadImprovement || false,
        };
        break;
    }

    return {
      closureInfo,
      observations: formValue.observations || '',
      recommendations: formValue.recommendations || '',
    };
  }
}


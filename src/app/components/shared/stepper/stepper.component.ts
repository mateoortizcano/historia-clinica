import { Component, ChangeDetectionStrategy, signal, input, output, computed } from '@angular/core';

export interface Step {
  id: string;
  label: string;
  completed: boolean;
  valid: boolean;
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  steps = input.required<Step[]>();
  currentStepIndex = signal(0);
  
  stepChange = output<number>();
  
  currentStep = computed(() => this.steps()[this.currentStepIndex()]);
  
  isFirstStep = computed(() => this.currentStepIndex() === 0);
  isLastStep = computed(() => this.currentStepIndex() === this.steps().length - 1);
  
  progressPercentage = computed(() => {
    const completedSteps = this.steps().filter(s => s.completed).length;
    return Math.round((completedSteps / this.steps().length) * 100);
  });

  goToStep(index: number) {
    if (index >= 0 && index < this.steps().length) {
      this.currentStepIndex.set(index);
      this.stepChange.emit(index);
    }
  }

  nextStep() {
    if (!this.isLastStep() && this.currentStep().valid) {
      this.goToStep(this.currentStepIndex() + 1);
    }
  }

  previousStep() {
    if (!this.isFirstStep()) {
      this.goToStep(this.currentStepIndex() - 1);
    }
  }

  canNavigateToStep(index: number): boolean {
    // Can always go back, but can only go forward if current step is valid
    return index <= this.currentStepIndex() || this.currentStep().valid;
  }
}


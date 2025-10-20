import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/pacientes/registro',
    pathMatch: 'full',
  },
  {
    path: 'pacientes/registro',
    loadComponent: () =>
      import('./components/patient-registration/patient-registration.component').then(
        (m) => m.PatientRegistrationComponent
      ),
  },
  {
    path: 'proceso-terapeutico',
    loadComponent: () =>
      import('./components/patient-selection/patient-selection.component').then(
        (m) => m.PatientSelectionComponent
      ),
  },
  {
    path: 'paciente/:patientId/detalle',
    loadComponent: () =>
      import('./components/patient-detail/patient-detail.component').then(
        (m) => m.PatientDetailComponent
      ),
  },
  {
    path: 'proceso-terapeutico/paciente/:patientId',
    loadComponent: () =>
      import('./components/process-selection/process-selection.component').then(
        (m) => m.ProcessSelectionComponent
      ),
  },
  {
    path: 'proceso-terapeutico/paciente/:patientId/nuevo',
    loadComponent: () =>
      import('./components/therapeutic-process/therapeutic-process.component').then(
        (m) => m.TherapeuticProcessComponent
      ),
  },
  {
    path: 'proceso-terapeutico/paciente/:patientId/proceso/:processId',
    loadComponent: () =>
      import('./components/therapeutic-process/therapeutic-process.component').then(
        (m) => m.TherapeuticProcessComponent
      ),
  },
];

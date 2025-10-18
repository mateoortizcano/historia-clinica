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
      import('./components/therapeutic-process/therapeutic-process.component').then(
        (m) => m.TherapeuticProcessComponent
      ),
  },
  {
    path: 'proceso-terapeutico/:patientId',
    loadComponent: () =>
      import('./components/therapeutic-process/therapeutic-process.component').then(
        (m) => m.TherapeuticProcessComponent
      ),
  },
];

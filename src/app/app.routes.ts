import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/pacientes/registro-adulto',
    pathMatch: 'full',
  },
  {
    path: 'pacientes/registro-adulto',
    loadComponent: () =>
      import('./components/patient-registration/adult-patient-registration.component').then(
        (m) => m.AdultPatientRegistrationComponent
      ),
  },
];

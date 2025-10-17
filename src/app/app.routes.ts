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
  // Mantener rutas antiguas por compatibilidad (redirigen al nuevo componente)
  {
    path: 'pacientes/registro-adulto',
    redirectTo: '/pacientes/registro',
    pathMatch: 'full',
  },
  {
    path: 'pacientes/registro-menor',
    redirectTo: '/pacientes/registro',
    pathMatch: 'full',
  },
];

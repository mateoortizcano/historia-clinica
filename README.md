# Historia Clínica - Sistema de Gestión Psicológica

Sistema de gestión de historias clínicas para consultas psicológicas. Permite el registro de pacientes (adultos y menores de edad) y la gestión completa de procesos terapéuticos.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Funcionalidades Principales

### 1. Registro de Pacientes
- **Ruta:** `/pacientes/registro`
- Formulario adaptativo que detecta automáticamente si es adulto o menor de edad
- Formulario dividido en pasos con navegación guiada
- Validaciones en tiempo real
- Guardado de borradores

### 2. Proceso Terapéutico
- **Flujo completo:**
  1. Selección de paciente (búsqueda inteligente)
  2. Visualización de procesos del paciente (activos/cerrados)
  3. Crear nuevo proceso o continuar existente
- **Gestión de procesos:**
  - Registro del motivo de consulta con códigos diagnósticos (CIE-10, DSM-5)
  - Gestión de sesiones individuales
    - ✅ **Agregar** nuevas sesiones
    - ✅ **Visualizar** sesiones guardadas (expandible)
    - ❌ **No editar/eliminar** (inmutables una vez guardadas)
  - Cierre de proceso con diferentes estados
  - Historial completo de procesos cerrados
- **Vinculación:** Todo proceso está asociado a un paciente registrado
- **Integridad de Datos:**
  - 🔒 Procesos cerrados: modo solo lectura completo
  - 🔒 Sesiones guardadas: inmutables pero visualizables

## Rutas Disponibles

```
/pacientes/registro                                    - Registro de nuevo paciente
/proceso-terapeutico                                  - Selección de paciente
/proceso-terapeutico/paciente/:patientId              - Ver procesos del paciente
/proceso-terapeutico/paciente/:patientId/nuevo        - Crear nuevo proceso
/proceso-terapeutico/paciente/:patientId/proceso/:id  - Editar proceso existente
```

## Documentación Adicional

### Proceso Terapéutico
- **[FLUJO-PROCESO-TERAPEUTICO.md](./FLUJO-PROCESO-TERAPEUTICO.md)** - Flujo completo y arquitectura del proceso terapéutico
- **[PROCESOS-CERRADOS-READONLY.md](./PROCESOS-CERRADOS-READONLY.md)** - Modo solo lectura para procesos cerrados
- **[SESIONES-INMUTABLES.md](./SESIONES-INMUTABLES.md)** - Sesiones inmutables una vez guardadas
- **[PROCESO-TERAPEUTICO.md](./PROCESO-TERAPEUTICO.md)** - Guía completa del sistema de proceso terapéutico
- **[CAMBIOS-TABS-IMPLEMENTATION.md](./CAMBIOS-TABS-IMPLEMENTATION.md)** - Migración de stepper a tabs

### UX y Datos
- **[MEJORAS-UX-ESTANDARIZACION.md](./MEJORAS-UX-ESTANDARIZACION.md)** - Sistema estandarizado de UX y visualización
- **[SISTEMA-MOCK-DATA.md](./SISTEMA-MOCK-DATA.md)** - Sistema de datos mock y simulación de API REST

### Especificaciones
- **[descripcion-proyecto.md](./.cursor/especificaciones/descripcion-proyecto.md)** - Descripción general del proyecto
- **[estructura-general.md](./.cursor/especificaciones/historias de usuario/estructura-general.md)** - Especificaciones de formularios

## Tecnologías

- **Angular 20.3.6** con Standalone Components
- **Angular Signals** para gestión de estado reactivo
- **Reactive Forms** con validaciones personalizadas
- **Bootstrap 5** para diseño responsivo
- **TypeScript** en modo estricto
- **Sass** para estilos

## Características Técnicas

### Frontend
- ✅ Arquitectura modular con lazy loading
- ✅ Change Detection optimizada (OnPush)
- ✅ Componentes standalone
- ✅ Control flow moderno (@if, @for)
- ✅ Formularios reactivos con validaciones
- ✅ Diseño responsivo optimizado para laptops 10-14"
- ✅ Sin dependencia de módulos NgModule
- ✅ Sistema estandarizado de UX para visualización de datos
- ✅ Estilos compartidos y reutilizables
- ✅ Iconografía consistente en toda la aplicación

### Datos y Backend (Mock)
- ✅ Sistema de datos mock completo (5 pacientes, 6 procesos)
- ✅ Servicio que simula API REST con Observables
- ✅ Latencia de red simulada (500ms)
- ✅ CRUD completo implementado
- ✅ Preparado para migración a backend real

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Sistema de Datos Mock - API REST Simulada

## 📋 Descripción

Se ha implementado un sistema completo de datos mock que simula llamadas a un API REST backend. El sistema utiliza archivos JSON estáticos y un servicio Angular con Observables que añade delays para simular latencia de red realista.

## 🎯 Objetivo

Permitir el desarrollo y visualización de todas las funcionalidades de la aplicación sin necesidad de un backend real. Esto facilita:
- Desarrollo frontend independiente
- Demostración de funcionalidades completas
- Pruebas de UI/UX con datos realistas
- Preparación para integración con backend real

## 📁 Archivos Creados

### 1. `src/app/data/mock-patients.json`

Contiene 5 pacientes mock con datos completos:

- **3 pacientes adultos:**
  - **pat-001 (María González)**: Mujer, 40 años, con historial de tratamiento previo
  - **pat-002 (Carlos Martínez)**: Hombre, 32 años, primera consulta por estrés laboral
  - **pat-004 (Ana Fernández)**: Mujer, 47 años, historial de violencia intrafamiliar

- **2 pacientes menores:**
  - **pat-003 (Sofía Rodríguez)**: Niña, 9 años, dificultades de atención escolar
  - **pat-005 (Diego Vargas)**: Adolescente, 14 años, conducta disruptiva

Cada paciente incluye:
- ✅ Información personal completa
- ✅ Información de contacto
- ✅ Datos de salud (EPS, tipo de sangre, alergias, medicaciones)
- ✅ Historial médico y psicológico
- ✅ Antecedentes familiares
- ✅ Información de remisión
- ✅ Para menores: datos de padres/tutores, familia, educación

### 2. `src/app/data/mock-processes.json`

Contiene 6 procesos terapéuticos mock:

| ID | Paciente | Estado | Sesiones | Descripción |
|----|----------|--------|----------|-------------|
| **proc-001** | pat-001 (María) | Activo | 3 | Ansiedad laboral - en tratamiento |
| **proc-002** | pat-001 (María) | Cerrado | 8 | Fobia a conducir - concluido con seguimiento |
| **proc-003** | pat-002 (Carlos) | Activo | 2 | Burnout laboral - inicio reciente |
| **proc-004** | pat-003 (Sofía) | Activo | 1 | Evaluación TDAH - primera sesión con padres |
| **proc-005** | pat-004 (Ana) | Cerrado | 6 | Trastorno adaptativo - concluido exitosamente |
| **proc-006** | pat-005 (Diego) | Activo | 2 | Conducta disruptiva - inicio de tratamiento |

Cada proceso incluye:
- ✅ Motivo de consulta completo (reason, códigos CIE-10/DSM-5, situación)
- ✅ Sesiones detalladas con objetivos, técnicas y descripciones extensas
- ✅ Para procesos cerrados: información completa de cierre

### 3. `src/app/services/mock-data.service.ts`

Servicio Angular que simula API REST con las siguientes características:

#### Configuración
```typescript
private readonly NETWORK_DELAY = 500; // ms - latencia simulada
```

#### Endpoints Simulados

**Pacientes:**
- `GET /api/patients` - `getAllPatients()`
- `GET /api/patients/:id` - `getPatientById(id)`
- `GET /api/patients/search?term=xxx` - `searchPatients(term)`
- `POST /api/patients` - `createPatient(data)`
- `PUT /api/patients/:id` - `updatePatient(id, data)`
- `DELETE /api/patients/:id` - `deletePatient(id)`

**Procesos:**
- `GET /api/processes/patient/:patientId` - `getProcessesByPatientId(id)`
- `GET /api/processes/:id` - `getProcessById(id)`
- `POST /api/processes` - `createProcess(data)`
- `PUT /api/processes/:id` - `updateProcess(id, data)`
- `PATCH /api/processes/:id/close` - `closeProcess(id, closureData)`
- `DELETE /api/processes/:id` - `deleteProcess(id)`

**Helpers:**
- `calculateAge(birthDate)` - Calcula edad desde fecha de nacimiento
- `getFullName(patient)` - Construye nombre completo del paciente
- `getProcessStats(patientId)` - Estadísticas de procesos (activos/cerrados)
- `getSystemStats()` - Estadísticas generales del sistema
- `resetData()` - Reinicia datos a estado inicial

#### Características Técnicas
```typescript
✅ Retorna Observables (RxJS)
✅ Delay de 500ms para simular latencia de red
✅ Manejo de errores con throwError
✅ Signals para estado reactivo
✅ Console logs para debugging
✅ Operaciones CRUD completas
```

## 🔧 Configuración Realizada

### TypeScript Configuration
Se actualizó `tsconfig.json` para permitir importación de JSON:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  }
}
```

## 📦 Componentes Actualizados

### 1. `PatientSelectionComponent`

**Antes:**
```typescript
// Datos hardcodeados en el componente
allPatients = signal<PatientSummary[]>([
  { id: '1', fullName: 'Juan Pérez', ... },
  { id: '2', fullName: 'María López', ... },
]);
```

**Ahora:**
```typescript
// Carga desde servicio mock
ngOnInit() {
  this.loadPatients();
}

loadPatients() {
  this.mockDataService.getAllPatients().subscribe({
    next: (patients) => {
      // Mapea pacientes del JSON a PatientSummary
      // Carga estadísticas de procesos para cada paciente
      this.allPatients.set(patientSummaries);
    },
    error: (error) => console.error('Error loading patients:', error),
  });
}
```

### 2. `ProcessSelectionComponent`

**Antes:**
```typescript
// Mock data hardcoded por ID de paciente
private loadProcesses(patientId: string) {
  const mockProcesses: Record<string, ProcessSummary[]> = {
    '1': [...], '2': [...], '3': [...]
  };
  this.processes.set(mockProcesses[patientId] || []);
}
```

**Ahora:**
```typescript
// Carga desde servicio mock
private loadProcesses(patientId: string) {
  this.mockDataService.getProcessesByPatientId(patientId).subscribe({
    next: (processes) => {
      // Mapea procesos a ProcessSummary
      const processSummaries = processes.map(process => ({
        id: process.id,
        status: process.status,
        consultationReason: process.consultationMotive.reason,
        startDate: process.startDate,
        lastSessionDate: lastSession?.date,
        closureDate: process.closureDate,
        sessionsCount: process.sessions.length,
        closureStatus: this.getClosureStatusLabel(process.closure?.closureInfo?.status),
      }));
      this.processes.set(processSummaries);
    },
  });
}
```

### 3. `TherapeuticProcessComponent`

**Antes:**
```typescript
// Mock data en Records dentro del componente
private loadProcessData(processId: string) {
  const mockProcesses: Record<string, any> = {
    'proc-1': { id: 'proc-1', status: 'active', ... },
    'proc-2': { id: 'proc-2', status: 'closed', ... },
  };
  const process = mockProcesses[processId];
  this.processData.set(process);
}
```

**Ahora:**
```typescript
// Carga desde servicio mock
private loadProcessData(processId: string) {
  this.mockDataService.getProcessById(processId).subscribe({
    next: (process) => {
      if (process) {
        this.processData.set({
          consultationMotive: process.consultationMotive,
          sessions: process.sessions || [],
          closure: process.closure,
        });
        this.isProcessClosed.set(process.status === 'closed');
        // Actualiza validaciones de tabs...
      }
    },
    error: (error) => console.error('Error loading process:', error),
  });
}
```

## 🎭 Datos Mock Disponibles

### Pacientes para Demostración

| ID | Nombre | Tipo | Procesos | Características |
|----|--------|------|----------|-----------------|
| **pat-001** | María González | Adulto | 1 activo, 1 cerrado | Historial rico, tratamiento previo |
| **pat-002** | Carlos Martínez | Adulto | 1 activo | Primera consulta, datos mínimos |
| **pat-003** | Sofía Rodríguez | Menor | 1 activo | Caso escolar, datos familiares completos |
| **pat-004** | Ana Fernández | Adulto | 1 cerrado | Historia de violencia, proceso exitoso |
| **pat-005** | Diego Vargas | Menor | 1 activo | Caso complejo, conducta disruptiva |

### Procesos para Demostración

**Procesos Activos (4):**
- proc-001: Ansiedad (María) - 3 sesiones, en curso
- proc-003: Burnout (Carlos) - 2 sesiones, inicio reciente
- proc-004: Evaluación (Sofía) - 1 sesión con padres
- proc-006: Conducta (Diego) - 2 sesiones, caso complejo

**Procesos Cerrados (2):**
- proc-002: Fobia (María) - 8 sesiones, concluido con seguimiento
- proc-005: Trastorno adaptativo (Ana) - 6 sesiones, exitoso

## 🎯 Casos de Uso Demostrables

### 1. Selección de Paciente
```
Usuario va a "Proceso Terapéutico"
→ Ve lista de 5 pacientes con datos reales
→ Puede buscar por nombre, ID o teléfono
→ Ve badges indicando procesos activos/cerrados
```

### 2. Vista de Procesos del Paciente
```
Selecciona María González
→ Ve 1 proceso activo (ansiedad laboral) con 3 sesiones
→ Ve 1 proceso cerrado (fobia a conducir) con 8 sesiones
→ Puede abrir procesos o crear uno nuevo
```

### 3. Proceso Activo Editable
```
Abre proceso activo de María (ansiedad)
→ Ve 3 sesiones registradas (inmutables)
→ Puede expandir sesiones para ver detalles completos
→ Puede agregar nuevas sesiones
→ Puede modificar motivo de consulta
→ Puede cerrar proceso (tab de cierre)
```

### 4. Proceso Cerrado Solo Lectura
```
Abre proceso cerrado de María (fobia)
→ Ve todas las 8 sesiones en detalle
→ Todo está en modo solo lectura
→ Ve información de cierre completa
→ Badge "PROCESO CERRADO - SOLO LECTURA"
```

### 5. Caso de Menor de Edad
```
Selecciona Sofía Rodríguez (9 años)
→ Ve datos del menor y los padres
→ Abre proceso (evaluación TDAH)
→ Ve primera sesión fue solo con padres
→ Puede continuar con sesiones del menor
```

## 🔄 Flujo de Integración con Backend Real

Cuando se implemente el backend real:

### Paso 1: Crear Servicio Real
```typescript
// src/app/services/api.service.ts
@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;
  
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }
  // ... más métodos
}
```

### Paso 2: Reemplazar en Componentes
```typescript
// Cambiar en componentes:
// private mockDataService = inject(MockDataService);
private apiService = inject(ApiService);

// Métodos quedan igual (misma interface Observable)
this.apiService.getAllPatients().subscribe(...);
```

### Paso 3: Mantener Mock para Desarrollo
```typescript
// En app.config.ts
providers: [
  environment.production
    ? ApiService           // Producción usa API real
    : MockDataService,     // Desarrollo usa mock
]
```

## 📊 Estadísticas del Sistema

El servicio puede proveer estadísticas generales:

```typescript
this.mockDataService.getSystemStats().subscribe(stats => {
  console.log('Total pacientes:', stats.totalPatients);      // 5
  console.log('Total procesos:', stats.totalProcesses);      // 6
  console.log('Procesos activos:', stats.activeProcesses);   // 4
  console.log('Procesos cerrados:', stats.closedProcesses);  // 2
});
```

## 🛠️ Utilidades para Desarrollo

### Reset de Datos
```typescript
// En consola del navegador o componente de admin
this.mockDataService.resetData();
// Reinicia todos los datos a su estado inicial
```

### Simulación de Error de Red
```typescript
this.mockDataService.simulateNetworkError().subscribe({
  error: (err) => console.error('Network error:', err)
});
```

## ✅ Verificación

**Build exitoso:**
```bash
npm run build
✓ Application bundle generation complete.
⚠ Solo 1 warning: session SCSS excede budget (aceptable)
✓ 0 errores de linter
✓ TypeScript strict mode OK
```

**Archivos totales:**
- `mock-patients.json`: ~600 líneas de datos realistas
- `mock-processes.json`: ~450 líneas con 6 procesos completos
- `mock-data.service.ts`: ~380 líneas de código de servicio

## 🎨 Beneficios Implementados

1. **Datos Realistas:** Casos clínicos completos y detallados
2. **Simulación de API:** Delays y Observables como backend real
3. **CRUD Completo:** Todas las operaciones implementadas
4. **Manejo de Errores:** Throwables para casos de error
5. **Facilidad de Testing:** Reset y métodos helper
6. **Preparado para Backend:** Misma interface Observable
7. **Desarrollo Independiente:** Frontend puede avanzar sin backend

## 📝 Notas Técnicas

- **Latencia:** 500ms delay simula red realista
- **Signals:** Estado reactivo con Angular Signals
- **Inmutabilidad:** Arrays copiados con spread operator
- **Type Safety:** TypeScript estricto en todo el servicio
- **Observables:** RxJS operators (delay, map, throwError)
- **Console Logs:** Debugging amigable en desarrollo

## 🚀 Próximos Pasos (Futuro)

1. Agregar más casos de uso (familias numerosas, casos complejos)
2. Implementar localStorage para persistencia entre sesiones
3. Crear panel de administración de datos mock
4. Añadir generador de datos aleatorios (Faker.js)
5. Implementar WebSocket mock para notificaciones en tiempo real

---

**Fecha de implementación:** 18 de octubre de 2025  
**Versión:** 1.0  
**Estado:** ✅ Completado y funcionando


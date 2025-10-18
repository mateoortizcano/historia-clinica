# Flujo del Proceso Terapéutico

## 📋 Visión General

El sistema de proceso terapéutico ha sido diseñado para reflejar el flujo de trabajo real donde cada proceso está vinculado a un paciente registrado previamente.

## 🎯 Flujo Completo

```
1. Header → "Proceso Terapéutico"
   ↓
2. Lista de Pacientes (búsqueda)
   ↓
3. Seleccionar Paciente
   ↓
4. Ver Procesos del Paciente (activos/cerrados)
   ↓
5. Opciones:
   - Crear Nuevo Proceso
   - Abrir Proceso Activo (continuar)
   - Ver Proceso Cerrado (solo lectura)
```

## 🗺️ Rutas Implementadas

### 1. Selección de Paciente
**Ruta:** `/proceso-terapeutico`

**Funcionalidad:**
- Lista todos los pacientes registrados
- Búsqueda por nombre, documento o teléfono
- Indicadores visuales:
  - 🟢 Verde: Con procesos activos
  - ⚪ Gris: Sin procesos activos
  - ⚠️ Amarillo: Sin procesos en absoluto
- Opción de registrar nuevo paciente

**Componente:** `PatientSelectionComponent`

### 2. Procesos del Paciente
**Ruta:** `/proceso-terapeutico/paciente/:patientId`

**Funcionalidad:**
- Muestra información del paciente seleccionado
- Lista de procesos activos (si hay)
- Lista de procesos cerrados (histórico)
- Botón para crear nuevo proceso
- Opciones:
  - Abrir proceso activo → continuar trabajando
  - Ver proceso cerrado → solo consulta

**Componente:** `ProcessSelectionComponent`

### 3. Nuevo Proceso
**Ruta:** `/proceso-terapeutico/paciente/:patientId/nuevo`

**Funcionalidad:**
- Crea un nuevo proceso para el paciente
- Tabs: Motivo de Consulta | Sesiones | Cierre
- Muestra información del paciente en header
- Badge "NUEVO PROCESO"

**Componente:** `TherapeuticProcessComponent`

### 4. Editar Proceso Existente
**Ruta:** `/proceso-terapeutico/paciente/:patientId/proceso/:processId`

**Funcionalidad:**
- Edita un proceso existente
- Carga datos del proceso
- Permite agregar sesiones
- Permite cerrar el proceso
- Badge "EDITANDO PROCESO"

**Componente:** `TherapeuticProcessComponent`

## 📊 Estructura de Datos

### PatientSummary
```typescript
interface PatientSummary {
  id: string;
  fullName: string;
  idNumber: string;
  age: number;
  phone?: string;
  activeProcesses: number;
  closedProcesses: number;
}
```

### ProcessSummary
```typescript
interface ProcessSummary {
  id: string;
  status: 'active' | 'closed';
  consultationReason: string;
  startDate: string;
  lastSessionDate?: string;
  closureDate?: string;
  sessionsCount: number;
  closureStatus?: string;
}
```

### TherapeuticProcess
```typescript
interface TherapeuticProcess {
  patientId: string;              // ← Vinculación con paciente
  consultationMotive: ConsultationMotive;
  sessions: Session[];
  closure?: ProcessClosure;
  createdAt?: string;
  updatedAt?: string;
}
```

## 🔄 Casos de Uso

### Caso 1: Paciente Nuevo con Primer Proceso
```
1. Registrar paciente → /pacientes/registro
2. Ir a Proceso Terapéutico → /proceso-terapeutico
3. Buscar y seleccionar paciente recién registrado
4. Click "Nuevo Proceso Terapéutico"
5. Completar motivo de consulta
6. Guardar (queda proceso activo, listo para sesiones futuras)
```

### Caso 2: Agregar Sesión a Proceso Activo
```
1. Ir a Proceso Terapéutico → /proceso-terapeutico
2. Buscar paciente
3. Ver procesos activos del paciente
4. Click "Abrir Proceso" en el proceso activo
5. Tab "Sesiones" → "Agregar Nueva Sesión"
6. Completar datos de la sesión
7. Revisar advertencia: "Una vez guardada, no podrá modificarse"
8. Click "Registrar Sesión"
9. La sesión queda registrada PERMANENTEMENTE (🔒 inmutable)
```

### Caso 3: Cerrar un Proceso
```
1. Abrir proceso activo del paciente
2. Asegurarse de tener sesiones registradas
3. Tab "Cierre del Proceso"
4. Completar estado final y observaciones
5. Click "Finalizar y Cerrar Proceso"
```

### Caso 4: Consultar Historial
```
1. Seleccionar paciente
2. Scroll hasta "Procesos Cerrados"
3. Click "Ver Detalles" en proceso cerrado
4. Revisar información en MODO SOLO LECTURA:
   - Badge: "PROCESO CERRADO - SOLO LECTURA"
   - Alerta amarilla con candado
   - Todos los campos deshabilitados
   - Sin botones de edición/guardado
   - Solo navegación y consulta
```

## ✨ Características Destacadas

### Búsqueda Inteligente
- Búsqueda en tiempo real
- Filtra por múltiples campos simultáneamente
- Sin necesidad de presionar botón

### Indicadores Visuales
- **Badges de estado:**
  - "X proceso(s) activo(s)" (verde)
  - "Sin procesos activos" (gris)
  - "Sin procesos" (amarillo)

- **Cards de proceso:**
  - Borde verde: Proceso activo
  - Borde gris: Proceso cerrado
  - Hover effect con elevación

### Información Contextual
- Header siempre muestra paciente actual
- Breadcrumb con botón de volver
- Guías de uso en cada pantalla

## 🎨 Experiencia de Usuario

### Navegación Intuitiva
```
[Lista Pacientes] ← Volver
     ↓
[Procesos del Paciente] ← Volver
     ↓
[Trabajar en Proceso] ← Volver
```

### Flujo Natural
1. **Primero:** ¿A quién voy a atender?
2. **Segundo:** ¿Qué proceso voy a trabajar?
3. **Tercero:** ¿Qué voy a hacer? (registrar sesión, cerrar, etc.)

### Prevención de Errores
- No se puede crear proceso sin paciente
- Se muestra claramente si es nuevo o existente
- Validaciones mantienen integridad de datos
- **Procesos cerrados son de solo lectura** (no editables)
- **Sesiones son inmutables** una vez guardadas (no editables/eliminables)

## 🔮 Datos Mock Temporales

Actualmente el sistema usa datos mock en:
- `PatientSelectionComponent`: 3 pacientes de prueba
- `ProcessSelectionComponent`: Procesos de prueba por paciente
- `TherapeuticProcessComponent`: Carga info de paciente

**TODO:** Reemplazar con llamadas API REST cuando esté disponible el backend.

## 📝 Actualizaciones Pendientes

### Integración Backend
- [ ] GET `/api/patients` - Lista de pacientes
- [ ] GET `/api/patients/:id` - Detalle de paciente
- [ ] GET `/api/patients/:id/processes` - Procesos del paciente
- [ ] POST `/api/processes` - Crear proceso nuevo
- [ ] GET `/api/processes/:id` - Obtener proceso específico
- [ ] PUT `/api/processes/:id` - Actualizar proceso
- [ ] POST `/api/processes/:id/sessions` - Agregar sesión
- [ ] PUT `/api/processes/:id/close` - Cerrar proceso

### Mejoras Futuras
- [ ] Paginación en lista de pacientes
- [ ] Filtros avanzados (por estado de proceso, fechas, etc.)
- [ ] Exportar proceso a PDF
- [ ] Notificaciones de sesiones pendientes
- [ ] Dashboard con estadísticas
- [ ] Gráficos de evolución del paciente

## 📐 Arquitectura

```
/proceso-terapeutico
│
├── patient-selection/
│   ├── patient-selection.component.ts
│   ├── patient-selection.component.html
│   └── patient-selection.component.scss
│
├── process-selection/
│   ├── process-selection.component.ts
│   ├── process-selection.component.html
│   └── process-selection.component.scss
│
├── therapeutic-process.component.ts
├── therapeutic-process.component.html
├── therapeutic-process.component.scss
│
└── sections/
    ├── consultation-motive-section/
    ├── session-registration-section/
    └── process-closure-section/
```

## 🎯 Ventajas del Diseño

1. **Contexto Claro:** Siempre se sabe con qué paciente se está trabajando
2. **Flexibilidad:** Múltiples procesos por paciente
3. **Historial:** Acceso fácil a procesos cerrados
4. **Búsqueda Rápida:** Encontrar pacientes eficientemente
5. **Flujo Natural:** Refleja el trabajo real del profesional
6. **Escalable:** Fácil agregar funcionalidades

## ✅ Estado Actual

- ✅ Componentes creados
- ✅ Rutas configuradas
- ✅ Navegación funcional
- ✅ Datos mock implementados
- ✅ Estilos consistentes
- ✅ Validaciones funcionando
- ✅ **Procesos cerrados son de solo lectura**
- ✅ **Sesiones son inmutables** una vez guardadas
- ✅ Indicadores visuales claros de estado
- ✅ Build exitoso
- ⏳ Pendiente: Integración con backend


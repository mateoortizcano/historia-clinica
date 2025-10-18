# Procesos Cerrados - Modo Solo Lectura

## 📋 Descripción

Los procesos terapéuticos cerrados ahora son de **solo lectura**, no se pueden editar. Esto garantiza la integridad de los registros cerrados y previene modificaciones accidentales.

## ✨ Características Implementadas

### 1. **Detección Automática**
El sistema detecta automáticamente cuando un proceso está cerrado:
- Al cargar un proceso, verifica el campo `status`
- Si `status === 'closed'`, activa el modo solo lectura

### 2. **Indicadores Visuales**

#### Badge en Header
```
PROCESO CERRADO - SOLO LECTURA
```
- Color: Gris (bg-secondary)
- Ubicación: Header del paciente

#### Título de Página
```
Ver Proceso Terapéutico Cerrado
```
- Se muestra en lugar de "Editar Proceso Terapéutico"

#### Alerta de Advertencia
```
🔒 Proceso Cerrado:
Este proceso ha sido finalizado y no se puede editar. 
Puede revisar toda la información pero no realizar cambios.
```
- Color: Amarillo (alert-warning)
- Icono: Candado (bi-lock-fill)

### 3. **Deshabilitación de Controles**

#### Formularios Deshabilitados
Todas las secciones deshabilitan sus formularios:
- ✅ Motivo de Consulta: Todos los campos deshabilitados
- ✅ Sesiones: Sin botones de editar/eliminar/agregar
- ✅ Cierre: Todos los campos deshabilitados

#### Botones Ocultos
Los botones de acción se ocultan completamente:
- ❌ Guardar Borrador
- ❌ Guardar Proceso en Curso
- ❌ Finalizar y Cerrar Proceso

### 4. **Navegación Normal**
Los tabs funcionan normalmente para consultar información:
- ✅ Puede navegar entre tabs
- ✅ Puede ver toda la información
- ❌ No puede modificar nada

## 🔧 Implementación Técnica

### Señales y Computados
```typescript
isProcessClosed = signal(false);
isReadOnly = computed(() => this.isProcessClosed());
```

### Carga de Datos
```typescript
private loadProcessData(processId: string) {
  const process = fetchProcess(processId);
  if (process) {
    this.processData.set(process);
    this.isProcessClosed.set(process.status === 'closed');
  }
}
```

### Propagación a Componentes Hijos
```html
<app-consultation-motive-section
  [initialData]="processData().consultationMotive"
  [readOnly]="isReadOnly()"
  (dataChange)="onConsultationMotiveChange($event)"
/>
```

### Deshabilitación de Formularios
```typescript
ngOnInit() {
  if (this.readOnly()) {
    this.form.disable();
  }
}
```

## 📊 Datos Mock para Prueba

Se incluyen dos procesos de ejemplo:

### Proceso Activo (proc-1)
```typescript
{
  id: 'proc-1',
  status: 'active',
  // ... datos del proceso
}
```
- ✅ Se puede editar
- ✅ Botones de acción visibles
- ✅ Formularios habilitados

### Proceso Cerrado (proc-2)
```typescript
{
  id: 'proc-2',
  status: 'closed',
  closure: {
    closureInfo: {
      status: 'concluido',
      hadFollowUp: true,
      followUpPeriod: '3m',
    },
    observations: '...',
    recommendations: '...',
  }
}
```
- ❌ No se puede editar
- ❌ Botones de acción ocultos
- ❌ Formularios deshabilitados

## 🎨 Experiencia de Usuario

### Navegación a Proceso Cerrado

```
1. Seleccionar paciente "Juan Pérez"
   ↓
2. Ver lista de procesos
   - Proceso Activo (borde verde) → Botón "Abrir Proceso"
   - Proceso Cerrado (borde gris) → Botón "Ver Detalles"
   ↓
3. Click en "Ver Detalles" del proceso cerrado
   ↓
4. Se abre en modo solo lectura:
   - Badge: "PROCESO CERRADO - SOLO LECTURA"
   - Alerta amarilla con candado
   - Todos los campos deshabilitados
   - Sin botones de acción
   ↓
5. Usuario puede consultar información pero no editar
```

### Comparación Visual

| Aspecto | Proceso Activo | Proceso Cerrado |
|---------|---------------|-----------------|
| **Badge** | 🔵 EDITANDO PROCESO | ⚪ PROCESO CERRADO - SOLO LECTURA |
| **Alerta** | Info azul | Advertencia amarilla 🔒 |
| **Campos** | ✅ Habilitados | ❌ Deshabilitados |
| **Botón Agregar Sesión** | ✅ Visible | ❌ Oculto |
| **Botones Editar/Eliminar** | ✅ Visible | ❌ Oculto |
| **Botones Guardar** | ✅ Visibles | ❌ Ocultos |
| **Navegación Tabs** | ✅ Funcional | ✅ Funcional |

## ✅ Ventajas

1. **Integridad de Datos:** Los procesos cerrados no se pueden modificar accidentalmente
2. **Auditoría:** Se mantiene el registro histórico sin alteraciones
3. **Claridad:** Es obvio visualmente que el proceso está cerrado
4. **Consulta:** Se puede revisar toda la información del proceso
5. **Profesionalismo:** Cumple con estándares de software médico

## 🔮 Integración con Backend

Cuando se integre con el backend, el campo `status` vendrá del servidor:

```typescript
GET /api/processes/:id
Response:
{
  id: "proc-123",
  status: "closed" | "active",
  patientId: "patient-456",
  consultationMotive: { ... },
  sessions: [ ... ],
  closure: { ... }
}
```

El frontend solo necesita verificar `status === 'closed'` para activar el modo solo lectura.

## 📝 Notas Importantes

1. **Sin Permisos Especiales:** Por ahora no hay roles de usuario, todos ven los procesos cerrados como solo lectura
2. **Reversión:** Si en el futuro se necesita reabrir un proceso cerrado, se debe hacer a nivel de backend cambiando el `status`
3. **Consistencia:** Esta lógica se aplica a TODAS las secciones del proceso
4. **Navegación:** El botón "Volver" siempre está disponible, incluso en modo solo lectura

## 🎯 Pruebas

Para probar la funcionalidad:

1. Navegar a Proceso Terapéutico
2. Seleccionar paciente "Juan Pérez" (tiene ambos tipos de procesos)
3. Click en "Ver Detalles" del proceso cerrado
4. Verificar que:
   - Se muestra el badge de solo lectura
   - Aparece la alerta amarilla
   - Los campos están deshabilitados (gris)
   - No hay botones de edición
   - Se puede navegar entre tabs
   - El botón "Volver" funciona

## 📦 Archivos Modificados

```
src/app/components/therapeutic-process/
├── therapeutic-process.component.ts         ← Lógica de readonly
├── therapeutic-process.component.html       ← UI condicional
└── sections/
    ├── consultation-motive-section/
    │   └── consultation-motive-section.component.ts  ← Acepta readOnly
    ├── session-registration-section/
    │   ├── session-registration-section.component.ts ← Acepta readOnly
    │   └── session-registration-section.component.html ← Oculta botones
    └── process-closure-section/
        └── process-closure-section.component.ts  ← Acepta readOnly
```

## ✨ Resultado Final

Los procesos cerrados ahora son **100% de solo lectura**, garantizando la integridad de los registros históricos mientras se permite la consulta de información cuando sea necesario. 🎉


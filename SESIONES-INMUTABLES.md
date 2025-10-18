# Sesiones Inmutables

## 📋 Descripción

Las sesiones clínicas, una vez registradas, son **inmutables** (no se pueden modificar ni eliminar). Esto garantiza la integridad del historial clínico y cumple con estándares de registro médico.

## 🔒 Razón de Ser

En un contexto clínico, los registros de sesiones deben permanecer inalterados una vez guardados por:

1. **Integridad del Historial:** Los registros médicos no deben modificarse después de ser creados
2. **Auditoría:** Se mantiene un registro fiel de lo ocurrido en cada sesión
3. **Cumplimiento Legal:** Los registros clínicos deben ser permanentes y trazables
4. **Prevención de Errores:** Evita modificaciones accidentales de registros históricos

## ✨ Características Implementadas

### 1. **Solo Agregar, No Editar**

#### Antes (con edición)
```
[Sesión 1] [Editar] [Eliminar]
[Sesión 2] [Editar] [Eliminar]
[+ Agregar Nueva Sesión]
```

#### Ahora (inmutable + visualizable)
```
[Sesión 1] 🔒 Registrada [👁️ Ver Detalles]
[Sesión 2] 🔒 Registrada [👁️ Ver Detalles]
[+ Agregar Nueva Sesión]
```

### 2. **Indicadores Visuales**

#### Badge de Estado
```
🔒 Registrada
```
- Color: Gris (bg-secondary)
- Aparece junto al número de sesión y fecha

#### Alerta Informativa
```
🔒 Las sesiones guardadas no se pueden modificar ni eliminar
    para mantener la integridad de los registros clínicos.
```
- Color: Azul (alert-info)
- Se muestra sobre la lista de sesiones

#### Estilo Visual
- Borde izquierdo gris (3px)
- Fondo ligeramente gris (bg-gray-50)
- Sin botones de edición o eliminación
- Botón "Ver Detalles" para expandir información completa
- Vista expandida con campos de solo lectura estilizados

### 3. **Advertencia al Guardar**

Al crear una nueva sesión, se muestra una advertencia clara:

```
⚠️ Importante: Una vez guardada, la sesión no podrá ser modificada ni eliminada.
   Verifique que toda la información sea correcta antes de guardar.
```

- Color: Amarillo (alert-warning)
- Aparece al final del formulario antes de guardar
- Borde izquierdo destacado

### 4. **Formulario de Nueva Sesión**

#### Cambios en el UI:
- **Header verde** (bg-success) en lugar de azul
- **Título:** "Nueva Sesión" (sin opción de editar)
- **Botón:** "Registrar Sesión" en verde
- **Icono:** Plus circle (bi-plus-circle)

## 🔧 Implementación Técnica

### Eliminación de Funcionalidad de Edición

```typescript
// ANTES - con edición
editSession(index: number) {
  const session = this.sessions()[index];
  this.form.patchValue(session);
  this.editingSessionIndex.set(index);
  this.showForm.set(true);
}

deleteSession(index: number) {
  if (confirm('¿Está seguro...?')) {
    this.sessions.update(sessions => 
      sessions.filter((_, i) => i !== index)
    );
  }
}

// AHORA - solo agregar
// ❌ Funciones editSession y deleteSession eliminadas
```

### Guardar Solo Nuevas Sesiones

```typescript
saveSession() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = {
    ...this.form.getRawValue(),
  } as Session;

  // Solo agregar, nunca editar
  this.sessions.update((sessions) => [...sessions, formValue]);

  this.dataChange.emit(this.sessions());
  this.cancelEdit();
}
```

### Template Simplificado

```html
<!-- Sin botones de editar/eliminar -->
<div class="session-card session-locked">
  <h6>
    <span class="badge bg-primary">Sesión {{ session.sessionNumber }}</span>
    {{ session.date }} - {{ session.time }}
    <span class="badge bg-secondary">
      <i class="bi bi-lock-fill"></i> Registrada
    </span>
  </h6>
  <!-- Contenido de la sesión -->
  <!-- SIN botones de acción -->
</div>
```

## 🎨 Experiencia de Usuario

### Flujo de Trabajo

```
1. Usuario hace clic en "Agregar Nueva Sesión"
   ↓
2. Se abre formulario con header VERDE "Nueva Sesión"
   ↓
3. Usuario completa todos los campos
   ↓
4. Ve advertencia: "Una vez guardada, no podrá modificarse"
   ↓
5. Revisa información cuidadosamente
   ↓
6. Hace clic en "Registrar Sesión" (botón verde)
   ↓
7. Sesión queda registrada con:
   - Badge "🔒 Registrada"
   - Borde gris
   - Fondo gris claro
   - Sin botones de edición
   ↓
8. Puede agregar otra sesión nueva (pasos 1-7)
```

### Comparación Visual

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Botones en Sesión** | ✅ Editar, Eliminar | ❌ Ninguno (✅ Ver Detalles) |
| **Badge de Estado** | ❌ No había | ✅ "🔒 Registrada" |
| **Alerta** | ❌ No había | ✅ Info sobre inmutabilidad |
| **Formulario Header** | 🔵 Azul "Editar/Nueva" | 🟢 Verde "Nueva Sesión" |
| **Advertencia al Guardar** | ❌ No había | ✅ Amarilla con ⚠️ |
| **Estilo Visual** | Normal | Borde gris + fondo gris |
| **Visualización** | ❌ Solo resumen | ✅ Expandible para ver todo |

## ✅ Ventajas

1. **Integridad Garantizada:** Imposible modificar registros existentes
2. **Auditoría Confiable:** Los registros reflejan exactamente lo que se escribió
3. **Prevención de Errores:** No se pueden hacer cambios accidentales
4. **Cumplimiento:** Sigue estándares de software médico
5. **Claridad:** Es obvio que las sesiones son permanentes
6. **Cuidado al Registrar:** Los usuarios revisan mejor antes de guardar

## 🚫 Limitaciones (Por Diseño)

1. ❌ No se pueden editar sesiones guardadas
2. ❌ No se pueden eliminar sesiones guardadas
3. ❌ No se puede renumerar sesiones
4. ❌ Si hay un error, no se puede corregir directamente
5. ✅ **PERO:** Se puede visualizar toda la información completa en modo solo lectura

## 🔄 Manejo de Errores

Si se comete un error al registrar una sesión:

### Opción 1: Proceso Activo
- El proceso AÚN no está cerrado
- Se puede agregar una nota en la siguiente sesión explicando la corrección
- O agregar una sesión adicional con la aclaración

### Opción 2: Proceso Cerrado
- Si el proceso está cerrado, la sesión queda como registro histórico
- Se puede abrir un nuevo proceso si es necesario hacer correcciones mayores

### Opción 3: Backend (Futuro)
- Con permisos especiales (administrador), se podría permitir edición con registro de auditoría
- Cada edición quedaría registrada con timestamp y usuario
- Esto está fuera del alcance actual

## 📊 Datos Mock

Para probar, el proceso activo `proc-1` tiene sesiones existentes que no se pueden editar:

```typescript
sessions: [
  {
    sessionNumber: 1,
    date: '2025-01-15',
    time: '10:00',
    objectivesAndTechniques: 'Evaluación inicial...',
    sessionDescription: 'Primera sesión...',
  },
]
```

## 🎯 Pruebas

Para verificar la funcionalidad:

1. Navegar a proceso activo de un paciente
2. Ir a tab "Sesiones"
3. Observar sesiones existentes:
   - ✅ Tienen badge "🔒 Registrada"
   - ✅ No tienen botones de editar/eliminar
   - ✅ Tienen borde y fondo gris
   - ✅ Tienen botón "Ver Detalles" 👁️
4. Click en "Ver Detalles" de una sesión:
   - ✅ Se expande mostrando toda la información
   - ✅ Campos en estilo solo lectura (fondo blanco, borde gris)
   - ✅ Botón cambia a "Ocultar" con icono de chevron
5. Click en "Agregar Nueva Sesión"
6. Verificar:
   - ✅ Header verde
   - ✅ Título "Nueva Sesión"
   - ✅ Advertencia amarilla al final
   - ✅ Botón verde "Registrar Sesión"
7. Completar y guardar
8. Verificar que la nueva sesión queda inmutable y visualizable

## 📦 Archivos Modificados

```
src/app/components/therapeutic-process/sections/session-registration-section/
├── session-registration-section.component.ts    ← Lógica simplificada
├── session-registration-section.component.html  ← UI sin botones edición
└── session-registration-section.component.scss  ← Estilos de sesión bloqueada
```

### Cambios Específicos:

**TypeScript:**
- ❌ Eliminada función `editSession()`
- ❌ Eliminada función `deleteSession()`
- ✅ Simplificada función `saveSession()` (solo agregar)
- ✅ Agregada función `toggleSessionDetails()` para expandir/colapsar
- ✅ Agregado signal `expandedSessionIndex` para rastrear sesión expandida

**HTML:**
- ✅ Agregado badge "🔒 Registrada"
- ✅ Agregada alerta informativa
- ✅ Agregada advertencia al guardar
- ❌ Removidos botones de editar/eliminar
- ✅ Cambiado color de formulario a verde
- ✅ Agregado botón "Ver Detalles" / "Ocultar"
- ✅ Vista expandida con campos de solo lectura

**SCSS:**
- ✅ Agregada clase `.session-locked`
- ✅ Estilos de borde y fondo gris
- ✅ Estilo de advertencia
- ✅ Estilos para `.session-details-expanded`
- ✅ Animación `slideDown` para transición suave

## 🔮 Integración Futura con Backend

Cuando se integre con el backend:

```typescript
POST /api/processes/:processId/sessions
{
  sessionNumber: 1,
  date: "2025-10-18",
  time: "14:00",
  objectivesAndTechniques: "...",
  sessionDescription: "..."
}

Response: 201 Created
{
  id: "session-123",
  ...sessionData,
  createdAt: "2025-10-18T14:00:00Z",
  immutable: true  // Flag indicando que no se puede editar
}
```

El backend debe:
1. NO proveer endpoint `PUT /api/sessions/:id` para edición
2. NO proveer endpoint `DELETE /api/sessions/:id` para eliminación
3. Solo permitir `POST` para crear nuevas sesiones
4. Opcional: Endpoint de auditoría para admin con logging

## ✨ Resultado Final

Las sesiones clínicas ahora son **permanentes e inmutables**, garantizando la integridad del historial clínico y cumpliendo con estándares profesionales de registro médico. 🎉🔒


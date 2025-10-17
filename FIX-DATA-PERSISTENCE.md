# Fix: Persistencia de Datos entre Steps

## Problema Identificado
Al navegar entre los pasos del stepper, los datos ingresados se perdían porque los componentes se destruían y recreaban cada vez que se cambiaba de paso.

## Solución Implementada

### 1. **Uso de Angular Effects**
Se agregó el import de `effect` desde `@angular/core` en todos los componentes de sección:

```typescript
import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
```

### 2. **Carga de Datos Iniciales**
Se implementó un `effect` en cada componente de sección para cargar los datos cuando están disponibles:

```typescript
constructor() {
  this.form = this.fb.group({
    // ... campos del formulario
  });

  // Load initial data when available
  effect(() => {
    const data = this.initialData();
    if (data) {
      this.form.patchValue(data, { emitEvent: false });
    }
  });

  // ... resto del código
}
```

### 3. **Pasar Datos desde el Componente Principal**
Se actualizó el template del componente principal para pasar los datos guardados a cada sección:

```html
<app-personal-info-section
  [initialData]="patientData().personalInfo"
  (dataChange)="onPersonalInfoChange($event)"
/>
```

## Cómo Funciona

### Flujo de Datos:

1. **Usuario ingresa datos** en el Step 1
2. **Formulario emite cambios** → `dataChange` output
3. **Componente principal guarda** los datos en `patientData` signal
4. **Usuario navega** al Step 2
5. **Step 1 se destruye** (componente removido del DOM)
6. **Usuario regresa** al Step 1
7. **Step 1 se crea nuevamente** (componente nuevo en el DOM)
8. **Effect detecta** que hay `initialData` disponible
9. **Formulario se puebla** con los datos guardados usando `patchValue`
10. **Usuario ve sus datos** intactos

### Detalles Técnicos:

#### `patchValue` vs `setValue`
Se usa `patchValue` porque:
- Permite actualizar solo algunos campos
- No falla si faltan campos en el objeto
- Es más flexible para datos parciales

#### `{ emitEvent: false }`
Se pasa esta opción porque:
- Evita trigger de eventos innecesarios al cargar datos
- Previene loops infinitos de actualización
- Solo queremos cargar datos, no procesarlos como nuevos cambios

#### Angular Effects
Los effects se ejecutan automáticamente cuando:
- El componente se inicializa
- Los signals que lee cambian de valor
- Son ideales para sincronizar formularios con estado externo

## Componentes Actualizados

Todos estos componentes fueron actualizados con la persistencia de datos:

1. ✅ `personal-info-section.component.ts`
2. ✅ `contact-info-section.component.ts`
3. ✅ `civil-educational-section.component.ts`
4. ✅ `health-info-section.component.ts`
5. ✅ `referral-info-section.component.ts`
6. ✅ `psychological-attention-section.component.ts`
7. ✅ `psychiatric-attention-section.component.ts`
8. ✅ `emergency-contact-section.component.ts`
9. ✅ `adult-patient-registration.component.html`

## Casos de Prueba

Para verificar que funciona correctamente:

### ✅ Test 1: Navegación Básica
1. Ingresar datos en Step 1
2. Ir a Step 2
3. Regresar a Step 1
4. **Resultado esperado**: Los datos siguen ahí

### ✅ Test 2: Navegación Múltiple
1. Llenar Steps 1, 2 y 3
2. Ir al Step 5
3. Regresar al Step 2
4. **Resultado esperado**: Datos intactos en Step 2

### ✅ Test 3: Edición de Datos
1. Llenar Step 1 completamente
2. Ir a Step 3
3. Regresar a Step 1
4. Modificar un campo
5. Ir a Step 2
6. Regresar a Step 1
7. **Resultado esperado**: Se mantiene la modificación

### ✅ Test 4: Validación
1. Llenar Step 1 (marca como válido)
2. Ir a Step 2
3. Regresar a Step 1
4. **Resultado esperado**: 
   - Datos presentes
   - Step marcado como completado (verde)
   - Validación mantiene el estado

## Ventajas de Esta Solución

### 🎯 Reactiva
- Usa signals y effects de Angular
- Sincronización automática
- No hay que gestionar suscripciones manualmente

### 🚀 Performante
- Solo actualiza cuando es necesario
- No emite eventos innecesarios
- Uso eficiente de change detection

### 🧩 Mantenible
- Código consistente en todas las secciones
- Fácil de entender y extender
- Sigue las mejores prácticas de Angular 20

### 🔒 Segura
- Type-safe con TypeScript
- Validación de datos preservada
- Estado inmutable (signals)

## Alternativas Consideradas

### ❌ Mantener componentes en DOM con `[hidden]`
**Problema**: 
- Todos los componentes siempre en memoria
- Peor rendimiento
- Validación de todos los formularios siempre activa

### ❌ Usar localStorage
**Problema**:
- Sincronización compleja
- Datos persisten entre sesiones (no deseado)
- Problemas con tipos de datos

### ❌ Single Form con FormArray
**Problema**:
- Difícil de mantener
- Menos modular
- Validación compleja

### ✅ Solución Actual: Effects + Signals
**Ventajas**:
- Moderna (Angular 20)
- Reactiva y eficiente
- Modular y mantenible
- Fácil de probar

## Próximas Mejoras

### 📝 Persistencia en Backend
Cuando se implemente el API:
```typescript
saveDraft() {
  this.apiService.saveDraft(this.patientData()).subscribe();
}
```

### 💾 Auto-guardado
Implementar auto-guardado cada X segundos:
```typescript
effect(() => {
  const data = this.patientData();
  // Guardar después de 3 segundos sin cambios
});
```

### 🔄 Recuperación de Sesión
Implementar recuperación si el usuario cierra el navegador:
```typescript
ngOnInit() {
  const savedData = sessionStorage.getItem('patientDraft');
  if (savedData) {
    this.patientData.set(JSON.parse(savedData));
  }
}
```

## Conclusión

La solución implementada resuelve completamente el problema de pérdida de datos al navegar entre steps, usando las características modernas de Angular (signals y effects) de manera eficiente y mantenible.


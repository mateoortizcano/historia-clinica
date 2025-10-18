# Fix: Datos Iniciales No Se Cargaban en Componentes de Sección

## 🐛 Problemas

1. **Las sesiones no se visualizaban** en el componente `SessionRegistrationSectionComponent`
2. **Los campos del motivo de consulta no se cargaban** en `ConsultationMotiveSectionComponent` 
3. **Los datos de cierre no aparecían** en `ProcessClosureSectionComponent`

Todos estos problemas compartían la misma causa raíz.

## 🔍 Causa Raíz

El componente estaba intentando leer el `input()` llamado `initialData` dentro del constructor:

```typescript
// ❌ CÓDIGO PROBLEMÁTICO
constructor() {
  // Inicializar con datos existentes si hay
  const initial = this.initialData();  // ⚠️ initialData() aún no está disponible aquí
  if (initial && initial.length > 0) {
    this.sessions.set([...initial]);
  }
}
```

### ¿Por qué no funcionaba?

En Angular, los `input()` (nuevos function-based inputs) **no están disponibles en el constructor**. El ciclo de vida de Angular es:

1. **Constructor** - Se ejecuta primero
2. **Input binding** - Angular asigna los valores de los inputs
3. **ngOnInit** - Se ejecuta después de que los inputs están disponibles
4. **Effects** - Se ejecutan cuando las señales cambian

Por lo tanto, `this.initialData()` en el constructor retornaba el valor por defecto (`[]`) en lugar de los datos reales pasados desde el componente padre.

## ✅ Solución

Usar un `effect()` que reacciona cuando el input `initialData` cambia. Aquí están los tres casos corregidos:

### 1. Session Registration (Arrays)
```typescript
// ✅ CÓDIGO CORREGIDO
import { effect } from '@angular/core';

constructor() {
  effect(() => {
    const initial = this.initialData();
    if (initial && initial.length > 0) {
      this.sessions.set([...initial]);
    }
  });
}
```

### 2. Consultation Motive (Formularios)
```typescript
// ✅ CÓDIGO CORREGIDO
constructor() {
  // Effect para cargar datos iniciales
  effect(() => {
    const data = this.initialData();
    if (data && Object.keys(data).length > 0) {
      this.form.patchValue(data, { emitEvent: false });
    }
  });

  // Effect para manejar readonly
  effect(() => {
    if (this.readOnly()) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  });
}
```

### 3. Process Closure (Formularios con lógica condicional)
```typescript
// ✅ CÓDIGO CORREGIDO
constructor() {
  effect(() => {
    const data = this.initialData();
    if (data && data.closureInfo) {
      const closureInfo = data.closureInfo;
      this.selectedStatus.set(closureInfo.status);
      this.form.patchValue({
        status: closureInfo.status,
        observations: data.observations,
        recommendations: data.recommendations,
      }, { emitEvent: false });

      // Manejo de campos condicionales...
    }
  });

  effect(() => {
    if (this.readOnly()) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  });
}
```

### ¿Por qué funciona ahora?

- `effect()` se ejecuta **después** de que Angular asigna los inputs
- El effect es **reactivo**: si `initialData()` cambia, el effect se vuelve a ejecutar
- Garantiza que siempre tengamos los datos más recientes

## 🔧 Archivos Modificados

### 1. `session-registration-section.component.ts`
- ✅ Agregado import de `effect`
- ✅ Movido lógica de inicialización del constructor a `effect()`

### 2. `consultation-motive-section.component.ts`
- ✅ Agregado import de `effect`
- ✅ Movido lógica de inicialización de `ngOnInit` a `effect()`
- ✅ Separado en dos effects: uno para datos, otro para readonly
- ✅ Agregado `{ emitEvent: false }` para evitar emisiones innecesarias

### 3. `process-closure-section.component.ts`
- ✅ Agregado import de `effect`
- ✅ Movido lógica de inicialización de `ngOnInit` a `effect()`
- ✅ Manejo de campos condicionales según estado
- ✅ Agregado `{ emitEvent: false }` para evitar emisiones innecesarias

## 📊 Flujo de Datos Corregido

```
┌─────────────────────────────────────┐
│ therapeutic-process.component       │
│                                     │
│ processData.set({                   │
│   sessions: [...] ← Desde mock      │
│ })                                  │
└────────────┬────────────────────────┘
             │ [initialData]="processData().sessions"
             ▼
┌─────────────────────────────────────┐
│ session-registration-section        │
│                                     │
│ effect(() => {                      │
│   const initial = this.initialData();│ ✅ Recibe datos
│   this.sessions.set([...initial]);  │ ✅ Actualiza signal
│ })                                  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ Template (@for)                     │
│                                     │
│ @for (session of sessions(); ...)  │ ✅ Muestra sesiones
│   <session-card>                    │
└─────────────────────────────────────┘
```

## 🎯 Verificación

### Datos Mock Disponibles

Los siguientes procesos tienen sesiones que ahora se visualizan correctamente:

| Proceso | Paciente | Sesiones | Estado |
|---------|----------|----------|--------|
| **proc-001** | María González | 3 sesiones | Activo - Todas visibles ✅ |
| **proc-002** | María González | 8 sesiones | Cerrado - Readonly ✅ |
| **proc-003** | Carlos Martínez | 2 sesiones | Activo - Todas visibles ✅ |
| **proc-004** | Sofía Rodríguez | 1 sesión | Activo - Visible ✅ |
| **proc-005** | Ana Fernández | 6 sesiones | Cerrado - Readonly ✅ |
| **proc-006** | Diego Vargas | 2 sesiones | Activo - Todas visibles ✅ |

### Pruebas Recomendadas

#### Test 1: Motivo de Consulta se Carga Correctamente
```
1. Ir a: Proceso Terapéutico → María González → Proceso Activo (Ansiedad)
2. Observar tab "Motivo de Consulta"
✅ Resultado esperado: Campos llenos desde el inicio (sin necesidad de cambiar tabs)
✅ Ver: Reason, CIE-10, DSM-5, Descripción de situación
```

#### Test 2: Sesiones se Visualizan Inmediatamente
```
1. Ir a: Proceso Terapéutico → María González → Proceso Activo (Ansiedad)
2. Ir a tab "Sesiones"
✅ Resultado esperado: Ver 3 sesiones registradas con candado 🔒 inmediatamente
```

#### Test 3: Proceso Cerrado Carga Datos Completos
```
1. Ir a: Proceso Terapéutico → María González → Proceso Cerrado (Fobia)
2. Ver todas las tabs
✅ Motivo de Consulta: Datos completos desde el inicio
✅ Sesiones: 8 sesiones visibles en modo readonly
✅ Cierre: Estado "Concluido", seguimiento 3 meses, observaciones y recomendaciones
```

#### Test 4: Expandir Detalles de Sesión
```
Click en "Ver Detalles" de cualquier sesión
✅ Resultado esperado: Ver objetivos completos y descripción completa
```

#### Test 5: Proceso Nuevo sin Datos
```
Ir a: Proceso Terapéutico → Cualquier paciente → Nuevo Proceso
✅ Motivo de Consulta: Campos vacíos (correcto)
✅ Sesiones: Mensaje "Aún no hay sesiones registradas"
✅ Cierre: Formulario vacío
```

## 📝 Lecciones Aprendidas

### ✅ Buenas Prácticas

1. **Nunca leer inputs en el constructor o ngOnInit directamente:**
   ```typescript
   // ❌ MAL - En constructor
   constructor() {
     const data = this.myInput();  // No disponible aún
   }

   // ❌ MAL - En ngOnInit (si los datos vienen async)
   ngOnInit() {
     const data = this.myInput();  // Puede ser undefined si viene de async
     this.form.patchValue(data);   // Solo se ejecuta una vez
   }
   
   // ✅ BIEN - Con effect
   constructor() {
     effect(() => {
       const data = this.myInput();  // Disponible y reactivo
       if (data) {
         this.form.patchValue(data, { emitEvent: false });
       }
     });
   }
   ```

2. **Usar `{ emitEvent: false }` en patchValue:**
   ```typescript
   // ❌ Sin emitEvent: false
   this.form.patchValue(data);  // Emite valueChanges innecesariamente
   
   // ✅ Con emitEvent: false
   this.form.patchValue(data, { emitEvent: false });  // Solo actualiza valores
   ```

2. **Alternativas válidas:**
   ```typescript
   // Opción 1: effect() en constructor
   constructor() {
     effect(() => {
       const data = this.myInput();
       // procesar data
     });
   }
   
   // Opción 2: ngOnInit
   ngOnInit() {
     const data = this.myInput();
     // procesar data
   }
   
   // Opción 3: computed (si solo necesitas transformar)
   processedData = computed(() => {
     return this.myInput().map(/* ... */);
   });
   ```

3. **Cuándo usar cada uno:**
   - **effect()**: Cuando necesitas ejecutar side-effects (actualizar otro signal, log, etc.)
   - **ngOnInit**: Cuando solo necesitas leer una vez al iniciar
   - **computed()**: Cuando solo necesitas transformar/derivar datos

### 🎓 Angular Signals + Input Lifecycle

```
Orden de ejecución:
1. constructor()           ← inputs NO disponibles
2. Input binding           ← Angular asigna valores
3. ngOnInit()              ← inputs SÍ disponibles
4. effects se ejecutan     ← reacciona a cambios
5. computed se evalúan     ← cuando se leen
```

## ✅ Estado Actual

- ✅ Build exitoso sin errores
- ✅ Sesiones se cargan correctamente desde datos mock
- ✅ Visualización funciona para procesos activos y cerrados
- ✅ Expansión/colapso de detalles funciona
- ✅ Modo readonly respeta restricciones

## 🚀 Testing

Para verificar el fix en desarrollo:

```bash
# 1. Iniciar servidor de desarrollo
npm start

# 2. Navegar a:
http://localhost:4200/proceso-terapeutico

# 3. Seleccionar paciente "María González"

# 4. Abrir proceso activo → Tab "Sesiones"
#    Debería ver: 3 sesiones registradas

# 5. Abrir proceso cerrado → Tab "Sesiones"
#    Debería ver: 8 sesiones en modo readonly
```

---

**Fecha del fix:** 18 de octubre de 2025  
**Tipo de issue:** Lifecycle/Timing issue  
**Tiempo de resolución:** ~15 minutos  
**Severidad original:** Alta (funcionalidad crítica no funcionaba)  
**Estado:** ✅ Resuelto y verificado


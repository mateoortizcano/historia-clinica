# Sistema de Diseño - Historia Clínica de Psicología

## 📋 Tabla de Contenidos
1. [Introducción](#introducción)
2. [Filosofía de Diseño](#filosofía-de-diseño)
3. [Paleta de Colores](#paleta-de-colores)
4. [Tipografía](#tipografía)
5. [Espaciado](#espaciado)
6. [Componentes](#componentes)
7. [Guía de Uso](#guía-de-uso)

---

## Introducción

Este sistema de diseño ha sido creado específicamente para una aplicación de historia clínica de psicología, con el objetivo de proporcionar una experiencia visual **consistente, profesional, calmada y funcional**.

### Principios Rectores
- **Claridad**: La información debe ser fácil de leer y entender
- **Confianza**: Los colores y formas deben transmitir profesionalismo
- **Calma**: El diseño debe reducir la carga cognitiva y promover la concentración
- **Funcionalidad**: Optimizado para uso prolongado en pantallas de 10-14 pulgadas

---

## Filosofía de Diseño

### ¿Por qué este sistema?

**Para la psicóloga:**
- **Reducción de fatiga visual**: Colores suaves y buen contraste
- **Eficiencia**: Patrones consistentes que se aprenden rápido
- **Profesionalismo**: Diseño serio sin ser corporativo rígido
- **Enfoque en el contenido**: El diseño no distrae, apoya

**Para los pacientes (indirectamente):**
- La psicóloga puede enfocarse más en el paciente y menos en la herramienta
- Información mejor organizada = mejor atención

---

## Paleta de Colores

### Colores Primarios - Azul Sereno

**Color principal**: `#2770ff` (Azul 500)

| Variable CSS | Color | Hex | Uso |
|--------------|-------|-----|-----|
| `--color-primary-50` | ![#e8f2ff](https://via.placeholder.com/15/e8f2ff/e8f2ff.png) | `#e8f2ff` | Fondos muy suaves |
| `--color-primary-100` | ![#d0e4ff](https://via.placeholder.com/15/d0e4ff/d0e4ff.png) | `#d0e4ff` | Fondos suaves |
| `--color-primary-500` | ![#2770ff](https://via.placeholder.com/15/2770ff/2770ff.png) | `#2770ff` | **Botones principales, links, énfasis** |
| `--color-primary-600` | ![#1457e6](https://via.placeholder.com/15/1457e6/1457e6.png) | `#1457e6` | Hover de botones primarios |
| `--color-primary-700` | ![#0d3fb8](https://via.placeholder.com/15/0d3fb8/0d3fb8.png) | `#0d3fb8` | Estados activos |

**Justificación**: El azul es el color más asociado con confianza, profesionalismo y calma. Un tono medio-brillante mantiene modernidad sin ser agresivo.

### Colores Secundarios - Verde Suave

**Color secundario**: `#10b981` (Verde 500)

| Variable CSS | Color | Hex | Uso |
|--------------|-------|-----|-----|
| `--color-secondary-500` | ![#10b981](https://via.placeholder.com/15/10b981/10b981.png) | `#10b981` | Éxito, confirmaciones, completado |
| `--color-success` | ![#10b981](https://via.placeholder.com/15/10b981/10b981.png) | `#10b981` | Estados de éxito |
| `--color-success-light` | ![#d1f4e0](https://via.placeholder.com/15/d1f4e0/d1f4e0.png) | `#d1f4e0` | Fondos de alertas de éxito |

**Justificación**: Verde para calma y bienestar, complementa el azul sin competir visualmente.

### Grises Neutros - Base Visual

| Variable CSS | Color | Hex | Uso Principal |
|--------------|-------|-----|---------------|
| `--color-neutral-50` | ![#f8f9fa](https://via.placeholder.com/15/f8f9fa/f8f9fa.png) | `#f8f9fa` | Fondo principal de la app |
| `--color-neutral-100` | ![#f1f3f5](https://via.placeholder.com/15/f1f3f5/f1f3f5.png) | `#f1f3f5` | Fondos secundarios |
| `--color-neutral-200` | ![#e9ecef](https://via.placeholder.com/15/e9ecef/e9ecef.png) | `#e9ecef` | Campos deshabilitados |
| `--color-neutral-300` | ![#dee2e6](https://via.placeholder.com/15/dee2e6/dee2e6.png) | `#dee2e6` | Bordes principales |
| `--color-neutral-600` | ![#868e96](https://via.placeholder.com/15/868e96/868e96.png) | `#868e96` | Texto secundario |
| `--color-neutral-700` | ![#495057](https://via.placeholder.com/15/495057/495057.png) | `#495057` | Texto terciario |
| `--color-neutral-900` | ![#212529](https://via.placeholder.com/15/212529/212529.png) | `#212529` | Texto principal |

**Justificación**: Grises cálidos (ligeramente azulados) que mantienen coherencia con la paleta y no cansan la vista.

### Colores Semánticos

| Tipo | Color | Variable | Uso |
|------|-------|----------|-----|
| ✅ Éxito | ![#10b981](https://via.placeholder.com/15/10b981/10b981.png) | `--color-success` | Confirmaciones, guardados exitosos |
| ⚠️ Advertencia | ![#fbbf24](https://via.placeholder.com/15/fbbf24/fbbf24.png) | `--color-warning` | Alertas que requieren atención |
| ❌ Error | ![#ef4444](https://via.placeholder.com/15/ef4444/ef4444.png) | `--color-error` | Errores de validación |
| ℹ️ Info | ![#3b82f6](https://via.placeholder.com/15/3b82f6/3b82f6.png) | `--color-info` | Información adicional |

---

## Tipografía

### Fuente Principal: **Inter**

**¿Por qué Inter?**
- ✅ Diseñada específicamente para interfaces digitales
- ✅ Excelente legibilidad en tamaños pequeños y grandes
- ✅ Profesional y moderna sin ser fría
- ✅ Variantes de peso bien diferenciadas
- ✅ Gratis y open-source

### Jerarquía Tipográfica

```css
/* Uso en código */
font-family: var(--font-primary);
```

| Nivel | Variable | Tamaño | Peso | Uso |
|-------|----------|--------|------|-----|
| H1 | `--font-size-3xl` | 36px | Bold (700) | Títulos de página |
| H2 | `--font-size-2xl` | 30px | Semibold (600) | Títulos de sección |
| H3 | `--font-size-xl` | 24px | Semibold (600) | Subtítulos importantes |
| H4 | `--font-size-lg` | 20px | Semibold (600) | Subtítulos menores |
| H5 | `--font-size-md` | 18px | Medium (500) | Encabezados de tarjetas |
| H6 | `--font-size-base` | 16px | Medium (500) | Etiquetas destacadas |
| Cuerpo | `--font-size-base` | 16px | Regular (400) | Texto principal |
| Small | `--font-size-sm` | 14px | Regular (400) | Texto secundario |
| XS | `--font-size-xs` | 12px | Regular (400) | Badges, ayudas contextuales |

### Pesos de Fuente

```scss
--font-weight-normal: 400;    // Texto regular
--font-weight-medium: 500;    // Énfasis sutil (labels)
--font-weight-semibold: 600;  // Títulos, botones
--font-weight-bold: 700;      // Títulos principales
```

**Recomendación**: Usar Medium (500) para labels de formularios para mejor legibilidad sin peso excesivo.

### Alturas de Línea

```scss
--line-height-tight: 1.25;    // Títulos
--line-height-normal: 1.5;    // Texto estándar
--line-height-relaxed: 1.75;  // Párrafos largos
```

---

## Espaciado

### Sistema de Escala de 8px

El espaciado sigue una escala basada en múltiplos de 8px para crear ritmo visual consistente:

| Variable | Valor | Uso Principal |
|----------|-------|---------------|
| `--spacing-1` | 4px | Espaciado mínimo, gaps pequeños |
| `--spacing-2` | 8px | **Base**: Padding interno de componentes |
| `--spacing-3` | 12px | Espaciado medio |
| `--spacing-4` | 16px | Padding estándar |
| `--spacing-5` | 20px | Márgenes entre elementos |
| `--spacing-6` | 24px | **Común**: Padding de cards |
| `--spacing-8` | 32px | Espaciado generoso |
| `--spacing-10` | 40px | Separación de secciones |
| `--spacing-12` | 48px | Separación grande |

### Bordes Redondeados

| Variable | Valor | Uso |
|----------|-------|-----|
| `--radius-sm` | 6px | Badges, elementos pequeños |
| `--radius-base` | 8px | **Estándar**: Botones, inputs |
| `--radius-md` | 10px | Cards pequeñas |
| `--radius-lg` | 12px | Cards grandes, modales |
| `--radius-xl` | 16px | Elementos destacados |
| `--radius-full` | 9999px | Círculos, pills |

**Decisión**: 8-12px de radio proporciona suficiente suavidad sin parecer infantil.

### Sombras

| Variable | Uso |
|----------|-----|
| `--shadow-xs` | Sutil elevación (dividers) |
| `--shadow-sm` | **Estándar**: Cards en reposo |
| `--shadow-base` | Cards con hover |
| `--shadow-md` | Cards elevadas, dropdowns |
| `--shadow-lg` | Modales |
| `--shadow-focus` | **Importante**: Estado de focus |

**Filosofía**: Sombras muy sutiles. No queremos un efecto "Material Design" exagerado.

---

## Componentes

### 1. Botones

#### Botón Primario
```html
<button class="btn btn-primary">
  <i class="bi bi-save"></i>
  Guardar
</button>
```

**Especificaciones:**
- Altura: `40px` (--button-height-base)
- Padding horizontal: `16px` (--button-padding-x-base)
- Border radius: `8px` (--radius-base)
- Font weight: `500` (Medium)
- Transición: `200ms` ease-in-out
- Hover: Elevación sutil + color más oscuro

**Estados:**
- **Normal**: `#2770ff` (primary-500)
- **Hover**: `#1457e6` (primary-600) + `translateY(-1px)` + sombra
- **Active**: Sin elevación
- **Disabled**: Opacidad 60%, cursor not-allowed
- **Focus**: Shadow azul de 3px

#### Botón Secundario
```html
<button class="btn btn-secondary">Cancelar</button>
```

- Color: `#868e96` (neutral-600)
- Mismo tamaño y comportamiento que primario

#### Botón Outline
```html
<button class="btn btn-outline-primary">Opciones</button>
```

- Transparente con borde del color principal
- Hover: Rellena con el color sólido

#### Tamaños de Botones

```html
<button class="btn btn-primary btn-sm">Pequeño</button>
<button class="btn btn-primary">Estándar</button>
<button class="btn btn-primary btn-lg">Grande</button>
```

| Tamaño | Altura | Padding | Font Size |
|--------|--------|---------|-----------|
| Small | 32px | 12px | 14px |
| Base | 40px | 16px | 16px |
| Large | 48px | 24px | 18px |

---

### 2. Campos de Formulario

#### Input de Texto
```html
<div class="mb-3">
  <label class="form-label" for="nombre">
    Nombre del paciente
  </label>
  <input 
    type="text" 
    class="form-control" 
    id="nombre"
    placeholder="Ingrese el nombre"
  >
  <div class="form-text">Texto de ayuda opcional</div>
</div>
```

**Especificaciones:**
- Altura: `40px`
- Padding: `8px 12px`
- Border: `1px solid #dee2e6`
- Border radius: `8px`
- Font size: `16px`

**Estados:**
- **Normal**: Borde gris neutral
- **Focus**: Borde azul + sombra azul de 3px
- **Disabled**: Fondo gris claro, cursor not-allowed
- **Error**: Borde rojo + sombra roja
- **Success**: Borde verde + sombra verde

#### Select / Dropdown
```html
<select class="form-select">
  <option>Seleccione una opción</option>
  <option>Opción 1</option>
</select>
```

Mismas especificaciones que input.

#### Textarea
```html
<textarea class="form-control" rows="4"></textarea>
```

- Min-height: `80px`
- Resize: Vertical solamente

---

### 3. Cards / Tarjetas

```html
<div class="card">
  <div class="card-header">
    <h5 class="mb-0">Título de la Tarjeta</h5>
  </div>
  <div class="card-body">
    Contenido de la tarjeta
  </div>
</div>
```

**Especificaciones:**
- Border radius: `12px` (--radius-lg)
- Border: `1px solid #f1f3f5`
- Box shadow: Sutil (--shadow-sm)
- Hover: Shadow más prominente
- Padding body: `24px`
- Padding header: `16px 20px`

---

### 4. Alertas

```html
<div class="alert alert-info">
  <i class="bi bi-info-circle"></i>
  Mensaje informativo
</div>
```

**Tipos:**
- `alert-info`: Azul claro
- `alert-success`: Verde claro
- `alert-warning`: Amarillo
- `alert-danger`: Rojo claro

**Especificaciones:**
- Padding: `16px`
- Border radius: `8px`
- Border: `1px solid` (color del tipo)
- Font size: `16px`

---

### 5. Badges / Insignias

```html
<span class="badge bg-primary">Activo</span>
<span class="badge bg-success">Completado</span>
```

**Especificaciones:**
- Padding: `4px 12px`
- Font size: `12px`
- Font weight: `500`
- Border radius: `6px`

---

## Guía de Uso

### ¿Cuándo usar qué?

#### Colores de Botones

| Acción | Tipo de Botón | Razón |
|--------|---------------|-------|
| Guardar, Confirmar | `btn-primary` | Acción principal y positiva |
| Eliminar, Cancelar | `btn-outline-secondary` o `btn-outline-danger` | Acción secundaria o destructiva |
| Opciones adicionales | `btn-outline-primary` | Acción secundaria |

#### Colores de Alertas

| Contexto | Tipo | Ejemplo |
|----------|------|---------|
| Información útil | `alert-info` | "Este paciente tiene 3 sesiones programadas" |
| Acción exitosa | `alert-success` | "Sesión guardada correctamente" |
| Advertencia | `alert-warning` | "Faltan datos obligatorios" |
| Error crítico | `alert-danger` | "No se pudo guardar, intente de nuevo" |

### Espaciado Común

```scss
// Entre secciones principales
margin-bottom: var(--spacing-10); // 40px

// Entre elementos de formulario
margin-bottom: var(--spacing-4);  // 16px

// Padding de cards
padding: var(--spacing-6);         // 24px

// Gap entre botones
gap: var(--spacing-3);             // 12px
```

### Responsive

Los tamaños de fuente se ajustan automáticamente en breakpoints:

- **Desktop** (>992px): Tamaños completos
- **Tablet** (768px-992px): Reducción del 10-15%
- **Mobile** (<768px): Reducción del 15-25%

---

## Checklist de Implementación

Para asegurar consistencia al crear nuevos componentes:

- [ ] ¿Usa variables CSS en lugar de valores hardcoded?
- [ ] ¿Los botones tienen altura de `40px` (o explícitamente `btn-sm`/`btn-lg`)?
- [ ] ¿Los border-radius son de `8px` o `12px`?
- [ ] ¿El espaciado sigue múltiplos de 8px?
- [ ] ¿Los inputs tienen el estado `:focus` correctamente estilizado?
- [ ] ¿Los colores vienen de la paleta definida?
- [ ] ¿El contraste de texto es suficiente (WCAG AA)?
- [ ] ¿Las transiciones son sutiles (200ms)?

---

## Ejemplos de Código

### Formulario Completo

```html
<div class="card">
  <div class="card-header">
    <h5 class="mb-0">
      <i class="bi bi-person"></i>
      Información del Paciente
    </h5>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label" for="nombre">Nombre completo</label>
        <input type="text" class="form-control" id="nombre">
      </div>
      
      <div class="col-md-6 mb-3">
        <label class="form-label" for="edad">Edad</label>
        <input type="number" class="form-control" id="edad">
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label" for="observaciones">Observaciones</label>
      <textarea class="form-control" id="observaciones" rows="4"></textarea>
      <div class="form-text">Información adicional relevante</div>
    </div>

    <div class="d-flex justify-content-end gap-3">
      <button type="button" class="btn btn-outline-secondary">
        Cancelar
      </button>
      <button type="submit" class="btn btn-primary">
        <i class="bi bi-save"></i>
        Guardar
      </button>
    </div>
  </div>
</div>
```

---

## Conclusión

Este sistema de diseño está pensado para:

1. **Reducir decisiones**: Ya no hay que pensar "¿qué color uso?"
2. **Mantener consistencia**: Todos los componentes se ven parte de la misma familia
3. **Facilitar mantenimiento**: Cambiar un color en variables afecta toda la app
4. **Mejorar UX**: Patrones consistentes se aprenden más rápido
5. **Proyectar profesionalismo**: Un diseño cohesivo transmite calidad

**La clave**: Usar siempre las variables CSS, nunca valores hardcoded.

---

## Referencias Rápidas

```scss
/* Colores más usados */
--color-primary-500: #2770ff;
--color-success: #10b981;
--color-text-primary: #212529;
--color-text-secondary: #495057;
--color-border: #dee2e6;
--color-bg-primary: #ffffff;
--color-bg-secondary: #f8f9fa;

/* Espaciados más usados */
--spacing-2: 0.5rem;   /* 8px - padding inputs */
--spacing-4: 1rem;     /* 16px - margin elementos */
--spacing-6: 1.5rem;   /* 24px - padding cards */

/* Radios más usados */
--radius-base: 0.5rem;   /* 8px - botones, inputs */
--radius-lg: 0.75rem;    /* 12px - cards */

/* Sombras más usadas */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-focus: 0 0 0 3px rgba(39, 112, 255, 0.15);
```


# Guía Rápida - Sistema de Diseño

## 🚀 Inicio Rápido (5 minutos)

### ¿Qué se implementó?
✅ Sistema completo de tokens de diseño (colores, tipografía, espaciado)  
✅ Fuente profesional Inter de Google Fonts  
✅ Estilos estandarizados en toda la aplicación  
✅ Documentación completa con ejemplos

### ¿Dónde está todo?

```
📁 Archivos principales:
├── src/styles/_design-tokens.scss    ← Todas las variables CSS
├── src/styles.scss                   ← Estilos globales aplicados
│
📚 Documentación:
├── SISTEMA-DISEÑO.md                 ← Guía completa del sistema
├── EJEMPLOS-COMPONENTES.md           ← Ejemplos de código HTML
├── RESUMEN-ESTANDARIZACION-DISEÑO.md ← Resumen ejecutivo
└── GUIA-RAPIDA-SISTEMA-DISEÑO.md     ← Este archivo
```

---

## 🎨 Colores más usados (copiar y pegar)

```scss
/* Colores principales */
--color-primary-500: #2770ff;      /* Botones primarios, enlaces */
--color-success: #10b981;           /* Confirmaciones, éxito */
--color-error: #ef4444;             /* Errores, validaciones */
--color-warning: #fbbf24;           /* Advertencias */
--color-info: #3b82f6;              /* Información adicional */

/* Texto */
--color-text-primary: #212529;      /* Texto principal */
--color-text-secondary: #495057;    /* Texto secundario */
--color-text-tertiary: #868e96;     /* Texto terciario */
--color-text-inverse: #ffffff;      /* Texto sobre fondos oscuros */

/* Fondos */
--color-bg-primary: #ffffff;        /* Fondo blanco */
--color-bg-secondary: #f8f9fa;      /* Fondo gris muy claro */
--color-bg-tertiary: #f1f3f5;       /* Fondo gris claro */
--color-bg-disabled: #e9ecef;       /* Campos deshabilitados */

/* Bordes */
--color-border: #dee2e6;            /* Bordes estándar */
```

---

## 📏 Espaciado (sistema de 8px)

```scss
--spacing-1: 0.25rem;  /* 4px  - mínimo */
--spacing-2: 0.5rem;   /* 8px  - padding inputs, gaps pequeños */
--spacing-3: 0.75rem;  /* 12px - espaciado medio */
--spacing-4: 1rem;     /* 16px - ESTÁNDAR: margin elementos, padding botones */
--spacing-5: 1.25rem;  /* 20px - márgenes entre elementos */
--spacing-6: 1.5rem;   /* 24px - COMÚN: padding cards, separación */
--spacing-8: 2rem;     /* 32px - espaciado generoso */
--spacing-10: 2.5rem;  /* 40px - separación de secciones */
```

---

## 🔘 Componentes Básicos

### Botón Estándar
```html
<button class="btn btn-primary">
  <i class="bi bi-save"></i>
  Guardar
</button>
```

### Input de Formulario
```html
<div class="mb-3">
  <label class="form-label" for="nombre">
    Nombre <span class="text-danger">*</span>
  </label>
  <input type="text" class="form-control" id="nombre">
</div>
```

### Card Simple
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title mb-3">Título</h5>
    <p class="mb-0">Contenido...</p>
  </div>
</div>
```

### Alerta
```html
<div class="alert alert-success">
  <i class="bi bi-check-circle"></i>
  ¡Operación exitosa!
</div>
```

---

## ✅ Checklist Rápido

Antes de crear un componente nuevo:

```
[ ] ¿Usé var(--color-*) en lugar de #hex?
[ ] ¿Usé var(--spacing-*) en lugar de px?
[ ] ¿Los botones tienen 40px de altura?
[ ] ¿Los border-radius son 8px o 12px?
[ ] ¿Hay estado :focus con sombra azul?
```

---

## 📖 Más Información

- **Filosofía completa:** Ver `SISTEMA-DISEÑO.md`
- **Ejemplos de código:** Ver `EJEMPLOS-COMPONENTES.md`
- **Resumen técnico:** Ver `RESUMEN-ESTANDARIZACION-DISEÑO.md`

---

## 🆘 Referencia Rápida de Clases

### Botones
```html
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-success">Éxito</button>
<button class="btn btn-outline-primary">Outline</button>
<button class="btn btn-primary btn-sm">Pequeño</button>
<button class="btn btn-primary btn-lg">Grande</button>
```

### Alertas
```html
<div class="alert alert-info">Información</div>
<div class="alert alert-success">Éxito</div>
<div class="alert alert-warning">Advertencia</div>
<div class="alert alert-danger">Error</div>
```

### Badges
```html
<span class="badge bg-primary">Primario</span>
<span class="badge bg-success">Éxito</span>
<span class="badge bg-danger">Error</span>
<span class="badge bg-secondary">Secundario</span>
```

### Espaciado Bootstrap
```html
<div class="mb-2">Margen bottom 8px</div>
<div class="mb-3">Margen bottom 12px</div>
<div class="mb-4">Margen bottom 16px</div>
<div class="p-4">Padding 16px todos los lados</div>
<div class="gap-3">Gap 12px entre elementos flex</div>
```

---

## 💡 Tips

1. **Siempre usa variables CSS:**
   ```scss
   // ❌ Mal
   color: #2770ff;
   
   // ✅ Bien
   color: var(--color-primary-500);
   ```

2. **Iconos con Bootstrap Icons:**
   ```html
   <i class="bi bi-save"></i>
   <i class="bi bi-check-circle"></i>
   <i class="bi bi-x-circle"></i>
   ```

3. **Responsive con Bootstrap:**
   ```html
   <div class="row">
     <div class="col-12 col-md-6 col-lg-4">...</div>
   </div>
   ```

4. **Estados de validación:**
   ```html
   <input class="form-control is-valid">
   <input class="form-control is-invalid">
   ```

---

## 🎯 Resultado

Con este sistema, tu aplicación ahora tiene:

✅ **Consistencia visual** en todos los componentes  
✅ **Tipografía profesional** (Inter)  
✅ **Paleta de colores calmada** y confiable  
✅ **Componentes reutilizables** con código documentado  
✅ **Fácil mantenimiento** (cambiar un color afecta toda la app)  

---

**¿Dudas?** Consulta `SISTEMA-DISEÑO.md` para detalles completos.

**¿Necesitas un ejemplo?** Revisa `EJEMPLOS-COMPONENTES.md`.

---

*Sistema de diseño v1.0 - Octubre 2025*


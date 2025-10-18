# Ejemplos de Componentes - Sistema de Diseño

Este documento muestra ejemplos prácticos de cómo implementar los componentes más comunes usando el sistema de diseño estandarizado.

## 📦 Botones

### Botón Primario (Acciones principales)
```html
<!-- Guardar cambios, Confirmar -->
<button class="btn btn-primary">
  <i class="bi bi-save"></i>
  Guardar Paciente
</button>
```

### Botón Secundario (Acciones alternativas)
```html
<!-- Cancelar, volver -->
<button class="btn btn-secondary">
  <i class="bi bi-arrow-left"></i>
  Volver
</button>
```

### Botón de Éxito (Confirmaciones positivas)
```html
<!-- Completar, finalizar -->
<button class="btn btn-success">
  <i class="bi bi-check-circle"></i>
  Completar Sesión
</button>
```

### Botones Outline (Acciones secundarias)
```html
<!-- Opciones adicionales -->
<button class="btn btn-outline-primary">
  <i class="bi bi-eye"></i>
  Ver Detalle
</button>

<button class="btn btn-outline-secondary">
  <i class="bi bi-x"></i>
  Cancelar
</button>

<button class="btn btn-outline-danger">
  <i class="bi bi-trash"></i>
  Eliminar
</button>
```

### Grupos de Botones
```html
<!-- Navegación de formulario -->
<div class="d-flex justify-content-between align-items-center gap-3">
  <button type="button" class="btn btn-outline-secondary">
    <i class="bi bi-arrow-left"></i>
    Anterior
  </button>
  
  <span class="text-muted">Paso 2 de 5</span>
  
  <button type="button" class="btn btn-primary">
    Siguiente
    <i class="bi bi-arrow-right"></i>
  </button>
</div>
```

### Tamaños de Botones
```html
<!-- Pequeño -->
<button class="btn btn-primary btn-sm">Pequeño</button>

<!-- Estándar (predeterminado) -->
<button class="btn btn-primary">Estándar</button>

<!-- Grande -->
<button class="btn btn-primary btn-lg">Grande</button>
```

---

## 📝 Formularios

### Formulario Básico
```html
<form>
  <div class="row">
    <div class="col-md-6 mb-3">
      <label class="form-label" for="nombre">
        Nombre completo
        <span class="text-danger">*</span>
      </label>
      <input 
        type="text" 
        class="form-control" 
        id="nombre"
        placeholder="Ej: María García"
        required
      >
    </div>

    <div class="col-md-6 mb-3">
      <label class="form-label" for="telefono">
        Teléfono
      </label>
      <input 
        type="tel" 
        class="form-control" 
        id="telefono"
        placeholder="Ej: +57 300 123 4567"
      >
      <div class="form-text">Formato internacional preferido</div>
    </div>
  </div>

  <div class="mb-3">
    <label class="form-label" for="email">Correo electrónico</label>
    <input 
      type="email" 
      class="form-control" 
      id="email"
      placeholder="correo@ejemplo.com"
    >
  </div>

  <div class="mb-3">
    <label class="form-label" for="genero">Género</label>
    <select class="form-select" id="genero">
      <option value="">Seleccione...</option>
      <option value="M">Masculino</option>
      <option value="F">Femenino</option>
      <option value="O">Otro</option>
      <option value="P">Prefiero no decir</option>
    </select>
  </div>

  <div class="mb-3">
    <label class="form-label" for="observaciones">Observaciones</label>
    <textarea 
      class="form-control" 
      id="observaciones" 
      rows="4"
      placeholder="Información adicional relevante..."
    ></textarea>
  </div>

  <div class="d-flex gap-3 justify-content-end">
    <button type="button" class="btn btn-outline-secondary">
      Cancelar
    </button>
    <button type="submit" class="btn btn-primary">
      <i class="bi bi-save"></i>
      Guardar
    </button>
  </div>
</form>
```

### Validación de Formulario
```html
<!-- Campo válido -->
<div class="mb-3">
  <label class="form-label" for="email-valid">Correo electrónico</label>
  <input 
    type="email" 
    class="form-control is-valid" 
    id="email-valid"
    value="usuario@ejemplo.com"
  >
  <div class="valid-feedback">¡Perfecto!</div>
</div>

<!-- Campo con error -->
<div class="mb-3">
  <label class="form-label" for="email-invalid">Correo electrónico</label>
  <input 
    type="email" 
    class="form-control is-invalid" 
    id="email-invalid"
    value="correo-invalido"
  >
  <div class="invalid-feedback">
    Por favor ingrese un correo electrónico válido.
  </div>
</div>
```

### Radio Buttons y Checkboxes
```html
<!-- Radio buttons -->
<div class="mb-3">
  <label class="form-label d-block">¿Ha tenido tratamiento previo?</label>
  
  <div class="form-check">
    <input class="form-check-input" type="radio" name="tratamientoPrevio" id="si" value="si">
    <label class="form-check-label" for="si">
      Sí
    </label>
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="radio" name="tratamientoPrevio" id="no" value="no">
    <label class="form-check-label" for="no">
      No
    </label>
  </div>
</div>

<!-- Checkboxes -->
<div class="mb-3">
  <label class="form-label d-block">Síntomas presentes</label>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="ansiedad">
    <label class="form-check-label" for="ansiedad">
      Ansiedad
    </label>
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="depresion">
    <label class="form-check-label" for="depresion">
      Depresión
    </label>
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="estres">
    <label class="form-check-label" for="estres">
      Estrés
    </label>
  </div>
</div>
```

---

## 🃏 Cards / Tarjetas

### Card Básica
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title mb-3">Título de la Tarjeta</h5>
    <p class="card-text mb-0">
      Contenido de la tarjeta. Aquí va la información principal que 
      queremos mostrar al usuario.
    </p>
  </div>
</div>
```

### Card con Header
```html
<div class="card">
  <div class="card-header">
    <h5 class="mb-0">
      <i class="bi bi-person-badge"></i>
      Información del Paciente
    </h5>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-6">
        <strong>Nombre:</strong> María García
      </div>
      <div class="col-6">
        <strong>Edad:</strong> 32 años
      </div>
    </div>
  </div>
</div>
```

### Card con Header y Footer
```html
<div class="card">
  <div class="card-header bg-primary text-white">
    <h5 class="mb-0">Sesión #5</h5>
  </div>
  <div class="card-body">
    <p class="mb-2">
      <strong>Fecha:</strong> 18 de octubre, 2025
    </p>
    <p class="mb-0">
      <strong>Duración:</strong> 60 minutos
    </p>
  </div>
  <div class="card-footer">
    <div class="d-flex justify-content-end gap-2">
      <button class="btn btn-sm btn-outline-primary">
        <i class="bi bi-eye"></i>
        Ver
      </button>
      <button class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-pencil"></i>
        Editar
      </button>
    </div>
  </div>
</div>
```

### Sección Estilizada (Para Formularios)
```html
<div class="section-card">
  <div class="section-header">
    <h5>
      <i class="bi bi-person"></i>
      Información Personal
    </h5>
  </div>
  <div class="section-body">
    <!-- Contenido del formulario aquí -->
    <div class="mb-3">
      <label class="form-label">Nombre</label>
      <input type="text" class="form-control">
    </div>
  </div>
</div>
```

### Sección con Colores Temáticos
```html
<!-- Peligro / Importante -->
<div class="section-card">
  <div class="section-header header-danger">
    <h5>
      <i class="bi bi-exclamation-triangle"></i>
      Información Crítica
    </h5>
  </div>
  <div class="section-body">
    <!-- Contenido -->
  </div>
</div>

<!-- Éxito / Completado -->
<div class="section-card">
  <div class="section-header header-success">
    <h5>
      <i class="bi bi-check-circle"></i>
      Sesión Completada
    </h5>
  </div>
  <div class="section-body">
    <!-- Contenido -->
  </div>
</div>

<!-- Información -->
<div class="section-card">
  <div class="section-header header-info">
    <h5>
      <i class="bi bi-info-circle"></i>
      Datos Adicionales
    </h5>
  </div>
  <div class="section-body">
    <!-- Contenido -->
  </div>
</div>
```

---

## 🔔 Alertas

### Alerta Informativa
```html
<div class="alert alert-info d-flex align-items-center gap-2">
  <i class="bi bi-info-circle fs-5"></i>
  <div>
    Este paciente tiene 3 sesiones programadas para este mes.
  </div>
</div>
```

### Alerta de Éxito
```html
<div class="alert alert-success d-flex align-items-center gap-2">
  <i class="bi bi-check-circle fs-5"></i>
  <div>
    <strong>¡Guardado exitosamente!</strong>
    La información del paciente ha sido actualizada.
  </div>
</div>
```

### Alerta de Advertencia
```html
<div class="alert alert-warning d-flex align-items-center gap-2">
  <i class="bi bi-exclamation-triangle fs-5"></i>
  <div>
    <strong>Atención:</strong>
    Algunos campos obligatorios están incompletos.
  </div>
</div>
```

### Alerta de Error
```html
<div class="alert alert-danger d-flex align-items-center gap-2">
  <i class="bi bi-x-circle fs-5"></i>
  <div>
    <strong>Error:</strong>
    No se pudo guardar la información. Por favor intente nuevamente.
  </div>
</div>
```

---

## 🏷️ Badges / Insignias

### Badges de Estado
```html
<!-- Activo -->
<span class="badge bg-success">
  <i class="bi bi-check-circle"></i>
  Activo
</span>

<!-- En proceso -->
<span class="badge bg-primary">
  <i class="bi bi-clock-history"></i>
  En proceso
</span>

<!-- Pendiente -->
<span class="badge bg-warning text-dark">
  <i class="bi bi-hourglass-split"></i>
  Pendiente
</span>

<!-- Cerrado -->
<span class="badge bg-secondary">
  <i class="bi bi-archive"></i>
  Cerrado
</span>

<!-- Cancelado -->
<span class="badge bg-danger">
  <i class="bi bi-x-circle"></i>
  Cancelado
</span>
```

### Badges como Contador
```html
<button class="btn btn-outline-primary">
  Sesiones
  <span class="badge bg-primary ms-2">12</span>
</button>
```

---

## 📋 Listas y Tablas

### Lista de Items
```html
<div class="list-card">
  <div class="list-card-header">
    <h6>
      <i class="bi bi-calendar-event"></i>
      Sesión del 15 de octubre
    </h6>
    <span class="badge bg-success">Completada</span>
  </div>
  <div class="list-card-body">
    <p class="mb-2">
      <strong>Duración:</strong> 60 minutos
    </p>
    <p class="mb-0">
      <strong>Notas:</strong> El paciente muestra mejoras significativas...
    </p>
  </div>
</div>
```

### Tabla Simple
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title mb-3">Historial de Sesiones</h5>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Duración</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>18 Oct 2025</td>
            <td>60 min</td>
            <td><span class="badge bg-success">Completada</span></td>
            <td>
              <button class="btn btn-sm btn-outline-primary">
                <i class="bi bi-eye"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>11 Oct 2025</td>
            <td>60 min</td>
            <td><span class="badge bg-success">Completada</span></td>
            <td>
              <button class="btn btn-sm btn-outline-primary">
                <i class="bi bi-eye"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>25 Oct 2025</td>
            <td>60 min</td>
            <td><span class="badge bg-warning text-dark">Programada</span></td>
            <td>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="bi bi-pencil"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

---

## 🔍 Estados Especiales

### Campo de Solo Lectura
```html
<div class="readonly-view">
  <div class="readonly-field">
    <span class="readonly-label">
      <i class="bi bi-person"></i>
      Nombre del paciente
    </span>
    <div class="readonly-value">
      María García López
    </div>
  </div>

  <div class="readonly-field">
    <span class="readonly-label">
      <i class="bi bi-file-text"></i>
      Observaciones
    </span>
    <div class="readonly-value textarea-content">
      El paciente ha mostrado mejoras significativas en el manejo
      de situaciones de estrés. Se recomienda continuar con las
      técnicas de respiración practicadas.
    </div>
  </div>

  <div class="readonly-field">
    <span class="readonly-label">
      <i class="bi bi-check-circle"></i>
      Estado
    </span>
    <div class="readonly-value">
      <span class="readonly-badge">Activo</span>
    </div>
  </div>
</div>
```

### Campo Deshabilitado
```html
<div class="mb-3">
  <label class="form-label">Fecha de registro</label>
  <input 
    type="text" 
    class="form-control" 
    value="15 de octubre, 2025"
    disabled
  >
</div>
```

---

## 💡 Patrones Comunes

### Encabezado de Página
```html
<div class="d-flex justify-content-between align-items-center mb-4">
  <div>
    <h1 class="mb-2">Registro de Paciente</h1>
    <p class="text-muted mb-0">Complete la información básica del paciente</p>
  </div>
  <div class="d-flex gap-2">
    <button class="btn btn-outline-secondary">
      <i class="bi bi-arrow-left"></i>
      Volver
    </button>
    <button class="btn btn-primary">
      <i class="bi bi-save"></i>
      Guardar
    </button>
  </div>
</div>
```

### Grid Responsive
```html
<div class="row g-4">
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Card 1</h5>
        <p class="card-text">Contenido...</p>
      </div>
    </div>
  </div>
  
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Card 2</h5>
        <p class="card-text">Contenido...</p>
      </div>
    </div>
  </div>
  
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Card 3</h5>
        <p class="card-text">Contenido...</p>
      </div>
    </div>
  </div>
</div>
```

### Subsección con Borde
```html
<div class="subsection">
  <h6>
    <i class="bi bi-hospital"></i>
    Antecedentes Médicos
  </h6>
  
  <div class="mb-3">
    <label class="form-label">Enfermedades crónicas</label>
    <input type="text" class="form-control">
  </div>
  
  <div class="mb-3">
    <label class="form-label">Medicamentos actuales</label>
    <textarea class="form-control" rows="3"></textarea>
  </div>
</div>
```

---

## 🎨 Clases Útiles

### Espaciado
```html
<!-- Márgenes -->
<div class="mb-2">Margen inferior pequeño (8px)</div>
<div class="mb-4">Margen inferior estándar (16px)</div>
<div class="mb-6">Margen inferior grande (24px)</div>

<!-- Padding -->
<div class="p-4">Padding estándar (16px) en todos los lados</div>
<div class="px-4 py-2">Padding horizontal 16px, vertical 8px</div>

<!-- Gaps (espaciado entre elementos flex)  -->
<div class="d-flex gap-2">
  <button class="btn btn-primary">Botón 1</button>
  <button class="btn btn-secondary">Botón 2</button>
</div>
```

### Tipografía
```html
<!-- Tamaños -->
<p class="fs-1">Texto muy grande</p>
<p class="fs-5">Texto mediano</p>
<small class="d-block">Texto pequeño</small>

<!-- Pesos -->
<p class="fw-normal">Texto normal (400)</p>
<p class="fw-medium">Texto medium (500)</p>
<p class="fw-semibold">Texto semibold (600)</p>
<p class="fw-bold">Texto bold (700)</p>

<!-- Colores -->
<p class="text-primary">Texto azul primario</p>
<p class="text-success">Texto verde éxito</p>
<p class="text-danger">Texto rojo error</p>
<p class="text-muted">Texto gris apagado</p>
```

---

## ✅ Checklist de Calidad

Al crear un nuevo componente, verifica:

- [ ] ¿Usa clases de Bootstrap cuando sea posible?
- [ ] ¿Los colores vienen de las variables CSS definidas?
- [ ] ¿El espaciado es consistente (múltiplos de 8px)?
- [ ] ¿Los botones tienen iconos cuando es apropiado?
- [ ] ¿Las labels de formulario son descriptivas?
- [ ] ¿Hay feedback visual para interacciones (hover, focus)?
- [ ] ¿Es responsive (se ve bien en móvil)?
- [ ] ¿Los campos obligatorios están marcados?
- [ ] ¿Hay mensajes de ayuda cuando es necesario?
- [ ] ¿El contraste de colores es suficiente?

---

**Nota**: Todos estos ejemplos usan el sistema de diseño definido en `_design-tokens.scss` y aplicado en `styles.scss`. Los estilos se aplicarán automáticamente sin necesidad de CSS adicional.


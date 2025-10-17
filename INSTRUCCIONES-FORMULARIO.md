# Formulario de Registro de Paciente Adulto

## Descripción
Se ha implementado un formulario completo de registro de datos generales para pacientes adultos según las especificaciones del proyecto, con un sistema de **Stepper/Wizard** para mejorar la experiencia del usuario y eliminar el scroll vertical excesivo.

## ⭐ Actualización: Sistema Stepper/Wizard
El formulario ahora utiliza un **wizard paso a paso** que:
- ✅ Muestra una sección a la vez (sin scroll vertical)
- ✅ Indica el progreso con barra visual y pasos numerados
- ✅ Valida cada paso antes de permitir avanzar
- ✅ Permite navegación flexible entre pasos
- ✅ Es completamente responsive (móvil, tablet, desktop)
- ✅ **Solo 5 pasos** para completar (reducido de 8)

Ver detalles completos en:
- [STEPPER-IMPLEMENTATION.md](./STEPPER-IMPLEMENTATION.md)
- [UNIFICACION-STEPS.md](./UNIFICACION-STEPS.md)

## Estructura del Formulario (5 Pasos)

El formulario está dividido en 5 pasos principales:

### Paso 1: **Información Personal** 📋
- Nombre completo (máx. 200 caracteres)
- Fecha de nacimiento (con cálculo automático de edad)
- Edad (calculada automáticamente)
- Sexo (Masculino/Femenino)
- Tipo de identificación (CC, CE, PA, TI, RC)
- Número de identificación (máx. 20 caracteres)
- Lugar de nacimiento (máx. 100 caracteres)

### Paso 2: **Información de Contacto** 📍
- Dirección de residencia (máx. 200 caracteres)
- Municipio (máx. 100 caracteres)
- Barrio (máx. 100 caracteres)
- Estrato socioeconómico (1-6)
- Teléfono (máx. 20 caracteres)

### Paso 3: **Información Civil y Educativa** 🎓
- Estado civil (Soltero/Casado/Unión libre/Separado/Viudo)
- Nivel de escolaridad (con opciones completa/incompleta para cada nivel)
- Ocupación (Estudiante/Empleado/Independiente/Desempleado/Hogar/Otro)
- Otra ocupación (solo si selecciona "Otro", máx. 100 caracteres)
- Institución donde estudia o trabaja (opcional, máx. 150 caracteres)

### Paso 4: **Salud e Historia Clínica** 🏥 (Unificado)
Este paso agrupa 4 subsecciones relacionadas:

#### 4.1 Información de Salud
- ¿Cuenta con servicio de salud? (Sí/No)
- Nombre del servicio de salud (máx. 150 caracteres, condicional)
- Tipo de vinculación (Cotizante/Beneficiario, condicional)
- ¿Consume medicamentos? (Sí/No)
- ¿Cuáles medicamentos? (máx. 500 caracteres, condicional)

#### 4.2 Información de Remisión
- ¿Fue remitido? (Sí/No)
- ¿Por quién fue remitido? (máx. 150 caracteres, condicional)
- Motivo de remisión (máx. 500 caracteres, condicional)

#### 4.3 Atención Psicológica Anterior
- ¿Ha recibido atención psicológica anteriormente? (Sí/No)
- ¿Dónde? (máx. 200 caracteres, condicional)
- Duración del tratamiento (máx. 100 caracteres, condicional)
- Motivo por el cual terminó (máx. 500 caracteres, condicional)

#### 4.4 Atención Psiquiátrica Anterior
- ¿Ha recibido atención psiquiátrica anteriormente? (Sí/No)
- ¿Dónde? (máx. 200 caracteres, condicional)
- Duración del tratamiento (máx. 100 caracteres, condicional)
- Motivo por el cual terminó (máx. 500 caracteres, condicional)

### Paso 5: **Contacto de Emergencia** 🆘
- Nombre del contacto (máx. 200 caracteres)
- Teléfono del contacto (máx. 20 caracteres)

## Características Implementadas

### Validaciones
- Todos los campos obligatorios están marcados con asterisco rojo (*)
- Validación en tiempo real con retroalimentación visual (bordes rojos y mensajes de error)
- Campos condicionales que aparecen/desaparecen según las selecciones del usuario
- Longitud máxima configurada para cada campo según las mejores prácticas clínicas

### Experiencia de Usuario
- **Diseño responsivo**: Optimizado para pantallas de 10-14 pulgadas y adaptable a móviles
- **Interfaz limpia**: Usando Bootstrap 5 con colores y espaciado consistentes
- **Feedback visual**: Indicadores claros de validación y estado del formulario
- **Cálculo automático**: La edad se calcula automáticamente al ingresar la fecha de nacimiento
- **Campos condicionales**: Solo se muestran campos relevantes según las respuestas
- **Progreso visible**: Indicador del estado del formulario (completo/incompleto)

### Funcionalidades
- **Guardar borrador**: Permite guardar el progreso sin completar todo
- **Registro completo**: Botón deshabilitado hasta que todos los campos requeridos estén completos
- **Gestión de estado**: Usando Angular Signals para una gestión reactiva del estado

## Tecnologías Utilizadas

- **Angular 20**: Framework principal
- **Bootstrap 5**: Sistema de diseño y componentes UI
- **Reactive Forms**: Para manejo robusto de formularios
- **TypeScript**: Tipado fuerte y seguridad de tipos
- **Signals**: Para gestión reactiva del estado

## Arquitectura

### Componentes
```
adult-patient-registration.component (Componente principal)
├── personal-info-section
├── contact-info-section
├── civil-educational-section
├── health-info-section
├── referral-info-section
├── psychological-attention-section
├── psychiatric-attention-section
└── emergency-contact-section
```

### Modelos
- `patient.model.ts`: Contiene todas las interfaces y tipos TypeScript

## Cómo Ejecutar

1. Instalar dependencias (si no se han instalado):
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm start
```

3. Abrir en el navegador:
```
http://localhost:4200
```

El formulario se cargará automáticamente en la ruta principal.

## Rutas Configuradas

- `/` → Redirige a `/pacientes/registro-adulto`
- `/pacientes/registro-adulto` → Formulario de registro de paciente adulto

## Mejores Prácticas Aplicadas

### Angular
✅ Componentes standalone
✅ Signals para gestión de estado
✅ input() y output() para comunicación entre componentes
✅ ChangeDetectionStrategy.OnPush para optimización
✅ Control flow nativo (@if, @for)
✅ Lazy loading para componentes

### Bootstrap
✅ Grid system para layouts responsivos
✅ Componentes nativos (cards, forms, buttons, alerts)
✅ Utility classes para espaciado y tipografía
✅ Diseño mobile-first

### UX/UI
✅ Jerarquía visual clara
✅ Retroalimentación inmediata al usuario
✅ Accesibilidad con labels y ARIA
✅ Diseño consistente y limpio
✅ Optimizado para pantallas pequeñas

## Próximos Pasos

### Backend Integration (Pendiente)
- Implementar servicio para comunicación con API REST
- Agregar manejo de errores y respuestas del servidor
- Implementar guardado de borradores
- Implementar envío final del formulario

### Funcionalidades Adicionales Sugeridas
- Autoguardado cada cierto tiempo
- Validación de números de teléfono colombianos
- Validación de números de identificación
- Confirmación antes de enviar
- Indicador de progreso por sección
- Navegación entre secciones con botones Anterior/Siguiente
- Exportar datos a PDF

## Notas Técnicas

- Los campos de texto tienen límites de caracteres configurados según estándares médicos
- Los campos condicionales usan validación dinámica
- La edad se recalcula automáticamente si se cambia la fecha de nacimiento
- El formulario está optimizado para ser usado en sesiones largas sin pérdida de datos
- Los estilos son minimalistas para facilitar la concentración en la tarea

## Soporte

Para cualquier problema o sugerencia, revisar el código en:
- `/src/app/components/patient-registration/`
- `/src/app/models/patient.model.ts`


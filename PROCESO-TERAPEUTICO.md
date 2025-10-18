# Sistema de Proceso Terapéutico

## Descripción General

El sistema de proceso terapéutico permite registrar y gestionar todo el ciclo de atención psicológica de un paciente, desde el motivo de consulta inicial hasta el cierre del proceso, pasando por cada sesión individual.

## Componentes

### 1. Motivo de Consulta
Registra la información inicial del proceso terapéutico:
- **Motivo de la consulta** (requerido): Campo de texto largo para describir el motivo principal de la consulta (máx. 1000 caracteres)
- **Código CIE-10** (opcional): Clasificación Internacional de Enfermedades
- **Código DSM-5** (opcional): Manual Diagnóstico y Estadístico
- **Descripción de la situación actual** (requerido): Descripción detallada de cómo la situación afecta diferentes áreas de la vida del paciente, redes de apoyo disponibles y estrategias intentadas (máx. 5000 caracteres)

### 2. Registro de Sesiones
Permite agregar, editar y eliminar sesiones individuales:

**Por cada sesión se registra:**
- **Número de sesión**: Auto-generado y secuencial
- **Fecha**: Fecha de la sesión (requerido)
- **Hora**: Hora de la sesión (requerido)
- **Objetivos/Técnicas - Instrumentos**: Descripción de objetivos, técnicas e instrumentos utilizados (requerido, máx. 2000 caracteres)
- **Descripción de la sesión**: Descripción detallada de lo ocurrido (requerido, máx. 5000 caracteres)

**Características:**
- Se pueden agregar múltiples sesiones
- Las sesiones se numeran automáticamente
- Se puede editar cualquier sesión existente
- Se puede eliminar una sesión (con confirmación)
- Al eliminar una sesión, las restantes se renumeran automáticamente
- Muestra un resumen de cada sesión registrada

### 3. Cierre del Proceso
Registra el cierre del proceso terapéutico con campos condicionales según el estado final:

**Estado Final del Proceso:**

1. **Concluye**: El proceso terapéutico se completó satisfactoriamente
   - ¿Se le hizo seguimiento al paciente? (Sí/No)
   - Si Sí: Periodo de seguimiento (1m/3m/6m/1a)

2. **Deserta**: El paciente abandonó el proceso sin concluir
   - Periodo de seguimiento realizado (1m/3m/6m/1a) - requerido

3. **Va y vuelve**: El paciente retorna después de haber abandonado o completado un proceso previo
   - ¿Conoce si el paciente presentó recaídas? (Sí/No)

4. **Remisión**: El paciente es referido a otro profesional o servicio
   - ¿Se presentó una mejora en su situación? (Sí/No)

**Campos comunes para todos los estados:**
- **Observaciones** (requerido): Observaciones importantes sobre el proceso (máx. 5000 caracteres)
- **Recomendaciones** (requerido): Recomendaciones para el paciente, profesionales, familia, etc. (máx. 5000 caracteres)

## Flujo de Trabajo

### Navegación por Pestañas (Tabs)
El proceso está organizado en 3 pestañas principales que puede acceder en cualquier momento:

1. **Motivo de Consulta** - Se registra al iniciar el proceso
2. **Sesiones** - Se agregan conforme ocurren las citas
3. **Cierre del Proceso** - Se completa al finalizar el proceso

**Características de la navegación:**
- ✅ Acceso directo a cualquier pestaña en cualquier momento
- ✅ Indicadores visuales de completitud (✓)
- ✅ Contador de sesiones registradas
- ✅ No hay orden obligatorio, pero se recomienda completar el motivo primero

### Opciones de Guardado

El sistema ofrece flexibilidad para guardar en diferentes momentos:

- **Guardar Borrador**: Guarda el progreso actual sin validar completitud (disponible siempre)
- **Guardar Proceso en Curso**: Disponible cuando se han completado el motivo de consulta y al menos una sesión. Permite continuar agregando sesiones posteriormente sin cerrar el proceso
- **Finalizar y Cerrar Proceso**: Guarda el proceso completo con cierre. Requiere motivo, sesiones y cierre completos

### Validaciones

- **Motivo de Consulta**: Validado cuando se completan el motivo y la descripción de situación
- **Registro de Sesiones**: Validado cuando se registra al menos una sesión completa
- **Cierre del Proceso**: Validado cuando se completan todos los campos requeridos según el estado seleccionado

## Rutas

- `/proceso-terapeutico`: Crear un nuevo proceso terapéutico
- `/proceso-terapeutico/:patientId`: Crear un proceso asociado a un paciente específico

## Modelos de Datos

### TherapeuticProcess
```typescript
interface TherapeuticProcess {
  patientId?: string;
  consultationMotive: ConsultationMotive;
  sessions: Session[];
  closure?: ProcessClosure;
  createdAt?: string;
  updatedAt?: string;
}
```

### ConsultationMotive
```typescript
interface ConsultationMotive {
  reason: string;
  cieCode?: string;
  dsmCode?: string;
  situationDescription: string;
}
```

### Session
```typescript
interface Session {
  sessionNumber: number;
  date: string;
  time: string;
  objectivesAndTechniques: string;
  sessionDescription: string;
}
```

### ProcessClosure
```typescript
interface ProcessClosure {
  closureInfo: ProcessClosureInfo; // Union type según estado
  observations: string;
  recommendations: string;
}
```

## Mejores Prácticas

1. **Completar el motivo de consulta primero**: Es el punto de partida esencial para el proceso
2. **Registrar sesiones inmediatamente**: Registre cada sesión lo antes posible para no olvidar detalles
3. **Usar códigos diagnósticos cuando sea apropiado**: Ayuda a estandarizar y categorizar casos
4. **Guardar borradores frecuentemente**: Evita pérdida de información
5. **Completar el cierre cuando corresponda**: Cierra formalmente el proceso terapéutico
6. **Utilizar "Guardar sin Cierre"**: Para procesos en curso que necesitan ser guardados pero no han finalizado

## Características Técnicas

- **Arquitectura**: Componentes standalone de Angular con signals para gestión de estado reactivo
- **Formularios**: Reactive Forms con validaciones personalizadas
- **Navegación**: Sistema de tabs de Bootstrap con acceso directo a todas las secciones
- **Estilos**: Bootstrap 5 con estilos personalizados para mantener consistencia
- **Responsivo**: Optimizado para pantallas de 10-14 pulgadas, con soporte móvil
- **Validación en tiempo real**: Feedback inmediato en campos de formulario
- **Change Detection**: OnPush strategy para mejor rendimiento
- **Indicadores visuales**: Badges y checkmarks para mostrar progreso y completitud

## Futuras Mejoras

- Integración con API REST para persistencia de datos
- Búsqueda y filtrado de procesos
- Exportación de procesos a PDF
- Gráficos y estadísticas de progreso
- Plantillas de sesiones frecuentes
- Notificaciones y recordatorios de sesiones
- Vinculación automática con el paciente registrado


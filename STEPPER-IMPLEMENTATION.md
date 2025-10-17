# Implementación del Stepper/Wizard

## Resumen

Se ha implementado exitosamente un componente stepper (wizard) para mejorar la experiencia del usuario al completar el formulario de registro de pacientes adultos. Esto elimina el scroll vertical excesivo y permite una navegación más intuitiva por pasos.

## Características Implementadas

### 1. **Componente Stepper Reutilizable**
Ubicación: `/src/app/components/shared/stepper/`

#### Funcionalidades:
- **Indicador Visual de Progreso**: Barra de progreso que muestra el porcentaje completado
- **Navegación por Pasos**: Números circulares que muestran cada paso
- **Estados Visuales**:
  - ✅ **Completado**: Círculo verde con check
  - 🔵 **Activo**: Círculo azul con número
  - ⚪ **Pendiente**: Círculo gris con número
- **Conectores**: Líneas entre pasos que cambian de color según el estado
- **Navegación Inteligente**: 
  - Solo permite avanzar si el paso actual es válido
  - Permite regresar a pasos anteriores
  - Click en pasos para navegar (si están disponibles)

#### Botones de Navegación:
- **Anterior**: Volver al paso previo (deshabilitado en el primer paso)
- **Siguiente**: Avanzar al siguiente paso (deshabilitado si el paso actual no es válido)
- **Finalizar**: En el último paso cambia el texto del botón

### 2. **Integración con el Formulario de Registro**

#### 8 Pasos del Formulario:
1. 📋 **Información Personal** (Nombre, edad, sexo, identificación)
2. 📍 **Información de Contacto** (Dirección, municipio, teléfono)
3. 🎓 **Civil y Educativa** (Estado civil, escolaridad, ocupación)
4. 🏥 **Información de Salud** (EPS, medicamentos)
5. 📨 **Remisión** (Si fue remitido y por quién)
6. 🧠 **Atención Psicológica** (Atención anterior)
7. 💊 **Atención Psiquiátrica** (Atención anterior)
8. 🆘 **Contacto de Emergencia** (Nombre y teléfono de contacto)

### 3. **Validación por Pasos**

Cada paso valida sus campos en tiempo real:
- Los campos obligatorios deben completarse antes de avanzar
- El botón "Siguiente" se deshabilita si el paso no es válido
- Mensaje de advertencia visible cuando faltan campos
- Indicador visual en el stepper (paso sin completar vs completado)

### 4. **Experiencia de Usuario Mejorada**

#### Ventajas:
- ✅ **Sin scroll vertical**: Cada paso ocupa solo el espacio visible
- ✅ **Enfoque**: El usuario se concentra en una sección a la vez
- ✅ **Progreso visible**: Barra y pasos completados muestran el avance
- ✅ **Navegación flexible**: Puede ir y volver entre pasos
- ✅ **Validación clara**: Sabe exactamente qué falta completar
- ✅ **Responsive**: Adaptado para móviles y tablets

#### Diseño Responsivo:
- **Desktop**: Muestra todos los pasos con etiquetas completas
- **Tablet**: Etiquetas más compactas, scroll horizontal si es necesario
- **Mobile**: Solo muestra círculos numerados, etiquetas ocultas

## Arquitectura Técnica

### Componente Stepper
```typescript
StepperComponent
├── Inputs:
│   └── steps: Step[] (array de pasos)
├── Outputs:
│   └── stepChange: number (índice del paso actual)
├── Signals:
│   ├── currentStepIndex: signal<number>
│   ├── currentStep: computed<Step>
│   ├── isFirstStep: computed<boolean>
│   ├── isLastStep: computed<boolean>
│   └── progressPercentage: computed<number>
└── Methods:
    ├── goToStep(index: number)
    ├── nextStep()
    ├── previousStep()
    └── canNavigateToStep(index: number)
```

### Interface Step
```typescript
interface Step {
  id: string;           // Identificador único
  label: string;        // Etiqueta visible
  completed: boolean;   // Si el paso se completó
  valid: boolean;       // Si el paso es válido
}
```

### Gestión de Estado
El componente principal usa:
- **Signals** para el estado reactivo
- **Computed** para valores derivados
- **Validaciones automáticas** al cambiar datos

```typescript
stepValidations = signal({
  personalInfo: false,
  contactInfo: false,
  civilEducationalInfo: false,
  healthInfo: false,
  referralInfo: false,
  psychologicalAttention: false,
  psychiatricAttention: false,
  emergencyContact: false,
});
```

## Estilos y Diseño

### Colores del Stepper:
- **Activo**: Azul (#0d6efd) - Paso actual
- **Completado**: Verde (#198754) - Paso terminado
- **Pendiente**: Gris (#6c757d) - Paso sin completar
- **Conectores**: Gris/Verde según el estado

### Animaciones:
- Transiciones suaves en los cambios de estado
- Hover effects en los pasos clicables
- Escala al hover en círculos de paso
- Barra de progreso animada

### Accesibilidad:
- Roles ARIA apropiados
- Atributos aria-valuenow en la barra de progreso
- Navegación por teclado (puede mejorarse)
- Indicadores visuales claros

## Cómo Usar el Componente Stepper

### Uso Básico:
```html
<app-stepper [steps]="steps()" (stepChange)="onStepChange($event)">
  @if (isStepVisible(0)) {
    <!-- Contenido del paso 1 -->
  }
  @if (isStepVisible(1)) {
    <!-- Contenido del paso 2 -->
  }
  <!-- Más pasos... -->
</app-stepper>
```

### En el Componente TypeScript:
```typescript
steps = computed<Step[]>(() => [
  {
    id: 'step1',
    label: 'Primer Paso',
    completed: this.isStep1Completed(),
    valid: this.isStep1Valid(),
  },
  // Más pasos...
]);

onStepChange(stepIndex: number) {
  this.currentStepIndex.set(stepIndex);
}

isStepVisible(stepIndex: number): boolean {
  return this.currentStepIndex() === stepIndex;
}
```

## Mejoras Futuras Sugeridas

### Funcionalidades:
1. **Autoguardado**: Guardar automáticamente al completar cada paso
2. **Navegación por URL**: Reflejar el paso actual en la URL
3. **Teclado**: Mejorar navegación con teclas (←→)
4. **Resumen final**: Mostrar un resumen antes de enviar
5. **Animaciones de transición**: Entre pasos para mayor fluidez
6. **Indicador de tiempo**: Estimar tiempo restante
7. **Ayuda contextual**: Tips por paso
8. **Móvil**: Gestos swipe para navegar

### Optimizaciones:
1. **Lazy loading**: Cargar componentes de pasos bajo demanda
2. **Caché**: Mantener estado entre navegaciones
3. **Validación asíncrona**: Para campos que requieren verificación en backend
4. **Animaciones de entrada/salida**: Para transiciones más suaves

## Testing

### Para Probar:
1. Ejecutar `npm start`
2. Navegar a `/pacientes/registro-adulto`
3. Verificar:
   - ✅ No se puede avanzar sin completar campos obligatorios
   - ✅ La barra de progreso se actualiza correctamente
   - ✅ Los pasos cambian de color según el estado
   - ✅ Los botones Anterior/Siguiente funcionan
   - ✅ Se puede hacer click en pasos anteriores
   - ✅ Responsive en diferentes tamaños de pantalla

### Casos de Prueba:
- [ ] Completar todos los pasos y registrar
- [ ] Intentar avanzar sin completar un paso
- [ ] Navegar entre pasos hacia atrás
- [ ] Editar un paso ya completado
- [ ] Guardar borrador en medio del proceso
- [ ] Probar en móvil (< 768px)
- [ ] Probar en tablet (768px - 1024px)
- [ ] Probar en desktop (> 1024px)

## Notas de Implementación

### Decisiones de Diseño:
1. **Por qué usar signals**: Mejor rendimiento y reactividad en Angular 20
2. **Por qué 8 pasos**: Agrupa campos relacionados lógicamente
3. **Por qué validación por paso**: Mejora UX y reduce errores
4. **Por qué mantener las cards**: Mejor organización visual del contenido

### Compatibilidad:
- Angular 20+
- Bootstrap 5.3+
- Bootstrap Icons 1.11+
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

## Conclusión

La implementación del stepper ha mejorado significativamente la experiencia del usuario:
- ✅ Elimina scroll vertical excesivo
- ✅ Organiza el formulario de manera lógica
- ✅ Proporciona feedback visual claro
- ✅ Facilita la navegación
- ✅ Es totalmente responsive

El componente es reutilizable y puede aplicarse a otros formularios largos en la aplicación.


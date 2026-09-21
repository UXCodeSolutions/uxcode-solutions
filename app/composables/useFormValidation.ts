// useFormValidation.ts — Composable de validación de formulario de contacto
// Valida en tiempo real tras la primera interacción con cada campo.
// Mensajes de error en español, integrado con aria-invalid y aria-describedby.

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string // Campo trampa anti-spam, siempre vacío
}

interface FormErrors {
  name: string
  email: string
  subject: string
  message: string
}

export const useFormValidation = () => {
  const form = reactive<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  })

  const errors = reactive<FormErrors>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Rastrear qué campos el usuario ya tocó (para no mostrar error antes de tiempo)
  const touched = reactive({ name: false, email: false, subject: false, message: false })

  // ── Reglas de validación ──────────────────────────────────────────────────
  const validateName = () => {
    if (!form.name.trim()) return 'Escribe tu nombre (mínimo 2 caracteres)'
    if (form.name.trim().length < 2) return 'Escribe tu nombre (mínimo 2 caracteres)'
    return ''
  }

  const validateEmail = () => {
    if (!form.email.trim()) return 'Ingresa un correo válido'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(form.email)) return 'Ingresa un correo válido'
    return ''
  }

  const validateMessage = () => {
    if (!form.message.trim()) return 'Cuéntanos un poco más (mínimo 10 caracteres)'
    if (form.message.trim().length < 10) return 'Cuéntanos un poco más (mínimo 10 caracteres)'
    return ''
  }

  // Validar un campo específico y actualizar su error
  const validateField = (field: keyof FormErrors) => {
    if (field === 'name') errors.name = validateName()
    else if (field === 'email') errors.email = validateEmail()
    else if (field === 'message') errors.message = validateMessage()
  }

  // Marcar campo como tocado y validar inmediatamente
  const onBlur = (field: keyof typeof touched) => {
    touched[field] = true
    validateField(field as keyof FormErrors)
  }

  // Validar mientras escribe (solo si ya tocó el campo)
  const onInput = (field: keyof typeof touched) => {
    if (touched[field]) validateField(field as keyof FormErrors)
  }

  // Validar todos los campos y devolver si el formulario es válido
  const validateAll = (): boolean => {
    // Marcar todos como tocados
    Object.keys(touched).forEach((k) => { (touched as any)[k] = true })
    errors.name = validateName()
    errors.email = validateEmail()
    errors.message = validateMessage()
    return !errors.name && !errors.email && !errors.message
  }

  // El formulario es válido si no hay errores y los campos requeridos tienen contenido
  const isValid = computed(() =>
    !errors.name && !errors.email && !errors.message &&
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.message.trim().length >= 10
  )

  const resetForm = () => {
    form.name = ''; form.email = ''; form.subject = ''; form.message = ''; form.honeypot = ''
    errors.name = ''; errors.email = ''; errors.subject = ''; errors.message = ''
    Object.keys(touched).forEach((k) => { (touched as any)[k] = false })
  }

  return { form, errors, touched, isValid, onBlur, onInput, validateAll, resetForm }
}

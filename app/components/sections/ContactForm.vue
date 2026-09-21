<!-- ContactForm.vue — Formulario de contacto con validación en tiempo real -->
<template>
  <div class="contact-form-wrapper">
    <!-- Estado de éxito -->
    <div v-if="success" class="contact-form__success fade-in">
      <div class="contact-form__success-icon">
        <UiIconsIconCheck :size="48" />
      </div>
      <h3 class="contact-form__success-title">{{ $t('contactPage.form.successTitle') }}</h3>
      <p class="contact-form__success-text">{{ $t('contactPage.form.successText') }}</p>
      <UiBaseButton to="/" variant="secondary" class="contact-form__success-cta">
        {{ $t('contactPage.form.successCta') }}
      </UiBaseButton>
    </div>

    <!-- Formulario -->
    <form v-else class="contact-form" @submit.prevent="handleSubmit" novalidate>
      <!-- Error general / de red -->
      <div v-if="submitError" class="contact-form__alert" role="alert">
        <strong>{{ $t('contactPage.form.errorTitle') }}:</strong> {{ submitError }}
      </div>

      <!-- Nombre -->
      <div class="form-group">
        <label for="name" class="form-label">{{ $t('contactPage.form.name') }}</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="form-input"
          :class="{ 'form-input--error': errors.name, 'form-input--valid': touched.name && !errors.name }"
          :placeholder="$t('contactPage.form.namePlaceholder')"
          :aria-invalid="!!errors.name"
          aria-describedby="name-error"
          @blur="onBlur('name')"
          @input="onInput('name')"
          required
        />
        <span v-if="errors.name" id="name-error" class="form-error" aria-live="polite">{{ errors.name }}</span>
      </div>

      <!-- Correo -->
      <div class="form-group">
        <label for="email" class="form-label">{{ $t('contactPage.form.email') }}</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="form-input"
          :class="{ 'form-input--error': errors.email, 'form-input--valid': touched.email && !errors.email }"
          :placeholder="$t('contactPage.form.emailPlaceholder')"
          :aria-invalid="!!errors.email"
          aria-describedby="email-error"
          @blur="onBlur('email')"
          @input="onInput('email')"
          required
        />
        <span v-if="errors.email" id="email-error" class="form-error" aria-live="polite">{{ errors.email }}</span>
      </div>

      <!-- Motivo -->
      <div class="form-group">
        <label for="subject" class="form-label">{{ $t('contactPage.form.subject') }}</label>
        <div class="select-wrapper">
          <select id="subject" v-model="form.subject" class="form-select">
            <option value="" disabled>{{ $t('contactPage.form.subjectPlaceholder') }}</option>
            <option value="prueba">{{ $t('contactPage.form.subjectOptions.prueba') }}</option>
            <option value="medida">{{ $t('contactPage.form.subjectOptions.medida') }}</option>
            <option value="renta">{{ $t('contactPage.form.subjectOptions.renta') }}</option>
            <option value="otro">{{ $t('contactPage.form.subjectOptions.otro') }}</option>
          </select>
          <svg class="select-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      <!-- Mensaje -->
      <div class="form-group">
        <label for="message" class="form-label">
          {{ $t('contactPage.form.message') }}
          <span class="form-char-count" :class="{ 'form-char-count--error': form.message.length < 10 && touched.message }">
            {{ form.message.length }} {{ $t('contactPage.form.charCount') }}
          </span>
        </label>
        <textarea
          id="message"
          v-model="form.message"
          rows="5"
          class="form-textarea"
          :class="{ 'form-input--error': errors.message, 'form-input--valid': touched.message && !errors.message }"
          :placeholder="$t('contactPage.form.messagePlaceholder')"
          :aria-invalid="!!errors.message"
          aria-describedby="message-error"
          @blur="onBlur('message')"
          @input="onInput('message')"
          required
        />
        <span v-if="errors.message" id="message-error" class="form-error" aria-live="polite">{{ errors.message }}</span>
      </div>

      <!-- Honeypot (Oculto) -->
      <div class="form-group form-group--hidden" aria-hidden="true">
        <label for="bot-field">Do not fill this out</label>
        <input id="bot-field" v-model="form.honeypot" type="text" tabindex="-1" />
      </div>

      <!-- Submit -->
      <UiBaseButton
        type="submit"
        variant="primary"
        :loading="isSubmitting"
        :disabled="isSubmitting || (Object.values(touched).some(v => v) && !isValid)"
        class="form-submit"
      >
        {{ isSubmitting ? $t('contactPage.form.sending') : $t('contactPage.form.submit') }}
      </UiBaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { form, errors, touched, isValid, onBlur, onInput, validateAll } = useFormValidation()

const isSubmitting = ref(false)
const success = ref(false)
const submitError = ref('')

// Preseleccionar opciones según query params (?motivo=prueba&sistema=dokko&mensaje=...)
onMounted(() => {
  const { motivo, sistema, mensaje } = route.query
  if (motivo && ['prueba', 'medida', 'renta', 'otro'].includes(motivo as string)) {
    form.subject = motivo as string
  }
  
  if (mensaje) {
    form.message = decodeURIComponent(mensaje as string)
  } else if (sistema === 'dokko') {
    form.message = 'Hola, quiero probar Dokko durante 15 días.\n\n'
  }
})

const handleSubmit = async () => {
  if (!validateAll()) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    const res = await $fetch('/api/contact', {
      method: 'POST',
      body: form
    })

    if (res && res.ok) {
      success.value = true
    } else {
      submitError.value = 'El servidor rechazó la petición.'
    }
  } catch (err: any) {
    submitError.value = err.data?.message || err.message || 'Error de conexión.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-form-wrapper {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 2rem;
  box-shadow: var(--shadow-card);
}

@media (min-width: 768px) { .contact-form-wrapper { padding: 3rem; } }

/* ── Elementos del formulario ── */
.form-group { margin-bottom: 1.5rem; }
.form-group--hidden { display: none; }

.form-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-char-count { font-size: 0.8rem; font-weight: 400; color: var(--text-muted); }
.form-char-count--error { color: var(--danger); }

.form-input, .form-select, .form-textarea {
  width: 100%;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-input);
  padding: 1rem 1.25rem;
  color: var(--text);
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-textarea { resize: vertical; min-height: 120px; }

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0,212,212,0.15);
}

/* Select customizado */
.select-wrapper { position: relative; }
.form-select { appearance: none; padding-right: 3rem; cursor: pointer; }
.select-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-muted);
}

/* Validaciones */
.form-input--error, .form-textarea--error { border-color: var(--danger); }
.form-input--error:focus, .form-textarea--error:focus { box-shadow: 0 0 0 2px rgba(255,92,108,0.15); }

.form-error { display: block; font-size: 0.85rem; color: var(--danger); margin-top: 0.5rem; }

.form-submit { width: 100%; margin-top: 1rem; }

.contact-form__alert {
  background: rgba(255,92,108,0.1);
  border: 1px solid var(--danger);
  color: #fff;
  padding: 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

/* ── Estado de éxito ── */
.contact-form__success {
  text-align: center;
  padding-block: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-form__success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(46,230,166,0.1);
  color: var(--success);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  border: 2px solid var(--success);
}

.contact-form__success-icon svg {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: checkDraw 0.6s ease forwards 0.2s;
}

.contact-form__success-title { font-size: var(--fs-h3); margin-bottom: 0.5rem; }
.contact-form__success-text { color: var(--text-muted); margin-bottom: 2.5rem; }
</style>

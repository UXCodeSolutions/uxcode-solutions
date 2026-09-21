<!-- ServiceWizard.vue — Asistente interactivo basado en Industrias -->
<template>
  <section class="service-wizard section" aria-labelledby="wizard-title">
    <div class="container">
      <UiSectionTitle
        id="wizard-title"
        :pre="$t('serviceWizard.title_pre')"
        :accent="$t('serviceWizard.title_accent')"
        :post="$t('serviceWizard.title_post')"
        subtitle="Selecciona tu industria y descubre qué solución tecnológica se adapta mejor a tu negocio."
        center
        class="mb-5"
        v-reveal
      />

      <div class="wizard__container">
        <Transition name="fade-slide" mode="out-in">
          
          <!-- Estado 1: Elegir Industria -->
          <div v-if="wizardStep === 'industry'" class="wizard__step" key="step-1">
            <h3 class="wizard__question">¿Cuál es el giro de tu negocio?</h3>
            
            <div class="wizard__options wizard__grid">
              <button
                v-for="ind in industries"
                :key="ind.id"
                class="wizard__option wizard__option--card"
                @click="selectIndustry(ind)"
              >
                <div class="wizard__icon-wrap">
                  <component :is="getIcon(ind.icon)" :size="32" />
                </div>
                <span class="wizard__option-text">{{ ind.text }}</span>
              </button>
            </div>
          </div>

          <!-- Estado 2: Necesidad Específica (Según Industria) -->
          <div v-else-if="wizardStep === 'need'" class="wizard__step" key="step-2">
            <button class="wizard__back-btn" @click="goBack" aria-label="Volver">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              Atrás
            </button>

            <h3 class="wizard__question">{{ currentNeedQuestion }}</h3>
            
            <div class="wizard__options">
              <button
                v-for="opt in currentNeedOptions"
                :key="opt.id"
                class="wizard__option"
                @click="selectNeed(opt)"
              >
                <span class="wizard__option-dot" />
                <span class="wizard__option-text">{{ opt.text }}</span>
              </button>
            </div>
          </div>

          <!-- Estado 3: Caso Complejo (Textarea) -->
          <div v-else-if="wizardStep === 'complex'" class="wizard__step" key="step-3">
            <button class="wizard__back-btn" @click="goBack" aria-label="Volver">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              Atrás
            </button>

            <h3 class="wizard__question">Tienes un modelo de negocio único.</h3>
            <p class="wizard__subtitle-text text-center mb-4">Cuéntanos a qué se dedica tu negocio y qué te gustaría construir para que podamos asesorarte.</p>
            
            <div class="wizard__textarea-wrap">
              <textarea 
                id="wizard-details" 
                v-model="userMessage" 
                rows="4" 
                class="wizard__textarea" 
                placeholder="Ej: Quiero crear un marketplace que conecte mecánicos con usuarios..."
              ></textarea>
              
              <UiBaseButton variant="primary" class="mt-4" @click="submitComplex">
                Obtener plan de acción
              </UiBaseButton>
            </div>
          </div>

          <!-- Estado 4: Resultado (Estándar) -->
          <div v-else-if="wizardStep === 'result'" class="wizard__step wizard__step--result" key="step-4">
            <p class="wizard__result-prefix">{{ $t('serviceWizard.result.prefix') }}</p>
            
            <div class="wizard__result-card-wrap">
              <SectionsServiceCard 
                v-if="recommendedService" 
                :service="recommendedService" 
                to="/servicios"
                is-home 
              />
            </div>
            
            <button class="wizard__reset-btn" @click="resetWizard">
              <UiIconsIconZap :size="16" />
              {{ $t('serviceWizard.reset') }}
            </button>
          </div>

          <!-- Estado 5: Resultado (Complejo / A medida) -->
          <div v-else-if="wizardStep === 'result-complex'" class="wizard__step wizard__step--result" key="step-5">
            <div class="wizard__complex-icon">
              <UiIconsIconGlobe :size="48" />
            </div>
            <h3 class="wizard__result-title">Necesitas una solución a medida</h3>
            <p class="wizard__result-desc">
              Para proyectos de este calibre, no usamos plantillas ni sistemas genéricos. 
              Necesitamos sentarnos contigo, diseñar la arquitectura adecuada y crear un plan de desarrollo sólido.
            </p>
            
            <div class="wizard__complex-actions">
              <UiBaseButton :to="contactUrl" variant="primary">
                Agendar consultoría gratuita
              </UiBaseButton>
              <button class="wizard__reset-btn ml-3" @click="resetWizard">
                Volver a empezar
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, resolveComponent } from 'vue'
import { services } from '~/data/services'

type WizardStep = 'industry' | 'need' | 'complex' | 'result' | 'result-complex'
const wizardStep = ref<WizardStep>('industry')

// Estado de selecciones
const selectedIndustryType = ref<string | null>(null)
const selectedRecommends = ref<string | null>(null)
const userMessage = ref('')

// Diccionario de Industrias
const industries = [
  { id: 'inmo', icon: 'IconKey', text: 'Inmobiliaria o Bienes Raíces', type: 'dokko' },
  { id: 'salon', icon: 'IconUsers', text: 'Salones de Belleza, Barberías o Spa', type: 'dokko' },
  { id: 'gym', icon: 'IconZap', text: 'Gimnasios y Centros Deportivos', type: 'dokko' },
  { id: 'ecom', icon: 'IconSmartphone', text: 'Tienda, Ventas o E-commerce', type: 'ecommerce' },
  { id: 'serv', icon: 'IconGlobe', text: 'Servicios Profesionales o Agencia', type: 'services' },
  { id: 'otro', icon: 'IconRocket', text: 'Otro / Mi modelo es único', type: 'complex' },
]

const getIcon = (name: string) => resolveComponent('UiIcons' + name)

// Diccionario de Preguntas por Tipo de Industria
const needQuestions: Record<string, string> = {
  dokko: '¿Qué estás buscando exactamente?',
  ecommerce: '¿Cómo quieres vender?',
  services: '¿Cuál es tu mayor reto operativo?'
}

// Diccionario de Opciones por Tipo de Industria
const needOptions: Record<string, any[]> = {
  dokko: [
    { id: 'd1', text: 'Un sistema rápido para organizar citas/inventario hoy mismo.', recommends: 'sistemas-renta' },
    { id: 'd2', text: 'Desarrollar una aplicación o sistema exclusivo con mi marca.', recommends: 'sistemas-gestion' }
  ],
  ecommerce: [
    { id: 'e1', text: 'Necesito una tienda en línea profesional y optimizada.', recommends: 'soluciones-digitales' },
    { id: 'e2', text: 'Quiero mi propia App Móvil para que mis clientes compren desde su teléfono.', recommends: 'apps-flutter' }
  ],
  services: [
    { id: 's1', text: 'Atraer más clientes, dar a conocer mi marca y agendar citas online.', recommends: 'soluciones-digitales' },
    { id: 's2', text: 'Automatizar mis procesos internos, contabilidad y gestión de personal.', recommends: 'sistemas-gestion' }
  ]
}

// Datos computados para el paso 2
const currentNeedQuestion = computed(() => {
  return selectedIndustryType.value ? needQuestions[selectedIndustryType.value] : ''
})

const currentNeedOptions = computed(() => {
  return selectedIndustryType.value ? needOptions[selectedIndustryType.value] : []
})

// Acciones
const selectIndustry = (ind: any) => {
  selectedIndustryType.value = ind.type
  if (ind.type === 'complex') {
    wizardStep.value = 'complex'
  } else {
    wizardStep.value = 'need'
  }
}

const selectNeed = (opt: any) => {
  selectedRecommends.value = opt.recommends
  wizardStep.value = 'result'
}

const submitComplex = () => {
  if (userMessage.value.trim() !== '') {
    wizardStep.value = 'result-complex'
  }
}

const goBack = () => {
  wizardStep.value = 'industry'
  userMessage.value = ''
}

const resetWizard = () => {
  selectedIndustryType.value = null
  selectedRecommends.value = null
  userMessage.value = ''
  wizardStep.value = 'industry'
}

// Resoluciones Finales
const recommendedService = computed(() => {
  if (!selectedRecommends.value) return null
  return services.find(s => s.slug === selectedRecommends.value) || null
})

const contactUrl = computed(() => {
  let url = '/contacto?motivo=medida'
  if (userMessage.value.trim() !== '') {
    url += `&mensaje=${encodeURIComponent(userMessage.value.trim())}`
  }
  return url
})
</script>

<style scoped>
.service-wizard {
  position: relative;
  background: linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.02) 20%, rgba(0, 102, 255, 0.02) 80%, transparent);
}

.mb-5 { margin-bottom: 3rem; }
.mb-4 { margin-bottom: 2rem; }
.mt-4 { margin-top: 1.5rem; }
.ml-3 { margin-left: 1rem; }
.text-center { text-align: center; }

.wizard__container {
  max-width: 800px;
  margin: 0 auto;
  min-height: 480px;
  display: flex;
  flex-direction: column;
}

.wizard__step {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  position: relative;
}

.wizard__back-btn {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.9rem;
  transition: color var(--transition-fast);
}

.wizard__back-btn:hover { color: var(--accent); }

.wizard__question {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--text);
  text-align: center;
}

.wizard__subtitle-text {
  color: var(--text-muted);
  font-size: 1rem;
}

/* ── Grilla de Industrias ── */
.wizard__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .wizard__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.wizard__options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wizard__option {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-btn);
  color: var(--text-muted);
  font-size: 1rem;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-base);
}

.wizard__option--card {
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding: 1.5rem;
}

.wizard__icon-wrap {
  color: var(--accent);
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wizard__option:hover {
  background: rgba(0, 255, 255, 0.05);
  border-color: rgba(0, 255, 255, 0.3);
  color: var(--text);
  transform: translateY(-2px);
}

.wizard__option-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--border);
  transition: border-color var(--transition-base);
  flex-shrink: 0;
}

.wizard__option:hover .wizard__option-dot {
  border-color: var(--accent);
  background: var(--accent);
}

/* ── Textarea ── */
.wizard__textarea-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.wizard__textarea {
  width: 100%;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-input);
  padding: 1rem;
  color: var(--text);
  outline: none;
  font-family: inherit;
  resize: vertical;
  transition: border-color var(--transition-fast);
}

.wizard__textarea:focus { border-color: var(--accent); }

/* ── Resultados ── */
.wizard__step--result {
  align-items: center;
  text-align: center;
  border-color: rgba(0, 255, 255, 0.2);
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.03), var(--surface));
  justify-content: center;
}

.wizard__result-prefix {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.wizard__result-card-wrap {
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
  text-align: left;
}

.wizard__complex-icon {
  color: var(--accent);
  margin-bottom: 1.5rem;
  background: rgba(0, 255, 255, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.wizard__result-title { font-size: 1.5rem; color: var(--text); margin-bottom: 1rem; }
.wizard__result-desc { color: var(--text-muted); margin-bottom: 2rem; max-width: 500px; line-height: 1.6; }
.wizard__complex-actions { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 1rem; }

.wizard__reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color var(--transition-base);
}

.wizard__reset-btn:hover { color: var(--accent); }

/* ── Transiciones ── */
.fade-slide-enter-active, .fade-slide-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-20px); }
</style>

import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // 1. Validación básica en servidor
    if (!body.name || !body.email || !body.message) {
      return new Response(JSON.stringify({ error: true, message: 'Faltan campos obligatorios' }), { status: 400 })
    }

    // 2. Protección Anti-Spam (Honeypot)
    if (body.honeypot) {
      // Si el campo oculto está lleno, es un bot
      console.warn('Spam detectado en el formulario de contacto')
      // Devolvemos 200 para que el bot crea que funcionó
      return { ok: true, message: 'Enviado' } 
    }

    // 3. Procesamiento (Aquí conectarías con Resend, SendGrid, Nodemailer, o base de datos)
    console.log('--- NUEVO MENSAJE DE CONTACTO ---')
    console.log('Nombre:', body.name)
    console.log('Email:', body.email)
    console.log('Motivo:', body.subject || 'No especificado')
    console.log('Mensaje:', body.message)
    console.log('---------------------------------')

    // 4. Retornar éxito
    // Simulamos un delay de red para que el UI muestre el estado de carga
    await new Promise(resolve => setTimeout(resolve, 800))

    return { ok: true, message: 'Mensaje recibido correctamente' }
    
  } catch (error) {
    console.error('Error procesando contacto:', error)
    return new Response(JSON.stringify({ error: true, message: 'Error interno del servidor' }), { status: 500 })
  }
})

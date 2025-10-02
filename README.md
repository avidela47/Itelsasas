# Itelsa E-commerce — README de entrega

Este repositorio contiene un backend (Node.js + Express + MongoDB) y un frontend (React + Vite + MUI) para una tienda e-commerce. Este documento resume cómo instalar, ejecutar, desplegar y cuáles son los entregables/condiciones recomendadas para la venta del proyecto.

## Estructura del repositorio

- backend/ — API en Node.js (Express) con rutas para auth, productos, carrito, pedidos y pagos.
- frontend/ — Aplicación React (Vite) con Material UI, Swiper y Zustand para estado.

## Requisitos

- Node.js 18+ recomendado
- npm o yarn
- MongoDB (local o Mongo Atlas)
- Credenciales de MercadoPago (si se desean pruebas de pago)

## Variables de entorno (backend)

Crea un archivo `.env` dentro de `backend/` con al menos estas variables:

- PORT=5000
- MONGO_URI=mongodb+srv://<user>:<pass>@cluster.../dbname
- JWT_SECRET=una_clave_secreta
- MP_ACCESS_TOKEN=tu_token_mercadopago (opcional para pagos)
- EMAIL_USER=usuario_smtp (opcional para enviar mails)
- EMAIL_PASS=password_smtp (opcional)

Si no usarás MercadoPago o correo, deja las variables vacías o desactiva las rutas correspondientes.

## Instalar dependencias

Desde la raíz del proyecto, abre dos terminales o ejecuta los comandos en orden:

# Instalar backend
cd backend
npm install

# Instalar frontend
cd ../frontend
npm install


## Ejecutar en desarrollo

En dos terminales separados:

# Backend (con nodemon si está configurado)
cd backend
npm run dev

# Frontend (Vite)
cd frontend
npm run dev

El frontend normalmente corre en http://localhost:5173 y el backend en http://localhost:5000 (ver `backend/server.js`).

## Probar la app

- Crear usuario y autenticarse
- Cargar productos (si tu API no trae productos, importa datos desde `frontend/src/data/products.js` manualmente o usa la UI admin para crear algunos)
- Probar flujo carrito → checkout (si MercadoPago no está configurado, el checkout redirigirá al init point sólo si la variable está presente)

## Build para producción

# Backend
cd backend
npm run build (si aplica)
# Frontend
cd frontend
npm run build

El build de frontend queda en `frontend/dist` (o `build` según configuración). Sirve ese directorio con un servidor estático o intégralo detrás de un servidor Nginx.

## Checklist técnico antes de la entrega / venta

- [ ] Confirmar configuración de variables de entorno y credenciales (no incluir secretos en el repo)
- [ ] Ejecutar tests unitarios (si existen)
- [ ] Revisar logs y errores en consola durante flujo principal (registro en backend con morgan)
- [ ] Hacer pruebas en 3 breakpoints: mobile (375px), tablet (768px), desktop (1200px)
- [ ] Ejecutar Lighthouse (performance, accessibility) y corregir issues críticos
- [ ] Reemplazar imágenes pesadas por WebP/AVIF para mejorar LCP
- [ ] Revisar políticas de CORS y seguridad en `backend/server.js`
- [ ] Confirmar métodos de backup y restauración de la base de datos (export/import)

## Lista de entregables para venta

- Código fuente (repositorio completo)
- Branch `main` limpio con última versión estable
- Archivo `.env.example` con variables necesarias (sin valores reales)
- Instrucciones de despliegue (este README)
- Guía de operación (qué servicios monitorear, límites conocidos)
- Paquete de soporte opcional (número de horas/mes y tarifa)
- Documentación mínima de endpoints importantes (auth, products, orders, payments)

## Propuesta de soporte (opcional)

Ejemplo de oferta de soporte que puedes usar en la venta:

- Paquete Básico: 1 mes de soporte (hasta 5 horas), €150 — incluye correcciones críticas y despliegue.
- Paquete Intermedio: 3 meses (hasta 20 horas), €400 — incluye soporte menor, despliegue en servidor (1 vez), pequeños cambios.
- Paquete Premium: 6 meses (hasta 60 horas), €1000 — incluye prioridad, cambios funcionales menores, optimizaciones y soporte telefónico.

Ajusta precios según mercado y acuerdo.

## Notas finales y recomendaciones

- Para una venta profesional, prepara un `demo` en un hosting público (Heroku, Render, Vercel para frontend + una instancia de MongoDB Atlas) y comparte credenciales temporales.
- Acompaña la entrega con un video corto (2-4 minutos) mostrando los flujos principales: catálogo, detalle, carrito, checkout y admin.
- Si quieres puedo generar automáticamente `.env.example`, un `CHANGELOG.md`, y el `README` de venta en formato PDF para adjuntar a la oferta.

---

Si quieres que genere `.env.example` o el PDF de oferta ahora, dime y lo creo. Si prefieres, hago la Etapa 4 completa (Lighthouse, accessibility fixes y optimizaciones de imágenes) y te entrego un reporte detallado con correcciones aplicadas.
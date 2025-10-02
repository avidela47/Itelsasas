# Itelsa E-commerce

<p align="center">
  <img src="./frontend/src/assets/icon.png" alt="Itelsa SAS Logo" width="200"/>
</p>

Este repositorio contiene un **e-commerce** completo con **backend (Node.js + Express + MongoDB)** y **frontend (React + Vite + Material UI)**.  
El proyecto está pensado para funcionar como tienda online, con sistema de autenticación, carrito, pagos y panel de administración.

---

## 📂 Estructura del repositorio

- **backend/** — API en Node.js (Express) con rutas para:
  - Autenticación (JWT)
  - Productos
  - Carrito
  - Pedidos
  - Pagos (MercadoPago opcional)
- **frontend/** — Aplicación React (Vite) con:
  - Material UI (MUI) para interfaz
  - Swiper para carruseles
  - Zustand para manejo de estado global

---

## ⚙️ Requisitos

- **Node.js 18+** (recomendado)
- **npm o yarn**
- **MongoDB** (local o Atlas)
- **Credenciales de MercadoPago** (si se desean pruebas de pago)

---

## 🔑 Variables de entorno (backend)

Crear un archivo `.env` dentro de `backend/` con al menos:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.../dbname
JWT_SECRET=una_clave_secreta
MP_ACCESS_TOKEN=tu_token_mercadopago   # opcional
EMAIL_USER=usuario_smtp                # opcional
EMAIL_PASS=password_smtp               # opcional

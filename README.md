<div align="center">

# 🐾 El Dogo — App Móvil

### Aplicación móvil para la gestión de una veterinaria

Construida con **React Native** y **Expo** — consume la API REST de El Dogo con autenticación JWT, almacenamiento seguro de la sesión y permisos según el rol del usuario.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![NestJS](https://img.shields.io/badge/API-NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)

</div>

---

## 📋 Tabla de contenidos

- [Acerca del proyecto](#-acerca-del-proyecto)
- [Ecosistema El Dogo](#-ecosistema-el-dogo)
- [Características principales](#-características-principales)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Puesta en marcha](#-puesta-en-marcha)
- [Uso de la aplicación](#-uso-de-la-aplicación)
- [Permisos por rol](#-permisos-por-rol)
- [Autenticación y sesión](#-autenticación-y-sesión)
- [Búsqueda inteligente](#-búsqueda-inteligente)
- [Solución de problemas](#-solución-de-problemas)

---

## 📖 Acerca del proyecto

**El Dogo App** es la versión móvil del sistema de gestión de la veterinaria El Dogo. Permite al personal iniciar sesión desde el celular y consultar o administrar **clientes** y **mascotas** en cualquier momento, con los mismos datos y permisos que el sistema web.

Se conecta a la API REST de **Veterinaria API** (NestJS, TypeORM y MySQL) y se prueba directamente en el teléfono con **Expo Go**, sin necesidad de compilar la aplicación.

## 🧩 Ecosistema El Dogo

El sistema completo está formado por tres proyectos que trabajan sobre la misma base de datos:

| Proyecto | Descripción | Repositorio |
|---|---|---|
| 🖥️ **Backend** | API REST con NestJS, TypeORM, MySQL, JWT y RBAC | [veterinaria-backend](https://github.com/Short884/veterinaria-backend) |
| 🌐 **Frontend web** | Panel de gestión con React y Vite | [Sistema-veterinaria-El-Dogo-](https://github.com/Short884/Sistema-veterinaria-El-Dogo-) |
| 📱 **App móvil** | Este repositorio, con React Native y Expo | — |

## ✨ Características principales

- 🔐 **Inicio de sesión real** contra la API, con correo y contraseña.
- 🔒 **Sesión guardada de forma segura** en el almacenamiento cifrado del dispositivo (`expo-secure-store`).
- 🛡️ **Pantallas protegidas** — sin sesión activa no se accede a ninguna pantalla privada.
- 👥 **Gestión de clientes y mascotas**, con las acciones disponibles según el rol del usuario.
- 🔎 **Búsqueda por aproximación** — encuentra resultados aunque haya errores de ortografía, tildes faltantes o se busque por apellido.
- 🔄 **Actualización de datos** a demanda desde la pantalla de ajustes.
- 🚪 **Cierre de sesión** que elimina la sesión guardada en el dispositivo.
- 🔌 **Cliente de API centralizado** — una única puerta de entrada que mantiene juntos la URL, el token y el manejo de errores.

## 🛠 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| [React Native](https://reactnative.dev/) | Interfaz móvil nativa con React |
| [Expo](https://expo.dev/) | Herramientas, ejecución y pruebas en el dispositivo |
| [Expo Go](https://expo.dev/go) | App para probar el proyecto en el celular |
| [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) | Almacenamiento cifrado del token de sesión |
| [Context API](https://react.dev/reference/react/createContext) | Estado global de sesión y datos |
| [Veterinaria API](https://github.com/Short884/veterinaria-backend) | Backend NestJS con JWT y roles |

## 📁 Estructura del proyecto

```
src/
├── api.js                   # Cliente de la API: URL base, token y manejo de errores
│
├── app/                     # Pantallas
│   ├── clientes.jsx         # Listado y búsqueda de clientes
│   ├── mascotas.jsx         # Listado y búsqueda de mascotas
│   └── config.jsx           # Ajustes: usuario, rol, actualizar datos y cerrar sesión
│
├── components/              # Componentes reutilizables
│   ├── ListToolbar.jsx      # Barra de búsqueda y acciones de cada lista
│   ├── ClientCard.jsx       # Tarjeta de cliente
│   ├── PetCard.jsx          # Tarjeta de mascota
│   └── Button.jsx           # Botón común de la app
│
├── context/
│   └── VeterinariaContext.jsx   # Sesión y datos de clientes y mascotas
│
├── hooks/
│   └── useProtectedRoute.js     # Protege las pantallas privadas
│
├── styles/
│   └── common.js            # Estilos compartidos
│
└── utils/
    └── buscar.js            # Búsqueda por aproximación
```

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- La app **Expo Go** instalada en tu celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) · [iOS](https://apps.apple.com/app/expo-go/id982107779))
- El **backend corriendo** (con MySQL activo): [veterinaria-backend](https://github.com/Short884/veterinaria-backend)
- La **PC y el celular conectados a la misma red Wi-Fi**
- Un usuario registrado en el sistema (ver [Uso de la aplicación](#-uso-de-la-aplicación))

## 🚀 Instalación

**1. Cloná el repositorio**

```bash
git clone https://github.com/tu-usuario/el-dogo-app.git
cd el-dogo-app
```

**2. Instalá las dependencias**

```bash
npm install
```

## ⚙️ Configuración

La app necesita saber dónde está el backend. La dirección se define con la variable `EXPO_PUBLIC_API_URL`.

**1. Averiguá la IP de tu PC en la red local**

En Windows, abrí una terminal y ejecutá `ipconfig`. Buscá la **Dirección IPv4** del adaptador Wi-Fi (por ejemplo `192.168.1.35`).

**2. Creá un archivo `.env` en la raíz del proyecto**

```env
EXPO_PUBLIC_API_URL=http://192.168.1.35:3000
```

> ⚠️ **Importante**
> - Usá la IP de tu PC, **no** `localhost`: en el celular, `localhost` es el propio teléfono.
> - Escribila sin barra final y sin comillas.
> - El puerto `3000` es el que usa el backend por defecto (variable `PORT` de su `.env`).
> - No subas el archivo `.env` al repositorio: agregalo al `.gitignore`.

Si la variable no está definida, la app usa `http://10.0.2.2:3000`, una dirección que **solo funciona en el emulador de Android**.

## ▶️ Puesta en marcha

1. Levantá MySQL y el backend (`npm run start:dev` en la carpeta del backend). Tiene que aparecer:

   ```
   🐾 API Veterinaria corriendo en http://localhost:3000
   ```

2. Iniciá la app:

   ```bash
   npx expo start -c
   ```

   La opción `-c` limpia la caché y asegura que se lean los cambios del `.env`.

3. Abrí **Expo Go** en el celular y escaneá el código QR que aparece en la terminal.

> 💡 **Tip:** antes de abrir la app, comprobá la conexión desde el navegador del celular entrando a `http://TU_IP:3000`. Si ves `{"message":"Cannot GET /","error":"Not Found","statusCode":404}`, el celular llega correctamente al backend.

## 📡 Uso de la aplicación

### 1. Registrar un usuario

La app no incluye pantalla de registro. Creá el usuario directamente en la API, por ejemplo con Postman o Thunder Client:

```http
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "email": "tu-correo@ejemplo.com",
  "password": "una-clave-segura",
  "rol": "admin"
}
```

Los roles disponibles son `admin`, `veterinario` y `cliente`.

### 2. Iniciar sesión

Abrí la app e ingresá el correo y la contraseña del usuario creado. Si las credenciales son correctas, se guarda la sesión de forma segura y se muestran las pantallas privadas.

### 3. Navegar por la app

- **Clientes** — listado de clientes con buscador.
- **Mascotas** — listado de mascotas con buscador.
- **Ajustes** — datos del usuario conectado, actualización de datos y cierre de sesión.

## 🔒 Permisos por rol

La app adapta las acciones disponibles al rol del usuario. El backend aplica las mismas reglas, por lo que ninguna acción se puede saltear desde la app.

| Recurso | Ver | Crear | Editar | Eliminar |
|---|:---:|:---:|:---:|:---:|
| **Clientes** | Cualquier usuario logueado | `admin` · `veterinario` | `admin` · `veterinario` | `admin` |
| **Mascotas** | Cualquier usuario logueado | Cualquier usuario logueado | `admin` · `veterinario` | `admin` · `veterinario` |

## 🔐 Autenticación y sesión

- El login llama a `POST /auth/login` con `email` y `passwordPlain`, y recibe `{ user, token }`.
- El token JWT y los datos del usuario se guardan con `expo-secure-store`, en el almacenamiento cifrado del dispositivo.
- Cada petición a la API envía automáticamente el header `Authorization: Bearer <token>`.
- Las pantallas privadas verifican la sesión antes de mostrarse y, si no hay una activa, redirigen al login.
- Al cerrar sesión se elimina el token del dispositivo.
- El token vence según la configuración del backend (`JWT_EXPIRES_IN`, por defecto 1 día). Cuando vence, hay que volver a iniciar sesión.

## 🔎 Búsqueda inteligente

Los buscadores de clientes y mascotas no exigen coincidencia exacta:

| Búsqueda | Encuentra | Motivo |
|---|---|---|
| `gomes` | Gómez | Tolera errores de ortografía |
| `perez juan` | Juan Pérez | No importa el orden de las palabras |
| `gom` | Gómez | Acepta búsquedas incompletas |
| `juna` | Juan | Tolera letras intercambiadas |

La búsqueda ignora mayúsculas y tildes, y en los clientes revisa nombre y apellido a la vez. Con tres letras o menos pide coincidencia exacta, para evitar resultados de más. Se resuelve en el dispositivo (`src/utils/buscar.js`), sin consultas extra al servidor.

## 🩺 Solución de problemas

<details>
<summary><strong>"El servidor tardó demasiado. Verificá la conexión."</strong></summary>

La app no está llegando al backend. Revisá, en este orden:

1. Que `EXPO_PUBLIC_API_URL` tenga la **IP de tu PC** (no `localhost` ni `10.0.2.2`) y que hayas reiniciado con `npx expo start -c`.
2. Que el backend y MySQL estén corriendo.
3. Que el celular y la PC estén en la **misma red Wi-Fi** (no en datos móviles ni en una red de invitados).
4. Que `http://TU_IP:3000` abra en el navegador del celular.
</details>

<details>
<summary><strong><code>http://TU_IP:3000</code> no abre desde el celular</strong></summary>

Casi siempre es el firewall o el tipo de red de Windows:

- Marcá tu red Wi-Fi como **Red privada** (Configuración → Red e Internet → Wi-Fi).
- Permití el puerto del backend. En PowerShell **como administrador**:

  ```powershell
  netsh advfirewall firewall add rule name="NestJS 3000" dir=in action=allow protocol=TCP localport=3000
  ```

- Desactivá temporalmente cualquier VPN o DNS privado del celular.
- Si el router aísla los dispositivos, usá el **hotspot del celular** conectando la PC a esa red, o un túnel como `ngrok http 3000`.
</details>

<details>
<summary><strong>Funciona en el emulador de Android pero no en el celular</strong></summary>

El emulador usa `http://10.0.2.2:3000` para llegar a tu PC. En un celular físico hay que usar la IP local de la PC en `EXPO_PUBLIC_API_URL`.
</details>

<details>
<summary><strong>Error <code>ExpoSecureStore.default.setValueWithKeyAsync is not a function</code></strong></summary>

Ocurre al abrir la app en el **navegador** (`http://localhost:8081`). `expo-secure-store` no existe en la versión web. Probá la app en **Expo Go** desde el celular.
</details>

<details>
<summary><strong>Los cambios del <code>.env</code> no se aplican</strong></summary>

Expo no relee las variables en caliente. Detené el servidor y ejecutá `npx expo start -c`.
</details>

<details>
<summary><strong>401 o 403 al usar la app</strong></summary>

- **401:** el token venció o no se envió. Cerrá sesión e iniciá de nuevo.
- **403:** tu usuario no tiene permiso para esa acción. Revisá la tabla de [permisos por rol](#-permisos-por-rol).
</details>

---

<div align="center">

Hecho con 🐾 y React Native

</div>

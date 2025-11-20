# 🌤️ Aplicación del Clima (Proyecto DEWC)

Aplicación web sencilla que permite consultar el clima actual de una ciudad usando la API de **OpenWeatherMap**, desarrollada con HTML, CSS y JavaScript.  
Este repositorio parte del código original proporcionado en clase como base para un proyecto de refactorización y ampliación de funcionalidades en la asignatura de Desarrollo Web en Entorno Cliente (DEWC).

---

## 📌 Estado del proyecto (primer commit)

En este primer commit se ha subido el **código original** del proyecto clima, sin modificaciones ni refactorizaciones adicionales:

- Formulario básico con campos de **ciudad** y **país**.
- Petición a la API de OpenWeatherMap mediante `fetch`.
- Conversión de temperatura de Kelvin a grados centígrados.
- Renderizado dinámico en el DOM de:
  - Nombre de la ciudad.
  - Temperatura actual.
  - Temperatura máxima y mínima.
- Indicador de carga mediante un **spinner** mientras se consulta la API.
- Estilos base con **Tailwind CSS** y una hoja de estilos personalizada.

A partir de esta base se irán añadiendo nuevas ramas con mejoras en validaciones de formularios, gestión de eventos, manipulación del DOM, uso de almacenamiento en el navegador y mejoras de interfaz.

> Estado actual: versión funcional con validaciones avanzadas de formulario y sistema de historial de búsquedas persistente mediante `localStorage`.

---

## 🧱 Tecnologías utilizadas (versión inicial)

- **HTML5**: estructura de la página y formulario.
- **CSS3**: estilos personalizados y spinner de carga.
- **Tailwind CSS**: utilidades de maquetación y estilos rápidos.
- **JavaScript (ES6)**:
  - Manipulación del DOM.
  - Gestión de eventos (`submit`, `load`).
  - Consumo de API REST con `fetch`.

---

## 🚀 Cómo ejecutar el proyecto (versión inicial)

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en un navegador moderno (Chrome, Firefox, Edge…).
3. Escribir una ciudad, seleccionar un país y pulsar **“Obtener Clima”**.
4. Esperar a que se muestre la información del clima en el contenedor de resultados.

> Nota: Es necesario disponer de conexión a Internet para que la petición a la API de OpenWeatherMap funcione correctamente.

---

## 📚 Contexto académico

Este proyecto forma parte de la asignatura **Desarrollo Web en Entorno Cliente (DEWC)**, y se utilizará como base para un ejercicio de **refactorización y ampliación** de código legado, trabajando especialmente:

- Manipulación avanzada del DOM.
- Captura y gestión de eventos.
- Validaciones de formularios.
- Uso de almacenamiento en el navegador.
- Mejora de la accesibilidad y etiquetas semánticas.

---

## 🛠️ Mejoras implementadas

> Esta sección documenta las mejoras realizadas sobre el código original del proyecto clima.  
> Cada mejora se implementa en una rama específica y se integra posteriormente a `main`.

### 🔹 Versión original (commit inicial)

- Se ha subido el código base del proyecto clima utilizado en clase, sin modificaciones en la lógica ni en la interfaz.
- La aplicación incluye:
  - Formulario sencillo para introducir **ciudad** y seleccionar **país**.
  - Consulta a la API de **OpenWeatherMap** usando `fetch`.
  - Conversión de temperaturas desde Kelvin a grados **centígrados**.
  - Representación de la información del clima en el DOM (ciudad, temperatura actual, máxima y mínima).
  - Un **spinner de carga** que se muestra mientras se realiza la petición a la API.
- Esta versión sirve como punto de partida para aplicar refactorización, mejoras de usabilidad y nuevas funcionalidades en DEWC.

---

### 🔹 Mejora 1: Validaciones avanzadas y mejor UX en la búsqueda

**Rama:** `feature/validaciones-formulario`  

En esta primera mejora se ha trabajado sobre la calidad del formulario y la experiencia de usuario al buscar el clima:

- **Validaciones de formulario en tiempo real**:
  - Validación del campo **ciudad**: obligatorio, longitud mínima configurable y solo letras (incluyendo acentos) y espacios.
  - Validación del campo **país**: obliga a seleccionar una opción distinta de la opción por defecto.
  - Los mensajes de error se muestran justo debajo de cada campo (`error-ciudad` y `error-pais`), sin recurrir únicamente a mensajes genéricos.

- **Gestión de errores más clara y visible**:
  - Mensaje de error general en la parte superior cuando el formulario no es válido (por ejemplo, campos vacíos o formato incorrecto).
  - Mensajes específicos cuando la API devuelve errores HTTP (como ciudad no encontrada o problemas del servicio).

- **Mejora de experiencia de usuario con eventos y spinner**:
  - El botón **“Obtener Clima”** se deshabilita y cambia su texto mientras se realiza la petición a la API, evitando envíos múltiples.
  - Se utiliza `async/await` para simplificar la lógica de la llamada a la API y manejar mejor los errores.
  - El spinner se muestra únicamente cuando se está realizando una consulta válida, reforzando la sensación de carga mientras se espera la respuesta.

Estos cambios mejoran la usabilidad del formulario, la claridad de los errores y la gestión de eventos, alineándose con los criterios de validación, DOM y UX de la asignatura.

---

### 🔹 Mejora 2: Historial de búsquedas con localStorage

**Rama:** `feature/historial-localstorage`  

En esta mejora se ha añadido un historial de búsquedas que aprovecha el almacenamiento local del navegador (`localStorage`) para recordar las últimas consultas realizadas:

- **Nueva sección en la interfaz**  
  - Se incluye un bloque “Historial de búsquedas” debajo del formulario.  
  - Cada entrada del historial se muestra como una tarjeta con:
    - Nombre de la ciudad y código de país (por ejemplo, `Madrid (ES)`).
    - Fecha y hora en la que se realizó la consulta.

- **Almacenamiento persistente con `localStorage`**  
  - Después de cada búsqueda válida (ciudad existente devuelta por la API), se guarda un objeto con:
    - `ciudad`
    - `pais`
    - `fecha` (en formato ISO)  
  - El historial se serializa como JSON en la clave `clima-historial-busquedas`.  
  - Al cargar la página, el historial se recupera de `localStorage` y se pinta automáticamente en el DOM.

- **Lógica del historial y límite de elementos**  
  - Se evita repetir la misma ciudad y país en el historial, manteniendo siempre la búsqueda más reciente en primera posición.  
  - El historial se limita a un máximo de 5 entradas para no sobrecargar la interfaz.  
  - Si no hay búsquedas guardadas, se muestra un mensaje informativo en lugar de una lista vacía.

- **Interacción mediante eventos (DOM + UX)**  
  - Cada elemento del historial es clicable: al hacer clic se rellenan automáticamente los campos de **ciudad** y **país** y se lanza una nueva consulta a la API.  
  - Se han añadido manejadores de eventos (`click`) sobre los elementos `<li>` generados dinámicamente para gestionar estas recargas de búsqueda.  

Esta mejora refuerza el uso de eventos, la manipulación del DOM y el almacenamiento en el navegador, además de mejorar la experiencia de usuario permitiendo repetir búsquedas de forma rápida y visual.

---

### 📌 Próximas mejoras planificadas

Las siguientes mejoras previstas sobre este código base son:

2. **Mejoras en la interfaz y textos dinámicos**  
   - Mensajes personalizados según la temperatura (frío, templado, calor).  
   - Revisión de etiquetas semánticas y estructura para mejorar accesibilidad y mantenimiento.

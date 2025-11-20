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
> Cada mejora se implementará en una rama específica y se integrará posteriormente a `main`.

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

### 📌 Próximas mejoras planificadas

Las primeras mejoras que se implementarán sobre este código base serán:

1. **Validaciones avanzadas del formulario**  
   - Validación en tiempo real de la ciudad (obligatoria, longitud mínima, solo letras y espacios).  
   - Validación del país (selección obligatoria).  
   - Mensajes de error específicos debajo de cada campo y mensaje general en la parte superior.

2. **Mejor gestión de eventos y UX en la búsqueda de clima**  
   - Deshabilitar el botón de envío mientras se realiza la petición a la API.  
   - Mejorar los mensajes de error cuando falle la conexión o la ciudad no exista.

3. **Almacenamiento en el navegador (futuro)**  
   - Guardar historial de búsquedas y/o ciudades favoritas usando `localStorage`.  
   - Mostrar ese historial como lista clicable para repetir consultas rápidamente.


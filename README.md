# 🌤️ Aplicación del Clima (Proyecto DEWC)

Aplicación web sencilla que permite consultar el clima actual de una ciudad usando la API de **OpenWeatherMap**, desarrollada con HTML, CSS y JavaScript.  
Este repositorio parte del código original proporcionado en clase como base para un proyecto de refactorización y ampliación de funcionalidades en la asignatura de Desarrollo Web en Entorno Cliente (DEWC).

---

## 📌 Estado del proyecto

La aplicación se encuentra en un estado **funcional mejorado** respecto al código original:

- Versión inicial refactorizada con **validaciones avanzadas**, mejor gestión de eventos y mensajes de error.  
- Sistema de **historial de búsquedas** persistente mediante `localStorage`.  
- Tarjeta de resultados con **mensajes dinámicos** y tono cercano para el usuario según la temperatura actual.

---

## 🧱 Tecnologías utilizadas

- **HTML5**: estructura de la página y formulario.  
- **CSS3**: estilos personalizados, fondo degradado y spinner de carga.  
- **Tailwind CSS**: utilidades de maquetación y estilos rápidos (márgenes, colores, tamaños de texto…).  
- **JavaScript (ES6)**:
  - Manipulación del DOM.
  - Gestión de eventos del navegador (`load`, `submit`, `input`, `change`, `click`).
  - Validación de formularios del lado del cliente.
  - Consumo de API REST con `fetch` y `async/await`.
  - Uso de **`localStorage`** para almacenamiento persistente en el navegador.

---

## 🚀 Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.  
2. Abrir el archivo `index.html` en un navegador moderno (Chrome, Firefox, Edge…).  
3. Escribir una ciudad, seleccionar un país y pulsar **“Obtener Clima”**.  
4. Esperar a que se muestre la información del clima en el contenedor de resultados y, en su caso, el mensaje dinámico asociado a la temperatura.  

> Nota: Es necesario disponer de conexión a Internet para que la petición a la API de OpenWeatherMap funcione correctamente.

---

## 📚 Contexto académico

Este proyecto forma parte de la asignatura **Desarrollo Web en Entorno Cliente (DEWC)**, y se ha utilizado como base para un ejercicio de **refactorización y ampliación** de código legado.  
Las mejoras se han centrado en:

- Manipulación avanzada del DOM.  
- Captura y gestión de eventos.  
- Validaciones de formularios del lado del cliente.  
- Uso de almacenamiento en el navegador (`localStorage`).  
- Mejora de la accesibilidad, la semántica y la experiencia de usuario (UX).

---

## 🛠️ Mejoras implementadas

> Cada mejora se ha desarrollado en una rama específica y posteriormente se ha integrado en `main`.

### 🔹 Versión original (commit inicial)

- Se ha subido el código base del proyecto clima utilizado en clase, sin modificaciones en la lógica ni en la interfaz.  
- La aplicación inicial incluía:
  - Formulario sencillo para introducir **ciudad** y seleccionar **país**.  
  - Consulta a la API de **OpenWeatherMap** usando `fetch`.  
  - Conversión de temperaturas desde Kelvin a grados **centígrados**.  
  - Representación de la información del clima en el DOM (ciudad, temperatura actual, máxima y mínima).  
  - Un **spinner de carga** que se muestra mientras se realiza la petición a la API.  
- Esta versión sirvió como punto de partida para aplicar refactorización, mejoras de usabilidad y nuevas funcionalidades en DEWC.

---

### 🔹 Mejora 1: Validaciones avanzadas y mejor UX en la búsqueda

**Rama:** `feature/validaciones-formulario`  

En esta primera mejora se ha trabajado sobre la calidad del formulario y la experiencia de usuario al buscar el clima:

- **Validaciones de formulario en tiempo real**
  - Campo **ciudad**:
    - Obligatorio.
    - Longitud mínima (para evitar nombres demasiado cortos).
    - Solo se permiten letras (incluidos acentos) y espacios.
  - Campo **país**:
    - Obligatorio seleccionar un valor distinto de la opción por defecto.  
  - Los mensajes de error se muestran justo debajo de cada campo (`error-ciudad` y `error-pais`), además de un mensaje general en la parte superior cuando el formulario no es válido.

- **Gestión de errores más clara**
  - Mensaje superior reutilizable para:
    - Errores de validación del formulario.  
    - Errores al consultar la API (ciudad no encontrada, errores de servidor, etc.).  
  - Diferenciación entre:
    - Errores de usuario (formulario incompleto o con formato incorrecto).  
    - Errores de la API o de red (problemas externos a la app).

- **Mejora de UX con eventos y spinner**
  - El botón **“Obtener Clima”** se deshabilita mientras se realiza la petición y cambia su texto a “Buscando clima…”, evitando envíos múltiples.  
  - La función `consultarAPI` se ha refactorizado a `async/await`, simplificando la lectura del código y el manejo de errores.  
  - El spinner solo se muestra cuando se lanza una búsqueda válida, reforzando la sensación de carga mientras se espera la respuesta.

---

### 🔹 Mejora 2: Historial de búsquedas con localStorage

**Rama:** `feature/historial-localstorage`  

En esta mejora se ha añadido un historial de búsquedas que aprovecha el almacenamiento local del navegador para recordar las últimas consultas realizadas:

- **Nueva sección en la interfaz**
  - Se incluye un bloque **“Historial de búsquedas”** debajo del formulario.  
  - Cada entrada del historial se muestra como una tarjeta con:
    - Nombre de la ciudad y código de país (por ejemplo, `Madrid (ES)`).  
    - Fecha y hora en la que se realizó la consulta.

- **Almacenamiento persistente con `localStorage`**
  - Tras cada búsqueda válida (la API devuelve datos correctos), se guarda un objeto con:
    - `ciudad`  
    - `pais`  
    - `fecha` (en formato ISO)  
  - El historial se serializa como JSON en la clave `clima-historial-busquedas`.  
  - Al cargar la página, el historial se recupera de `localStorage` y se pinta automáticamente en el DOM.

- **Lógica del historial y control de duplicados**
  - Se evita acumular múltiples entradas idénticas de la misma ciudad y país, manteniendo la búsqueda más reciente en primer lugar.  
  - El historial se limita a un máximo de **5 entradas** para no sobrecargar la interfaz.  
  - Si no hay búsquedas guardadas, se muestra un mensaje informativo en lugar de una lista vacía.

- **Interacción mediante eventos (DOM + UX)**
  - Cada elemento del historial es clicable:
    - Al hacer clic, se rellenan automáticamente los campos del formulario con esa ciudad y país.  
    - Se lanza una nueva consulta a la API sin que el usuario tenga que escribir de nuevo.  
  - Se han añadido manejadores de eventos `click` sobre los `<li>` generados dinámicamente.

---

### 🔹 Mejora 3: Mensajes dinámicos y personalización de la tarjeta de clima

**Rama:** `feature/mensajes-temperatura-ui`  

En esta mejora se ha trabajado la parte visual y el feedback al usuario en función de la temperatura actual:

- **Mensajes dinámicos según temperatura**
  - Se calcula la temperatura actual en grados centígrados y, según el rango, se genera un mensaje distinto:  
    - Temperaturas bajas: aviso de frío intenso y recomendación de abrigarse.  
    - Temperaturas templadas: mensaje indicando clima agradable.  
    - Temperaturas altas: recomendación de hidratarse y evitar demasiado sol.  
  - Estos mensajes se muestran en un párrafo destacado justo debajo de las temperaturas, con fondo de color y tipografía diferenciada.

- **Tono cercano y divertido**
  - Los textos se han escrito en un tono informal y cercano, adaptado al contexto del proyecto, para hacer la experiencia más agradable al usuario.  
  - Se incluyen emojis y expresiones coloquiales que refuerzan el carácter descriptivo del clima.

Esta mejora combina datos de la API con lógica de negocio en el cliente y manipulación del DOM, aportando un feedback claro y personalizado al usuario en función de la información meteorológica.

---

## 📌 Posibles mejoras futuras

- Añadir selección de unidades (°C / °F).  
- Mostrar iconos de estado del tiempo (soleado, nublado, lluvia…) usando los códigos que devuelve la API.  
- Incorporar mensajes de accesibilidad adicionales (atributos ARIA, roles, etc.) y más etiquetas semánticas (`main`, `section`, `article`, `footer`).  
- Internacionalización básica (traducciones de textos de interfaz).

---

## 👩‍💻 Autoría

Proyecto desarrollado por **Natalia Alejo Pérez**  
Ciclo formativo: **2º DAW – Desarrollo de Aplicaciones Web**

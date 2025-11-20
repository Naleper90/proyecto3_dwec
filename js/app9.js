const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

// CAMBIO NUEVO: referencias a los campos del formulario y a los contenedores de error
// Nos permiten validar y mostrar mensajes específicos debajo de cada campo
const inputCiudad = document.querySelector("#ciudad");
const selectPais = document.querySelector("#pais");
const errorCiudad = document.querySelector("#error-ciudad");
const errorPais = document.querySelector("#error-pais");

// CAMBIO NUEVO: referencia al botón de envío
// La usamos para deshabilitarlo / habilitarlo mientras se consulta la API
const botonSubmit = document.querySelector('input[type="submit"]');


// Cuando la página ha terminado de cargar, configuramos los listeners de eventos
window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);

  // CAMBIO NUEVO: validación en tiempo real del campo ciudad mientras el usuario escribe
  inputCiudad.addEventListener("input", () => {
    const mensaje = validarCiudad(inputCiudad.value);
    errorCiudad.textContent = mensaje;
    mostrarMensajeInicial();
  });

  // CAMBIO NUEVO: validación del país cada vez que el usuario cambia la selección
  selectPais.addEventListener("change", () => {
    const mensaje = validarPais(selectPais.value);
    errorPais.textContent = mensaje;

    mostrarMensajeInicial();
  });
});


// Función que se ejecuta cuando el usuario intenta buscar el clima
function buscarClima(e) {
  e.preventDefault();

  // CAMBIO NUEVO: antes de validar, limpiamos posibles errores anteriores del formulario
  limpiarErroresFormulario();

  // Obtenemos los valores actuales introducidos por el usuario
  const ciudad = inputCiudad.value;
  const pais = selectPais.value;

  // CAMBIO NUEVO: ejecutamos funciones de validación específicas para cada campo
  const mensajeErrorCiudad = validarCiudad(ciudad);
  const mensajeErrorPais = validarPais(pais);

  if (mensajeErrorCiudad) {
    errorCiudad.textContent = mensajeErrorCiudad;
  }
  if (mensajeErrorPais) {
    errorPais.textContent = mensajeErrorPais;
  }
  if (mensajeErrorCiudad || mensajeErrorPais) {
    mostrarError("Revisa los errores del formulario antes de continuar...");
    return;
  }

  consultarAPI(ciudad, pais);
}


// CAMBIO NUEVO: limpia los mensajes de error del formulario
// Deja vacíos los contenedores de error de ciudad y país
function limpiarErroresFormulario() {
  errorCiudad.textContent = "";
  errorPais.textContent = "";
}


// CAMBIO NUEVO: valida el campo ciudad y devuelve un mensaje de error o cadena vacía si es válido
function validarCiudad(valor) {
  const ciudadLimpia = valor.trim();

  if (ciudadLimpia.length === 0) {
    return "La ciudad es obligatoria.";
  }
  if (ciudadLimpia.length < 3) {
    return "La ciudad debe tener al menos 3 caracteres.";
  }

  const soloLetrasYEspacios = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/;
  if (!soloLetrasYEspacios.test(ciudadLimpia)) {
    return "La ciudad solo puede contener letras y espacios.";
  }

  return "";
}


// CAMBIO NUEVO: valida que se haya seleccionado un país (no dejar la opción por defecto)
function validarPais(valor) {
  if (!valor) {
    return "Debes seleccionar un país.";
  }
  return "";
}


// Muestra un mensaje de error general en la parte superior del contenedor
// Se utiliza tanto para errores de formulario como para errores de API
function mostrarError(mensaje) {
  const alertaExist = document.querySelector(".bg-red-100");

  if (!alertaExist) {
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-5",
      "text-center",
    );
    alerta.innerHTML = `
    <strong class='font-bold'>Error</strong>
    <span class='block'>${mensaje}</span>
    `;
    container.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }
}


// CAMBIO NUEVO: deshabilita el botón de buscar y cambia su aspecto y texto
// Se usa mientras se está realizando la petición a la API
function deshabilitarBotonBusqueda() {
  botonSubmit.disabled = true;
  botonSubmit.classList.add("opacity-50", "cursor-not-allowed");
  botonSubmit.value = "Buscando clima...";
}

// CAMBIO NUEVO: habilita el botón de buscar y restaura su aspecto y texto originales
function habilitarBotonBusqueda() {
  botonSubmit.disabled = false;
  botonSubmit.classList.remove("opacity-50", "cursor-not-allowed");
  botonSubmit.value = "Obtener Clima";
}


// CAMBIO NUEVO: versión refactorizada de consultarAPI usando async/await
// Realiza la petición a la API de OpenWeatherMap y gestiona el resultado y posibles errores
async function consultarAPI(ciudad, pais) {
  const API_key = "0e8b3f0b7b9e3a433119f371ec0cd51c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_key}`;

  mostrarSpinner();
  deshabilitarBotonBusqueda();

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        mostrarError(
          "Ciudad no encontrada. Verifica el nombre y el país seleccionados.",
        );
      } else {
        mostrarError(
          `Se ha producido un error al consultar la API (código ${respuesta.status}). Inténtalo de nuevo más tarde.`,
        );
      }
      return; 
    }

    const datos = await respuesta.json();

    limpiarHTML();
    mostrarClima(datos);
  } catch (error) {
    console.error("Error al realizar la petición de clima:", error);
    mostrarError(
      "No se ha podido conectar con el servicio de clima. Revisa tu conexión e inténtalo de nuevo.",
    );
  } finally {
    habilitarBotonBusqueda();
  }
}


// Muestra en el DOM la información de clima devuelta por la API
function mostrarClima(clima) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = clima;

  const temperatura = kelvintoCentigrados(temp);
  const max = kelvintoCentigrados(temp_max);
  const min = kelvintoCentigrados(temp_min);

  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${temperatura} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}


// Elimina cualquier contenido previo del contenedor de resultados
// Se usa antes de mostrar nuevos datos o el spinner
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}


// Función auxiliar para convertir grados Kelvin a grados centígrados
const kelvintoCentigrados = (grados) => parseInt(grados - 273.15);


// Muestra un spinner de carga mientras esperamos la respuesta de la API
function mostrarSpinner() {
  limpiarHTML();

  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  // Estructura del spinner basada en la librería Spinkit (clases ya definidas en CSS)
  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
}

// CAMBIO NUEVO: restaura el mensaje inicial en el contenedor de resultados
function mostrarMensajeInicial() {
  limpiarHTML();
  const p = document.createElement("p");
  p.textContent = "Elige tu ciudad y país...";
  p.classList.add("text-center", "text-white", "mt-6");
  resultado.appendChild(p);
}

/* =========================================================================
   CONFIGURACIÓN DE UNAULA

   URL_INSCRIPCION es el único valor que hay que cambiar para poner la
   landing en marcha: es el formulario al que llevan todos los botones de
   inscripción. Reemplaza el texto de abajo por la dirección real.
   ========================================================================= */
const URL_INSCRIPCION = "PEGAR_AQUI_LA_URL_DEL_FORMULARIO_DE_UNAULA";

/**
 * ========================================================================
 * INTERRUPTORES DE SECCIÓN
 *
 * Poner una bandera en false oculta esa sección de la página. Útil mientras
 * su contenido definitivo no esté listo.
 * ========================================================================
 */
const CONFIG = {
  secciones: {
    mostrarAgenda: true,
    mostrarHistorias: true
  }
};

/**
 * ========================================================================
 * DATOS DE HISTORIAS DE ÉXITO (Edición centralizada de historias)
 * ========================================================================
 */
const HISTORIAS = [
  {
    titulo: "Cuando servir se convierte en legado",
    resumen: "UNAULA forma líderes comprometidos con el…",
    cuerpo: "[HISTORIA COMPLETA PENDIENTE]",
    imagen: "assets/img/foto-celebrar-1-historia.jpg"
  },
  {
    titulo: "Construir empresa, construir país",
    resumen: "Los egresados UNAULA crean oportunidades y generan…",
    cuerpo: "[HISTORIA COMPLETA PENDIENTE]",
    imagen: "assets/img/foto-celebrar-1-historia.jpg"
  },
  {
    titulo: "Cambiar vidas también es éxito",
    resumen: "Transformar vidas es una forma de construir legado…",
    cuerpo: "[HISTORIA COMPLETA PENDIENTE]",
    imagen: "assets/img/foto-celebrar-1-historia.jpg"
  },
  {
    titulo: "El conocimiento que transforma el futuro",
    resumen: "El conocimiento genera transformación y progreso…",
    cuerpo: "[HISTORIA COMPLETA PENDIENTE]",
    imagen: "assets/img/foto-celebrar-1-historia.jpg"
  }
];

/**
 * ========================================================================
 * DATOS DE AGENDA (Edición centralizada de momentos)
 * ========================================================================
 */
const AGENDA = [
  { hora: "7:00 p. m. - 8:30 p. m.", momento: "Llegada y registro" },
  { hora: "8:30 p. m. - 9:00 p. m.", momento: "Bienvenida" },
  { hora: "Por confirmar", momento: "Historias que nos inspiran" },
  { hora: "Por confirmar", momento: "Actividad / experiencia" },
  { hora: "Por confirmar", momento: "Celebración" },
  { hora: "Por confirmar", momento: "Seguimos haciendo historia" }
];

/**
 * ========================================================================
 * ÚNICO PUNTO DE INTEGRACIÓN CON LOS DATOS
 * ========================================================================
 */
/**
 * ========================================================================
 * CONSTRUCTOR DE URL PARA MICROSOFT FORMS
 * ========================================================================
 */
/**
 * ========================================================================
 * GESTIÓN DE FLUJO Y TARJETA DE REGISTRO
 * ========================================================================
 */
function irAInscripcion(e) {
  if (e) e.preventDefault();
  if (!URL_INSCRIPCION || URL_INSCRIPCION.startsWith("PEGAR_")) {
    console.warn("Falta configurar URL_INSCRIPCION al inicio de este archivo.");
    return;
  }
  window.open(URL_INSCRIPCION, "_blank", "noopener");
}
function gestionarBarraFija() {
  const hero = document.getElementById("seccion-hero");
  const barra = document.getElementById("barra-fija");
  if (!hero || !barra) return;

  window.addEventListener("scroll", () => {
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 60) {
      barra.classList.add("visible");
    } else {
      barra.classList.remove("visible");
    }
  }, { passive: true });
}


function scrollHistorias(direccion) {
  const track = document.getElementById("carrusel-historias");
  if (track) {
    track.scrollBy({ left: direccion * 330, behavior: "smooth" });
  }
}

/**
 * ========================================================================
 * GESTIÓN DEL MODAL NATIVO DE HISTORIAS DE ÉXITO (<dialog>)
 * ========================================================================
 */
let tarjetaDisparadora = null;

function abrirModalHistoria(indice) {
  const historia = HISTORIAS[indice];
  if (!historia) return;

  tarjetaDisparadora = document.activeElement;

  const modal = document.getElementById("modal-historia");
  const img = document.getElementById("modal-historia-img");
  const tit = document.getElementById("modal-historia-titulo");
  const meta = document.getElementById("modal-historia-meta");
  const txt = document.getElementById("modal-historia-texto");

  if (img) {
    img.src = historia.imagen || "assets/img/foto-celebrar-1-historia.jpg";
    img.alt = historia.titulo;
  }
  if (tit) {
    const palabras = (historia.titulo || "").trim().split(/\s+/);
    if (palabras.length > 1) {
      const ultima = palabras.pop();
      tit.innerHTML = `${palabras.join(" ")} <span class="trazo-fin trazo-fin-dorado">${ultima}</span>`;
    } else {
      tit.innerHTML = `<span class="trazo-fin trazo-fin-dorado">${historia.titulo}</span>`;
    }
  }
  if (meta) meta.style.display = "none";
  if (txt) txt.textContent = historia.cuerpo || "[HISTORIA COMPLETA PENDIENTE]";

  if (modal && typeof modal.showModal === "function") {
    modal.showModal();
    document.body.style.overflow = "hidden";
  }
}

function cerrarModalHistoria() {
  const modal = document.getElementById("modal-historia");
  if (modal && modal.open) {
    modal.close();
  }
}

function renderizarHistorias() {
  const track = document.getElementById("carrusel-historias");
  if (!track || !Array.isArray(HISTORIAS)) return;
  const fotoGenerica = "assets/img/foto-celebrar-1-historia.jpg";
  track.innerHTML = HISTORIAS.map((h, i) => `
    <button type="button" class="card-historia-carrusel" onclick="abrirModalHistoria(${i})" aria-haspopup="dialog" aria-label="Abrir historia: ${h.titulo}">
      <img src="${h.imagen || fotoGenerica}" alt="${h.titulo}" class="foto-historia-item" loading="lazy">
      <div class="historia-titulo-item">${h.titulo}</div>
      <div class="historia-desc-item">${h.resumen}</div>
      <span class="historia-ver-mas">ver mas</span>
    </button>
  `).join("");
}

function renderizarAgenda() {
  const grid = document.getElementById("grid-agenda");
  if (!grid || !Array.isArray(AGENDA)) return;
  grid.innerHTML = AGENDA.map(a => `
    <div class="card-agenda-vidrio">
      <div class="agenda-hora">${a.hora}</div>
      <div class="agenda-momento">${a.momento}</div>
    </div>
  `).join("");
}

function inicializarModalHistorias() {
  const modal = document.getElementById("modal-historia");
  if (!modal) return;

  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (tarjetaDisparadora && typeof tarjetaDisparadora.focus === "function") {
      tarjetaDisparadora.focus();
    }
  });

  modal.addEventListener("click", (e) => {
    // Cierre al hacer clic sobre el fondo del diálogo (backdrop)
    if (e.target === modal) {
      cerrarModalHistoria();
    }
  });
}

/**
 * Respaldo de los iconos del pie.
 *
 * Si falta el SVG se intenta la misma ruta en PNG —el logo oficial de LinkedIn
 * no siempre se publica en SVG— y sólo si tampoco está, el botón se convierte
 * en una pastilla con el nombre de la red. Así la página nunca muestra una
 * imagen rota.
 */
function prepararIconosRedes() {
  document.querySelectorAll(".pie-red img").forEach((img) => {
    let intentadoPng = false;
    const alFallar = () => {
      if (!intentadoPng && img.getAttribute("src").endsWith(".svg")) {
        intentadoPng = true;
        img.src = img.getAttribute("src").slice(0, -4) + ".png";
        return;
      }
      const enlace = img.closest(".pie-red");
      if (!enlace || enlace.classList.contains("pie-red--sin-icono")) return;
      enlace.classList.add("pie-red--sin-icono");
      enlace.textContent = img.alt;
    };
    img.addEventListener("error", alFallar);
    if (img.complete && img.naturalWidth === 0) alFallar();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!CONFIG.secciones.mostrarAgenda) {
    const s = document.getElementById("sec-agenda");
    if (s) s.style.display = "none";
  }
  if (!CONFIG.secciones.mostrarHistorias) {
    const s = document.getElementById("sec-historias");
    if (s) s.style.display = "none";
  }
  gestionarBarraFija();
  prepararIconosRedes();
  inicializarModalHistorias();
  renderizarHistorias();
  renderizarAgenda();
});

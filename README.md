# Landing — Encuentro de Egresados UNAULA 60 Años

Página de bienvenida para el Encuentro de Egresados de los 60 años de UNAULA,
construida por **Magna** y entregada al equipo de TI de UNAULA para su montaje.

**Evento:** viernes 6 de noviembre de 2026 · Plaza Mayor Medellín

---

## Lo primero: configurar el formulario

Todos los botones de inscripción llevan al formulario de UNAULA. La dirección se
define en **una sola línea**, al inicio de `assets/js/main.js`:

```js
const URL_INSCRIPCION = "PEGAR_AQUI_LA_URL_DEL_FORMULARIO_DE_UNAULA";
```

Mientras ese valor no se reemplace, los botones no hacen nada y dejan un aviso en
la consola del navegador. El enlace abre en una pestaña nueva.

Son cinco botones y todos usan la misma constante: el del menú superior, los dos
de la barra inferior fija, el del bloque rojo de bienvenida y el del cierre.

## Cómo verlo

El sitio es estático: `index.html` se abre con doble clic y funciona, sin
compilación, sin dependencias y sin necesidad de cuenta de ningún tipo.

Publicado con GitHub Pages en `https://sanarbmar.github.io/LandingPruebaUnaula/`

## Estructura del repositorio

```
index.html          Estructura y contenido de la página
assets/
  css/estilos.css   Todos los estilos
  js/main.js        Configuración y comportamiento
  img/              Fotografías, logos y trazos gráficos
.nojekyll           Le indica a GitHub Pages que sirva los archivos tal cual
```

## Configuración

Además de `URL_INSCRIPCION`, el objeto `CONFIG` al inicio de `assets/js/main.js`
concentra lo que cambia entre eventos:

- `evento` — nombre, fecha, hora, lugar
- `institucion` — datos de contacto y enlaces
- `secciones` — banderas para ocultar la agenda o las historias de éxito

Las historias de éxito y la agenda se editan en los arreglos `HISTORIAS` y
`AGENDA` del mismo archivo. Hoy tienen contenido de ejemplo marcado
`[PENDIENTE]`, a la espera del material definitivo.

## Tipografía

Toda la página usa **Archivo**, una grotesca variable de Google Fonts, con el eje
de ancho fijado en su extremo estrecho: `font-stretch: 62%`.

La elección tiene una razón concreta. El diseño original de la pieza, hecho en
Canva, usa **Anantason Wd50** — una condensada comercial de la fundición Jipatype
(Bangkok) cuya licencia no cubre el uso como fuente web: la licencia de Canva
habilita el uso dentro de Canva, no servir el archivo desde un sitio. Archivo al
62% es la aproximación más cercana con licencia SIL, sin costo ni restricción.

La escala tipográfica y los anchos de columna están tomados directamente del PDF
del diseño: cada regla lleva en un comentario la medida de la que salió, en
puntos y como porcentaje del ancho de la página de referencia (1024,5pt).

Si UNAULA adquiere la licencia webfont de Anantason, el cambio es acotado:
agregar la regla `@font-face`, sustituir `"Archivo"` en la declaración de `body`
y eliminar las reglas `font-stretch` — Anantason Wd50 ya viene condensada de
fábrica y no necesita el eje de ancho.

La fuente se carga desde Google Fonts con el `<link>` del `<head>`. Para quitar
esa dependencia externa —recomendable si el sitio va a vivir en una red cerrada—
se descarga Archivo desde <https://fonts.google.com/specimen/Archivo>, se deja en
`assets/fonts/` y se reemplaza el `<link>` por una regla `@font-face`.

## Pendientes

- [ ] Configurar `URL_INSCRIPCION` con la dirección real del formulario
- [ ] Reemplazar el banner y las imágenes por las piezas gráficas definitivas
- [ ] Completar los campos marcados `[PENDIENTE]`: horario, correo de contacto, enlace a la política de datos
- [ ] Definir la agenda del evento
- [ ] Cargar las seis historias de éxito
- [ ] Quitar la etiqueta `<meta name="robots" content="noindex, nofollow">` al publicar en el dominio oficial

## Publicación en GitHub Pages

**Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**

No hace falta GitHub Actions: el sitio es estático y no requiere compilación.
Cada `push` a `main` republica automáticamente.

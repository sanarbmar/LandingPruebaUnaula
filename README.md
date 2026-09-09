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

## Pie de página

El pie lleva los siete perfiles de UNAULA (Facebook, Instagram, X, LinkedIn,
Threads, YouTube y Spotify), el correo de comunicaciones y los datos
institucionales. Las direcciones están escritas directamente en el `<footer>` de
`index.html`.

**Los iconos ya están en el repositorio**, en `assets/img/social/`. Seis vienen de
[Simple Icons](https://simpleicons.org), que los publica bajo CC0. Para
regenerarlos —o para pedirlos en otro color— desde la raíz del repositorio:

```powershell
$destino = "assets\img\social"
foreach ($red in "facebook","instagram","x","threads","youtube","spotify") {
  Invoke-WebRequest "https://cdn.simpleicons.org/$red/1A1A1A" -OutFile "$destino\$red.svg"
}
```

El sufijo `/1A1A1A` pide el icono en el gris oscuro del pie; cambiando ese
hexadecimal se obtiene en cualquier otro color.

**LinkedIn va aparte.** Pidió a Simple Icons que retirara su icono, así que no
está en ese catálogo. Su logo se descarga de <https://brand.linkedin.com/in-logo>:
sus condiciones permiten usarlo como enlace a una página de empresa, pero sólo
admiten azul, negro o blanco y prohíben recolorearlo. Por eso el archivo del
repositorio es `linkedin.png`, la versión negra oficial sin retocar — el pie
prueba primero `.svg` y luego `.png`, así que funciona igual.

Si algún icono llegara a faltar, su botón se muestra como una pastilla con el
nombre de la red: la página no se rompe y el enlace sigue funcionando.

Los iconos son marcas registradas de sus dueños. Se usan para enlazar a los
perfiles oficiales de UNAULA, que es el uso que contemplan las guías de marca de
cada plataforma.

## Pendientes

- [ ] Configurar `URL_INSCRIPCION` con la dirección real del formulario
- [ ] Reemplazar el banner y las imágenes por las piezas gráficas definitivas
- [ ] Completar los campos marcados `[PENDIENTE]`: horario, correo de contacto, enlace a la política de datos
- [ ] Definir la agenda del evento
- [ ] Cargar las seis historias de éxito
- [ ] Quitar la etiqueta `<meta name="robots" content="noindex, nofollow">` del `<head>` al publicar en el dominio oficial de UNAULA. Está puesta a propósito: mientras la landing viva en un dominio provisional no debe aparecer en buscadores, porque su botón de inscripción todavía no lleva a ningún formulario
- [ ] Definir las horas de las cuatro actividades que hoy dicen "Por confirmar" en el arreglo `AGENDA`

## Publicación en GitHub Pages

**Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**

No hace falta GitHub Actions: el sitio es estático y no requiere compilación.
Cada `push` a `main` republica automáticamente.

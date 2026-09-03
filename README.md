# Landing — Encuentro de Egresados UNAULA 60 Años

Página de bienvenida e inscripción para el Encuentro de Egresados de los 60 años de UNAULA.
Prototipo funcional (MVP) construido por **Magna** para presentación al cliente.

**Evento:** viernes 6 de noviembre de 2026 · Plaza Mayor Medellín

---

## Cómo verlo

El sitio se publica con GitHub Pages en:

`https://sanarbmar.github.io/LandingPruebaUnaula/`

No requiere cuenta de Google ni de ningún tipo: es una página estática.

## Cómo funciona

```
1. El egresado abre la página
2. Escribe su número de documento  →  el sistema lo busca en la base
3. Ve sus datos y confirma
4. Llega a Microsoft Forms con los cinco campos ya diligenciados; solo pulsa Enviar
5. Un flujo de Power Automate marca la inscripción en la base y actualiza el conteo
```

## Cédulas de prueba

Los datos son **ficticios**, creados para la demostración. No hay información real de egresados.

| Documento | Qué demuestra |
|---|---|
| `1017234891` | Caso normal: recorrido completo hasta el formulario prellenado |
| `43567120` | Nombres con tildes y eñes viajan íntegros al formulario |
| `1128907456` | Egresado ya inscrito: no genera duplicados |
| `9999999999` | Documento no encontrado |
| `123` | Formato inválido |

Agrega `?confirmado=1` a la URL para ver la pantalla de confirmación.

## Estructura del repositorio

| Archivo | Para qué sirve |
|---|---|
| **`index.html`** | **Todo el sitio.** HTML, CSS y JavaScript en un solo archivo, sin dependencias |
| `.nojekyll` | Le indica a GitHub Pages que sirva los archivos tal cual, sin procesarlos |
| `src/`, `package.json`, `vite.config.ts`, `tsconfig.json`, `.env.example` | Andamiaje de React/Vite que dejó Google AI Studio. **No se usa:** `index.html` no lo carga y `App.tsx` está vacío. Se puede borrar |

No hay paso de compilación. `index.html` se abre con doble clic y funciona.

## Configuración

Todo lo que cambia entre eventos está en el objeto `CONFIG`, al inicio del `<script>` de `index.html`:

- `evento` — nombre, fecha, hora, lugar
- `institucion` — datos de contacto y enlaces
- `secciones` — banderas para ocultar agenda, historias de éxito o PQRS
- `forms` — URL e identificadores del formulario de Microsoft
- `api` — URL del flujo de consulta (solo en modo producción)
- `modo` — `"demo"` lee los datos embebidos; `"produccion"` consulta el flujo de Power Automate

> **No modifiques `forms.campos`.** Son los identificadores que Microsoft Forms genera para el prellenado por URL. Si se editan las preguntas del formulario, hay que volver a generar el vínculo con relleno previo y actualizar estos valores.

## Pendientes

- [ ] Reemplazar el banner y las imágenes por las piezas gráficas definitivas
- [ ] Completar los campos marcados `[PENDIENTE]`: pabellón, horario, correo de contacto, enlace a la política de datos
- [ ] Definir la agenda del evento (sección 8)
- [ ] Cargar las seis historias de éxito
- [ ] Migrar la base de consulta a una lista de SharePoint (15.000 registros) y montar el flujo de consulta
- [ ] Reponer una barrera de verificación antes de producción: hoy la consulta por documento está abierta
- [ ] Quitar la etiqueta `<meta name="robots" content="noindex, nofollow">` al publicar en el dominio oficial

## Publicación en GitHub Pages

**Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**

No hace falta GitHub Actions: el sitio es estático y no requiere compilación. Cada `push` a `main` republica automáticamente.

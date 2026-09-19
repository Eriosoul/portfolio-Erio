# Portfolio — Andrei Constantin Apostol

Portfolio personal en React 18 + TypeScript + Vite + TailwindCSS, con contenido
bilingüe (español / inglés).

Publicado en <https://eriosoul.github.io/portfolio-Erio/>.

## Requisitos

El proyecto usa **pnpm**. La versión está fijada en `packageManager` dentro de
`package.json`, así que con Corepack basta:

```bash
corepack enable
pnpm install
```

## Scripts

| Script | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción en `dist/` |
| `pnpm preview` | Sirve el build local |
| `pnpm lint` | ESLint sobre `.js`, `.jsx`, `.ts` y `.tsx` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm deploy` | Build y publicación en la rama `gh-pages` |

`base` está en `vite.config.js` (`/portfolio-Erio/`), no en los scripts, para que
`dev`, `build` y `preview` usen todos el mismo valor.

## Dónde se edita el contenido

El contenido está separado en dos sitios, y ninguno de los dos es un componente:

- **`src/data/cv.ts`** — lo que no depende del idioma: fechas, enlaces,
  tecnologías, repositorios. Cada entrada tiene un `id`.
- **`src/i18n/es.ts`** y **`src/i18n/en.ts`** — todo el texto traducible,
  referenciado por ese mismo `id`.

Para añadir un empleo, un estudio o un proyecto: añade la entrada en `cv.ts` con
un `id` nuevo y luego el texto correspondiente en **los dos** ficheros de idioma.
TypeScript avisa si el `id` no encaja.

Las fechas se guardan como `YYYY-MM` y se formatean según el idioma activo
(`useFormatPeriod` en `src/i18n/hooks.ts`). `end: null` significa "hasta hoy".

## i18n

`i18next` + `react-i18next`, con detección automática por navegador y la
elección del visitante guardada en `localStorage`. El botón de idioma está en la
cabecera. Al cambiar de idioma se actualizan también `<html lang>` y el título de
la pestaña.

## Notas de diseño

- Las secciones usan `min-h-screen`, no `h-screen`, y el scroll-snap solo se
  activa desde `md`: en móvil el contenido es más alto que la pantalla.
- Los logos son insignias generadas con la inicial, no imágenes enlazadas desde
  dominios de terceros.
- La animación Lottie se carga con `React.lazy` porque pesa más que el resto de
  la aplicación junta.

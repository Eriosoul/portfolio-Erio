import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// El sitio se publica en https://eriosoul.github.io/portfolio-Erio/, asi que
// necesita ese base path. Va aqui y no en el script de build para que `dev`,
// `build` y `preview` usen exactamente el mismo valor.
// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio-Erio/',
  plugins: [react()],
})

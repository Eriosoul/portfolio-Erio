import { motion } from 'framer-motion';

const rings = [
    'h-[240px] w-[240px] border-accent/50',
    'h-[380px] w-[380px] border-white/5',
    'h-[540px] w-[540px] border-accent/20',
    'h-[720px] w-[720px] border-white/5',
];

/**
 * Anillos decorativos.
 *
 * El contenedor es un punto de tamano cero situado en el centro del elemento
 * posicionado que lo envuelve, y cada anillo se centra sobre ese punto. Asi los
 * circulos quedan concentricos con lo que envuelva al componente (la foto), sin
 * depender de la altura del resto del contenido de la seccion.
 */
export default function BackgroundCircles() {
    return (
        <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
        >
            {rings.map((ring) => (
                <div
                    key={ring}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${ring}`}
                />
            ))}
            {/* El centrado va en el envoltorio y la animacion dentro: `animate-ping`
                usa `transform: scale()` y machacaria las clases -translate-*. */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-[240px] w-[240px] animate-ping rounded-full border border-accent/20" />
            </div>
        </motion.div>
    );
}

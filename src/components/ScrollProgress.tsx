import { motion, useScroll, useSpring } from 'framer-motion';
import type { RefObject } from 'react';

export default function ScrollProgress({ target }: { target: RefObject<HTMLElement> }) {
    // El scroll vive en un contenedor propio, no en el documento: hay que
    // pasarle `container` o la barra no se mueve nunca.
    const { scrollYProgress } = useScroll({ container: target, layoutEffect: false });
    const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
        />
    );
}

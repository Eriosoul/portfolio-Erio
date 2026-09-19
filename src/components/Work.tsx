import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { work } from '../data/cv';
import Carousel from './Carousel';
import WorkCard from './WorkCard';
import { SectionHeading } from './ui';
import { useScrollContainer } from '../hooks/scroll-container';

export default function Work() {
    const { t } = useTranslation();
    const container = useScrollContainer();

    const sectionRef = useRef<HTMLElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLUListElement>(null);

    // Cuanto hay que desplazar la pista para ver la ultima tarjeta. Es tambien
    // el alto extra que se le da a la seccion, para que el recorrido vertical
    // y el lateral vayan 1:1 y el gesto se sienta natural.
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const measure = () => {
            setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(viewport);
        observer.observe(track);
        return () => observer.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        container,
        offset: ['start start', 'end end'],
        // El ref del contenedor se crea en App: sin esto framer-motion lo lee
        // antes de que el nodo exista y avisa de que no esta hidratado.
        layoutEffect: false,
    });

    // `distance` se mide despues del montaje. Con la forma de rangos,
    // useTransform se queda con el [0, -0] inicial y la pista nunca se mueve;
    // la forma de funcion lee el valor vigente en cada frame.
    const distanceRef = useRef(0);
    distanceRef.current = distance;
    const x = useTransform(scrollYProgress, (progress) => -progress * distanceRef.current);

    // Reposicionar tambien cuando cambia la medida sin que haya scroll
    // (rotar el movil, redimensionar la ventana).
    useEffect(() => {
        x.set(-scrollYProgress.get() * distance);
    }, [distance, x, scrollYProgress]);

    return (
        <section
            ref={sectionRef}
            id="work"
            style={{ '--pin': `${distance}px` } as CSSProperties}
            className="border-t border-line/70 md:h-[calc(100dvh_+_var(--pin))]"
        >
            {/* Movil: carrusel deslizable. Fijar la seccion en un telefono
                secuestra el scroll y deja contenido inalcanzable. */}
            <div className="px-5 py-20 md:hidden">
                <div className="mx-auto flex max-w-content flex-col gap-10">
                    <SectionHeading title={t('work.title')} />
                    <Carousel
                        label={t('carousel.label')}
                        items={work}
                        getKey={(job) => job.id}
                        getLabel={(job) => job.company}
                    >
                        {(job) => <WorkCard job={job} />}
                    </Carousel>
                </div>
            </div>

            {/* Tablet y escritorio: la seccion se queda fija y el scroll
                vertical se traduce en avance lateral por las experiencias. */}
            <div className="sticky top-16 hidden h-[calc(100dvh_-_4rem)] flex-col justify-center gap-8 md:flex">
                <div className="mx-auto w-full max-w-content px-8">
                    <SectionHeading title={t('work.title')} />
                </div>

                <div ref={viewportRef} className="mx-auto w-full max-w-content overflow-hidden px-8">
                    <motion.ul ref={trackRef} style={{ x }} className="flex w-max gap-6">
                        {work.map((job) => (
                            <li
                                key={job.id}
                                className="flex h-[min(36rem,calc(100dvh_-_16rem))] w-[calc(100vw_-_6rem)] max-w-[26rem] shrink-0 lg:max-w-[30rem]"
                            >
                                <WorkCard job={job} />
                            </li>
                        ))}
                    </motion.ul>
                </div>

                <div className="mx-auto w-full max-w-content px-8">
                    <div className="h-0.5 w-full overflow-hidden rounded-full bg-line">
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="h-full w-full origin-left bg-accent"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projectsByLanguage, type ProjectItem } from '../data/cv';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import { SectionHeading } from './ui';
import { useScrollContainer } from '../hooks/scroll-container';

type TrackEntry =
    | { kind: 'label'; key: string; language: string }
    | { kind: 'card'; key: string; project: ProjectItem };

/**
 * Numeracion de las tarjetas. Sigue el orden agrupado en que se muestran, no
 * el del array de datos: si no, dentro de un grupo saldria 01, 03, 04.
 */
const positionOf = new Map(
    projectsByLanguage.flatMap((group) => group.items).map((project, i) => [project.id, i]),
);

/** Separador de lenguaje seguido de sus tarjetas, en una sola lista. */
const trackItems: TrackEntry[] = projectsByLanguage.flatMap((group) => [
    { kind: 'label', key: `label-${group.language}`, language: group.language },
    ...group.items.map((project) => ({ kind: 'card' as const, key: project.id, project })),
]);

export default function Projects() {
    const { t } = useTranslation();
    const container = useScrollContainer();
    const [selected, setSelected] = useState<ProjectItem | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLUListElement>(null);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const measure = () => setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
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
        layoutEffect: false,
    });

    // Al reves que Experiencia: la pista arranca desplazada a la izquierda y
    // avanza hacia la derecha, asi que el recorrido va de derecha a izquierda.
    const distanceRef = useRef(0);
    distanceRef.current = distance;
    const x = useTransform(scrollYProgress, (progress) => distanceRef.current * (progress - 1));

    useEffect(() => {
        x.set(distance * (scrollYProgress.get() - 1));
    }, [distance, x, scrollYProgress]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            style={{ '--pin': `${distance}px` } as CSSProperties}
            className="border-t border-line/70 md:h-[calc(100dvh_+_var(--pin))]"
        >
            {/* Movil: rejilla normal. Fijar la seccion en un telefono secuestra
                el scroll y deja contenido inalcanzable. */}
            <div className="px-5 py-20 md:hidden">
                <div className="mx-auto flex max-w-content flex-col gap-10">
                    <SectionHeading title={t('projects.title')} />
                    {projectsByLanguage.map((group) => (
                        <div key={group.language} className="flex flex-col gap-4">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
                                {group.language}
                            </h3>
                            <div className="grid gap-5 sm:grid-cols-2">
                                {group.items.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={positionOf.get(project.id) ?? 0}
                                        onOpenDetails={setSelected}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tablet y escritorio: seccion fijada con recorrido lateral. */}
            <div className="sticky top-16 hidden h-[calc(100dvh_-_4rem)] flex-col justify-center gap-8 md:flex">
                <div className="mx-auto w-full max-w-content px-8">
                    <SectionHeading title={t('projects.title')} />
                </div>

                <div ref={viewportRef} className="mx-auto w-full max-w-content overflow-hidden px-8">
                    {/* flex-row-reverse: el primer elemento del DOM queda a la
                        derecha, que es por donde empieza el recorrido. */}
                    <motion.ul ref={trackRef} style={{ x }} className="flex w-max flex-row-reverse gap-6">
                        {trackItems.map((entry) =>
                            entry.kind === 'label' ? (
                                <li
                                    key={entry.key}
                                    aria-hidden="true"
                                    className="flex w-6 shrink-0 items-stretch justify-center py-8"
                                >
                                    <span className="w-px bg-line" />
                                </li>
                            ) : (
                                <li
                                    key={entry.key}
                                    className="flex h-[min(32rem,calc(100dvh_-_16rem))] w-[22rem] shrink-0 lg:w-[24rem]"
                                >
                                    <ProjectCard
                                        project={entry.project}
                                        index={positionOf.get(entry.project.id) ?? 0}
                                        onOpenDetails={setSelected}
                                    />
                                </li>
                            ),
                        )}
                    </motion.ul>
                </div>

                <div className="mx-auto w-full max-w-content px-8">
                    <div className="h-0.5 w-full overflow-hidden rounded-full bg-line">
                        {/* origin-right: la barra crece en el mismo sentido que el recorrido. */}
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="h-full w-full origin-right bg-accent"
                        />
                    </div>
                </div>
            </div>

            <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        </section>
    );
}

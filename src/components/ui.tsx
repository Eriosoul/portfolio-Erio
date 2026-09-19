import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Seccion de contenido.
 *
 * Ya no son pantallas completas con scroll-snap: con el contenido real del CV
 * (listas de seis puntos, ocho bloques de stack) las secciones son mas altas
 * que el viewport, y el snap obligatorio peleaba con la lectura. Ritmo vertical
 * generoso y scroll normal.
 */
export function Section({
    id,
    title,
    centered = false,
    children,
}: {
    id: string;
    title: string;
    /** Centra el encabezado y el contenido. Para la seccion de cierre. */
    centered?: boolean;
    children: ReactNode;
}) {
    return (
        <section id={id} className="border-t border-line/70 px-5 py-20 sm:px-8 md:py-28">
            <div
                className={`mx-auto flex max-w-content flex-col gap-10 ${
                    centered ? 'items-center' : ''
                }`}
            >
                <SectionHeading title={title} centered={centered} />
                {children}
            </div>
        </section>
    );
}


/** Titulo de seccion. Extraido para que la seccion fijada de Experiencia,
 *  que no usa <Section>, comparta exactamente el mismo encabezado. */
export function SectionHeading({
    title,
    centered = false,
}: {
    title: string;
    centered?: boolean;
}) {
    return (
        <header className="flex w-full items-center gap-5">
            {centered && <span aria-hidden="true" className="h-px flex-1 bg-line" />}
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </header>
    );
}

export function TagList({ items }: { items: readonly string[] }) {
    return (
        <ul className="flex flex-wrap gap-1.5">
            {items.map((tag) => (
                <li
                    key={tag}
                    className="rounded-md border border-line bg-elevated px-2 py-0.5 text-xs text-fg-muted"
                >
                    {tag}
                </li>
            ))}
        </ul>
    );
}

/**
 * Insignia con la inicial. Reemplaza los logos que se enlazaban desde
 * dominios ajenos (varios devolvian 403/400 y no se veian).
 */
export function InitialBadge({
    name,
    label,
    className = '',
}: {
    name: string;
    /** Texto corto en lugar de la inicial, p. ej. las siglas de un titulo. */
    label?: string;
    className?: string;
}) {
    return (
        <div
            aria-hidden="true"
            className={`grid shrink-0 place-items-center rounded-xl bg-accent-soft font-semibold text-accent ring-1 ring-accent/25 ${className}`}
        >
            {label ?? name.trim().charAt(0).toUpperCase()}
        </div>
    );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={`card-hover rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6 ${className}`}
        >
            {children}
        </motion.article>
    );
}

import { useEffect, useState } from 'react';

/**
 * Devuelve el id de la seccion visible.
 *
 * El scroll no ocurre en el documento sino en un contenedor propio, asi que el
 * IntersectionObserver necesita ese elemento como `root`; con el root por
 * defecto la seccion activa se quedaba siempre en la primera.
 */
export function useActiveSection(ids: readonly string[], rootId: string): string {
    const [active, setActive] = useState(ids[0] ?? '');

    useEffect(() => {
        const root = document.getElementById(rootId);
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (!root || sections.length === 0) return;

        const visibility = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
                });

                let best = '';
                let bestRatio = 0;
                visibility.forEach((ratio, id) => {
                    if (ratio > bestRatio) {
                        bestRatio = ratio;
                        best = id;
                    }
                });

                if (best) setActive(best);
            },
            {
                root,
                // Descontar la cabecera fija para que la seccion activa cambie
                // cuando el titulo cruza el borde inferior de la barra.
                rootMargin: '-72px 0px 0px 0px',
                threshold: [0.1, 0.25, 0.5, 0.75],
            },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [ids, rootId]);

    return active;
}

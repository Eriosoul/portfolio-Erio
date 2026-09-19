import { createContext, useContext, type RefObject } from 'react';

/**
 * El scroll de la pagina ocurre dentro de un div propio, no en el documento.
 * framer-motion necesita ese elemento (`container`) para calcular el progreso,
 * asi que la referencia se comparte desde App por contexto.
 *
 * Sin componentes en este fichero: mezclarlos con hooks rompe Fast Refresh.
 */
export const ScrollContainerContext = createContext<RefObject<HTMLDivElement> | null>(null);

export function useScrollContainer(): RefObject<HTMLDivElement> | undefined {
    return useContext(ScrollContainerContext) ?? undefined;
}

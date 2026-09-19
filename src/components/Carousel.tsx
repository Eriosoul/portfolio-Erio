import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

interface CarouselProps<T> {
    /** Nombre accesible del carrusel. */
    label: string;
    items: readonly T[];
    /** Clave estable de cada elemento. */
    getKey: (item: T) => string;
    /** Nombre legible, para el aria-label de cada punto. */
    getLabel: (item: T) => string;
    children: (item: T) => ReactNode;
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Carousel<T>({
    label,
    items,
    getKey,
    getLabel,
    children,
}: CarouselProps<T>) {
    const { t } = useTranslation();
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const cards = useCallback(
        () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>('[data-card]') ?? []),
        [],
    );

    // El indice activo se deduce de la posicion real del scroll, asi que se
    // mantiene correcto tanto si navegas con las flechas como si deslizas.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const centre = track.scrollLeft + track.clientWidth / 2;
                let nearest = 0;
                let shortest = Infinity;
                cards().forEach((card, i) => {
                    const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
                    if (distance < shortest) {
                        shortest = distance;
                        nearest = i;
                    }
                });
                setIndex(nearest);
            });
        };

        track.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            track.removeEventListener('scroll', onScroll);
        };
    }, [cards]);

    const goTo = (target: number) => {
        const track = trackRef.current;
        const card = cards()[target];
        if (!track || !card) return;

        // Centrar la tarjeta dentro de la pista, sin tocar el scroll de la pagina.
        track.scrollTo({
            left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        });
    };

    const atStart = index === 0;
    const atEnd = index === items.length - 1;

    const arrowClass =
        'grid h-10 w-10 place-items-center rounded-full bg-elevated text-fg-muted ring-1 ring-white/10 transition enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-30';

    return (
        <div className="flex w-full max-w-5xl flex-col gap-4">
            <div
                ref={trackRef}
                role="group"
                aria-label={label}
                tabIndex={0}
                className="flex snap-x snap-mandatory items-start gap-5 overflow-x-auto scroll-smooth pb-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/60"
            >
                {items.map((item) => (
                    <div
                        key={getKey(item)}
                        data-card
                        className="w-[86vw] shrink-0 snap-center sm:w-[32rem] md:w-[38rem] lg:w-[44rem]"
                    >
                        {children(item)}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    disabled={atStart}
                    aria-label={t('carousel.previous')}
                    className={arrowClass}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>

                <ul className="flex items-center gap-2">
                    {items.map((item, i) => (
                        <li key={getKey(item)}>
                            <button
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={t('carousel.goTo', { name: getLabel(item) })}
                                aria-current={i === index}
                                className={`h-2 rounded-full transition-all ${
                                    i === index ? 'w-6 bg-accent' : 'w-2 bg-white/25 hover:bg-white/40'
                                }`}
                            />
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    disabled={atEnd}
                    aria-label={t('carousel.next')}
                    className={arrowClass}
                >
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}

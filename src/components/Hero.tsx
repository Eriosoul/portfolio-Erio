import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useTranslation } from 'react-i18next';
import BackgroundCircles from './BackgroundCircles';
import { profile } from '../data/cv';
import { useTranslatedList } from '../i18n/hooks';

function Typewriter({ words }: { words: string[] }) {
    const [text] = useTypewriter({ words, loop: true, delaySpeed: 2200 });
    return (
        <>
            <span>{text}</span>
            <Cursor cursorColor={profile.accent} />
        </>
    );
}

export default function Hero() {
    const { t, i18n } = useTranslation();
    const list = useTranslatedList();

    return (
        <section
            id="hero"
            className="relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center sm:px-8"
        >
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Los anillos se anclan a este contenedor, que mide justo lo
                    que la foto: quedan concentricos con ella. */}
                <div className="relative flex items-center justify-center">
                    <BackgroundCircles />
                    <img
                        // La foto anterior venia de media.licdn.com con un token que
                        // caduco en abril de 2024: daba 403 y no se veia.
                        src={profile.avatar}
                        alt={profile.name}
                        width={160}
                        height={160}
                        className="relative h-24 w-24 rounded-full object-cover shadow-lift ring-1 ring-accent/30 sm:h-32 sm:w-32"
                    />
                </div>

                {/* El titular de la pagina va antes que cualquier h2: antes el
                    subtitulo era un <h2> encima del <h1> y rompia la jerarquia. */}
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                        {profile.name}
                    </h1>
                    <p className="text-xs uppercase tracking-[0.35em] text-fg-subtle sm:text-sm">
                        {t('hero.subtitle')}
                    </p>
                </div>

                <p className="min-h-[3.5rem] max-w-xl text-lg text-accent sm:min-h-[2.5rem] sm:text-2xl">
                    {/* Remontar al cambiar de idioma para que recargue las frases. */}
                    <Typewriter key={i18n.resolvedLanguage} words={list('hero.roles')} />
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href="#work"
                        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
                    >
                        {t('hero.viewWork')}
                    </a>
                    <a
                        href="#contact"
                        className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-fg-muted transition-colors hover:border-accent-muted hover:text-accent"
                    >
                        {t('hero.contact')}
                    </a>
                </div>
            </div>

            <a
                // Antes era <Link to="About"> de react-router, pero la app no
                // declara ninguna ruta: llevaba a #/About y no pasaba nada.
                href="#about"
                aria-label={t('hero.scroll')}
                className="absolute bottom-8 z-10 animate-bounce rounded-full p-2 text-accent"
            >
                <ArrowDownIcon className="h-5 w-5" />
            </a>
        </section>
    );
}

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Study from './components/Study';
import Stack from './components/Stack';
import Projects from './components/Projects';
import ContactMe from './components/ContactMe';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { SCROLL_ROOT_ID } from './data/sections';
import { ScrollContainerContext } from './hooks/scroll-container';

export default function App() {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* Primer tabulador de la pagina: saltar la cabecera repetida. */}
            <a
                href="#content"
                className="sr-only rounded-md bg-accent px-4 py-2 text-sm font-semibold text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
            >
                {t('nav.skipToContent')}
            </a>

            <ScrollProgress target={scrollRef} />

            <div
                ref={scrollRef}
                id={SCROLL_ROOT_ID}
                className="relative h-[100dvh] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            >
                <ScrollContainerContext.Provider value={scrollRef}>
                    <Header />
                    <main id="content">
                        <Hero />
                        <About />
                        <Work />
                        <Study />
                        <Stack />
                        <Projects />
                        <ContactMe />
                    </main>
                    <Footer />
                </ScrollContainerContext.Provider>
            </div>
        </>
    );
}

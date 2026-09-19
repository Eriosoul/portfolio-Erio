import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { SocialIcon } from 'react-social-icons';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/cv';
import { SCROLL_ROOT_ID, sectionIds, sections } from '../data/sections';
import { supportedLngs } from '../i18n';
import { useActiveSection } from '../hooks/useActiveSection';

export default function Header() {
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const active = useActiveSection(sectionIds, SCROLL_ROOT_ID);

    // Cerrar el menu movil con Escape, como cualquier overlay.
    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [menuOpen]);

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-5 sm:px-8">
                <a
                    href="#hero"
                    className="shrink-0 rounded text-sm font-semibold tracking-tight text-fg transition-colors hover:text-accent"
                >
                    Andrei<span className="text-accent">.</span>
                </a>

                <nav aria-label={t('nav.sections')} className="hidden lg:block">
                    <ul className="flex items-center gap-1">
                        {sections.map((section) => {
                            const isActive = active === section.id;
                            return (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                                            isActive ? 'text-accent' : 'text-fg-muted hover:text-fg'
                                        }`}
                                    >
                                        {t(section.titleKey)}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="flex shrink-0 items-center gap-1">
                    {/* Con tres idiomas un boton de alternar ya no sirve:
                        control segmentado con el activo marcado. */}
                    <div
                        role="group"
                        aria-label={t('nav.toggleLanguage')}
                        className="flex items-center overflow-hidden rounded-md border border-line"
                    >
                        {supportedLngs.map((lng) => {
                            const isActive = i18n.resolvedLanguage === lng;
                            return (
                                <button
                                    key={lng}
                                    type="button"
                                    onClick={() => void i18n.changeLanguage(lng)}
                                    aria-pressed={isActive}
                                    className={`px-1.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider transition-colors sm:px-2 sm:text-xs ${
                                        isActive
                                            ? 'bg-accent-soft text-accent'
                                            : 'text-fg-subtle hover:text-fg'
                                    }`}
                                >
                                    {lng}
                                </button>
                            );
                        })}
                    </div>

                    <div className="hidden items-center sm:flex">
                        <SocialIcon
                            url={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('nav.github')}
                            fgColor="#a1a7ae"
                            bgColor="transparent"
                            style={{ height: 34, width: 34 }}
                        />
                        <SocialIcon
                            url={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('nav.linkedin')}
                            fgColor="#a1a7ae"
                            bgColor="transparent"
                            style={{ height: 34, width: 34 }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        className="rounded-md p-1.5 text-fg-muted transition-colors hover:text-accent lg:hidden"
                    >
                        {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav
                    id="mobile-nav"
                    aria-label={t('nav.sections')}
                    className="border-t border-line bg-canvas lg:hidden"
                >
                    <ul className="mx-auto flex max-w-content flex-col px-5 py-2">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    onClick={() => setMenuOpen(false)}
                                    aria-current={active === section.id ? 'true' : undefined}
                                    className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                                        active === section.id
                                            ? 'bg-accent-soft text-accent'
                                            : 'text-fg-muted hover:text-fg'
                                    }`}
                                >
                                    {t(section.titleKey)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}

import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { languages, profile } from '../data/cv';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-line px-5 py-10 sm:px-8">
            <div className="mx-auto flex max-w-content flex-col gap-6">
                {/* Los idiomas viven aqui y no en el stack tecnico: no son una
                    tecnologia, y en el pie acompanan a los datos de contacto. */}
                <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-baseline sm:gap-5 sm:text-left">
                    <h2 className="shrink-0 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                        {t('languages.title')}
                    </h2>
                    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-fg-muted sm:justify-start">
                        {languages.map((id) => (
                            <li key={id}>{t(`languages.${id}`)}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col items-center gap-4 border-t border-line/60 pt-6 text-center text-xs text-fg-subtle sm:flex-row sm:justify-between sm:text-left">
                    <p>
                        © {new Date().getFullYear()} {profile.name}
                    </p>

                    <p>{t('footer.builtWith')}</p>

                    <div className="flex items-center gap-4">
                        <a
                            href={profile.sourceRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded transition-colors hover:text-accent"
                        >
                            {t('footer.source')}
                        </a>
                        <a
                            href="#hero"
                            aria-label={t('footer.backToTop')}
                            className="grid h-8 w-8 place-items-center rounded-full border border-line transition-colors hover:border-accent-muted hover:text-accent"
                        >
                            <ArrowUpIcon className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

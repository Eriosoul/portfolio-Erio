import { useEffect, useRef } from 'react';
import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import type { ProjectItem } from '../data/cv';
import { colourFor, repoStats } from '../data/github-stats';
import LanguageBar from './LanguageBar';
import { InitialBadge, TagList } from './ui';

function formatSize(kilobytes: number, locale: string) {
    const megabytes = kilobytes / 1024;
    return megabytes >= 1
        ? `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(megabytes)} MB`
        : `${new Intl.NumberFormat(locale).format(kilobytes)} KB`;
}

export default function ProjectDialog({
    project,
    onClose,
}: {
    project: ProjectItem | null;
    onClose: () => void;
}) {
    const { t, i18n } = useTranslation();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const stats = project ? repoStats(project.name) : undefined;

    // <dialog> nativo: trae foco atrapado y backdrop propio.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (project && !dialog.open) dialog.showModal();
        if (!project && dialog.open) dialog.close();
    }, [project]);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            // Cerrar al pulsar fuera: el click en el backdrop llega al propio <dialog>.
            onClick={(event) => {
                if (event.target === dialogRef.current) dialogRef.current?.close();
            }}
            // <dialog> deberia cerrarse solo con Escape, pero no siempre llega
            // el evento de cancelacion; asi el cierre es determinista.
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    dialogRef.current?.close();
                }
            }}
            aria-labelledby="project-dialog-title"
            className="m-auto w-[min(38rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface p-0 text-fg shadow-lift backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        >
            {project && (
                <div className="flex max-h-[85dvh] flex-col">
                    {stats && <LanguageBar languages={stats.languages} className="h-1 rounded-none" />}

                    <header className="flex items-start gap-3 border-b border-line p-5">
                        <InitialBadge name={project.name} className="h-11 w-11 text-lg" />
                        <div className="min-w-0 flex-1">
                            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-fg-subtle">
                                <span
                                    aria-hidden="true"
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: colourFor(project.language) }}
                                />
                                {project.language}
                            </p>
                            <h2
                                id="project-dialog-title"
                                className="mt-1 break-words text-lg font-semibold"
                            >
                                {project.name}
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => dialogRef.current?.close()}
                            aria-label={t('projects.close')}
                            className="rounded-md p-1 text-fg-muted transition-colors hover:text-accent"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </header>

                    <div className="flex flex-col gap-5 overflow-y-auto p-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                        <p className="text-sm leading-relaxed text-fg-muted">
                            {t(`projects.${project.id}`)}
                        </p>

                        <TagList items={project.tags} />

                        {stats?.snippet && (
                            <section className="flex flex-col gap-2">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                                    {t('projects.code')}
                                </h3>
                                <div className="overflow-hidden rounded-lg border border-line bg-canvas">
                                    <p className="truncate border-b border-line px-4 py-2 font-mono text-xs text-fg-subtle">
                                        {stats.snippet.path}
                                    </p>
                                    {/* HTML generado por Shiki durante el build a partir
                                        del propio repositorio, no en tiempo de ejecucion. */}
                                    <div
                                        className="code-snippet"
                                        dangerouslySetInnerHTML={{ __html: stats.snippet.html }}
                                    />
                                </div>
                                {stats.snippet.truncated && (
                                    <p className="text-xs text-fg-subtle">
                                        {t('projects.codeNote', { lines: 26 })} {stats.snippet.path}
                                    </p>
                                )}
                            </section>
                        )}

                        {stats && (
                            <>
                                <section className="flex flex-col gap-2">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                                        {t('projects.languages')}
                                    </h3>
                                    <LanguageBar languages={stats.languages} className="h-2" />
                                    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted">
                                        {stats.languages.map((language) => (
                                            <li key={language.name} className="flex items-center gap-1.5">
                                                <span
                                                    aria-hidden="true"
                                                    className="h-2 w-2 rounded-full"
                                                    style={{ backgroundColor: colourFor(language.name) }}
                                                />
                                                {language.name} {language.percent}%
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <dl className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <dt className="text-xs uppercase tracking-wider text-fg-subtle">
                                            {t('projects.lastUpdate')}
                                        </dt>
                                        <dd className="mt-0.5 text-fg-muted">
                                            {new Intl.DateTimeFormat(i18n.language, {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            }).format(new Date(stats.pushedAt))}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs uppercase tracking-wider text-fg-subtle">
                                            {t('projects.repoSize')}
                                        </dt>
                                        <dd className="mt-0.5 text-fg-muted">
                                            {formatSize(stats.sizeKb, i18n.language)}
                                        </dd>
                                    </div>
                                </dl>
                            </>
                        )}
                    </div>

                    <footer className="border-t border-line p-5">
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
                        >
                            {t('projects.viewRepo')}
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        </a>
                    </footer>
                </div>
            )}
        </dialog>
    );
}

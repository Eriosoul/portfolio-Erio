import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { ProjectItem } from '../data/cv';
import { colourFor, repoStats } from '../data/github-stats';
import LanguageBar from './LanguageBar';
import { TagList } from './ui';

/** Tarjeta de proyecto. La comparten la rejilla movil y el carrusel fijado. */
export default function ProjectCard({
    project,
    index,
    onOpenDetails,
}: {
    project: ProjectItem;
    /** Posicion en el listado, se pinta como marca de agua. */
    index: number;
    onOpenDetails: (project: ProjectItem) => void;
}) {
    const { t, i18n } = useTranslation();
    const stats = repoStats(project.name);
    const accent = colourFor(project.language);

    const updated = stats
        ? new Intl.DateTimeFormat(i18n.language, { month: 'short', year: 'numeric' }).format(
              new Date(stats.pushedAt),
          )
        : null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-muted hover:shadow-lift"
        >
            {/* Filo superior con la distribucion real de lenguajes del repo. */}
            {stats ? (
                <LanguageBar languages={stats.languages} className="h-1 rounded-none" />
            ) : (
                <span className="h-1 w-full" style={{ backgroundColor: accent }} />
            )}

            <div className="flex flex-1 flex-col gap-4 p-5">
                <header className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-fg-subtle">
                            <span
                                aria-hidden="true"
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: accent }}
                            />
                            {project.language}
                        </p>
                        <h3 className="mt-1 break-words text-lg font-semibold leading-tight">
                            {project.name}
                        </h3>
                    </div>

                    <span
                        aria-hidden="true"
                        className="shrink-0 text-2xl font-semibold tabular-nums text-fg-subtle/25 transition-colors group-hover:text-accent/30"
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </header>

                <p className="min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed text-fg-muted scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                    {t(`projects.${project.id}`)}
                </p>

                <TagList items={project.tags} />

                {stats && (
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-3 text-xs text-fg-subtle">
                        <span>
                            {stats.languages[0].name} {stats.languages[0].percent}%
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            {t('projects.lastUpdate')} {updated}
                        </span>
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <button
                        type="button"
                        onClick={() => onOpenDetails(project)}
                        className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:border-accent-muted hover:text-accent"
                    >
                        {t('projects.details')}
                    </button>

                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                    >
                        {t('projects.viewRepo')}
                        <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}

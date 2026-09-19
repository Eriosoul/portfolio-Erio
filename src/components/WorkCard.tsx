import { useTranslation } from 'react-i18next';
import type { WorkItem } from '../data/cv';
import { Card, InitialBadge, TagList } from './ui';
import { useFormatPeriod, useTranslatedList } from '../i18n/hooks';

/** Tarjeta de un empleo. La comparten el carrusel movil y el fijado de escritorio. */
export default function WorkCard({ job }: { job: WorkItem }) {
    const { t } = useTranslation();
    const list = useTranslatedList();
    const formatPeriod = useFormatPeriod();

    return (
        <Card className="flex h-full flex-col gap-4">
            <header className="flex items-start gap-3">
                <InitialBadge name={job.company} className="h-11 w-11 text-lg" />
                <div className="min-w-0">
                    <h3 className="text-base font-semibold sm:text-lg">{job.company}</h3>
                    <p className="text-sm text-fg-muted">{t(`work.${job.id}.role`)}</p>
                    <p className="text-xs uppercase tracking-wider text-accent/80">
                        {formatPeriod(job.start, job.end)}
                    </p>
                </div>
            </header>

            <p className="text-sm leading-relaxed text-fg-subtle">{t(`work.${job.id}.summary`)}</p>

            {/* Si la tarjeta no cabe en la pantalla fijada, el listado hace su
                propio scroll en lugar de desbordar la seccion. */}
            <ul className="min-h-0 flex-1 list-disc space-y-2 overflow-y-auto pl-5 text-sm leading-relaxed text-fg-muted scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                {list(`work.${job.id}.points`).map((point) => (
                    <li key={point}>{point}</li>
                ))}
            </ul>

            <TagList items={job.tags} />
        </Card>
    );
}

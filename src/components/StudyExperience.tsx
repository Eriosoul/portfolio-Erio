import { useTranslation } from 'react-i18next';
import { study } from '../data/cv';
import { Card, InitialBadge, TagList } from './ui';
import { useFormatPeriod } from '../i18n/hooks';

export default function StudyExperience() {
    const { t } = useTranslation();
    const formatPeriod = useFormatPeriod();

    return (
        <div className="grid w-full gap-5 sm:grid-cols-2">
            {study.map((item) => (
                <Card key={item.id} className="flex flex-col gap-3">
                    <header className="flex items-start gap-3">
                        <InitialBadge
                            name={item.school}
                            label={item.code}
                            className="h-10 min-w-10 px-2 text-xs"
                        />
                        <div className="min-w-0">
                            {/* El titular es la titulacion, no el centro: es lo que
                                interesa de un vistazo. */}
                            <h3 className="text-base font-semibold leading-snug">
                                {t(`study.${item.id}`)}
                            </h3>
                            <p className="text-sm text-fg-muted">{item.school}</p>
                            <p className="text-xs uppercase tracking-wider text-accent/80">
                                {formatPeriod(item.start, item.end)}
                            </p>
                        </div>
                    </header>

                    <TagList items={item.tags} />
                </Card>
            ))}
        </div>
    );
}

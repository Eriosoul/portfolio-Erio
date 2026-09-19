import { useTranslation } from 'react-i18next';
import { stack } from '../data/cv';
import { Card, Section, TagList } from './ui';

export default function Stack() {
    const { t } = useTranslation();

    return (
        <Section id="stack" title={t('stack.title')}>
            <div className="grid w-full gap-4 sm:grid-cols-2">
                {stack.map((group) => (
                    <Card key={group.id} className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                            {t(`stack.${group.id}`)}
                        </h3>
                        <TagList items={group.tags} />
                    </Card>
                ))}
            </div>
        </Section>
    );
}

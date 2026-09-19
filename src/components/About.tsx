import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Section } from './ui';
import { useTranslatedList } from '../i18n/hooks';

const ScrapingAnimation = lazy(() => import('./ScrapingAnimation'));

export default function About() {
    const { t } = useTranslation();
    const list = useTranslatedList();

    return (
        <Section id="about" title={t('about.title')}>
            <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-28 shrink-0 sm:w-40 lg:w-56"
                >
                    <Suspense fallback={<div className="aspect-square w-full" />}>
                        <ScrapingAnimation />
                    </Suspense>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-4 text-left"
                >
                    <h3 className="text-xl font-semibold underline decoration-accent/50 sm:text-2xl">
                        {t('about.heading')}
                    </h3>

                    {list('about.body').map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-relaxed text-fg-muted sm:text-base">
                            {paragraph}
                        </p>
                    ))}

                    <p className="text-sm text-accent">{t('about.location')}</p>
                </motion.div>
            </div>
        </Section>
    );
}

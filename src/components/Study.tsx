import { useTranslation } from 'react-i18next';
import { Section } from './ui';
import StudyExperience from './StudyExperience';

export default function Study() {
    const { t } = useTranslation();
    return (
        <Section id="study" title={t('study.title')}>
            <StudyExperience />
        </Section>
    );
}

import { useTranslation } from 'react-i18next';

/**
 * `t()` devuelve string por defecto; para las claves que son arrays
 * (parrafos, bullets, roles del typewriter) hace falta `returnObjects`.
 */
export function useTranslatedList(): (key: string) => string[] {
    const { t } = useTranslation();
    return (key: string) => t(key, { returnObjects: true }) as unknown as string[];
}

/** Formatea 'YYYY-MM' como "mar 2025" / "Mar 2025" segun el idioma activo. */
export function useFormatPeriod(): (start: string, end: string | null) => string {
    const { t, i18n } = useTranslation();

    const formatMonth = (iso: string) => {
        const [year, month] = iso.split('-').map(Number);
        return new Intl.DateTimeFormat(i18n.language, {
            month: 'short',
            year: 'numeric',
        }).format(new Date(year, month - 1, 1));
    };

    return (start: string, end: string | null) =>
        `${formatMonth(start)} — ${end ? formatMonth(end) : t('work.present')}`;
}

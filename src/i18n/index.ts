import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './es';
import en from './en';
import ro from './ro';

export const supportedLngs = ['es', 'en', 'ro'] as const;
export type Lng = (typeof supportedLngs)[number];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en },
            ro: { translation: ro },
        },
        fallbackLng: 'es',
        supportedLngs: [...supportedLngs],
        interpolation: { escapeValue: false },
        detection: {
            // Respeta lo que el visitante eligio antes; si no, el idioma del navegador.
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;

// Mantiene <html lang> y el titulo de la pestana sincronizados con el idioma
// activo (lectores de pantalla y traductores del navegador dependen de lang).
const syncDocument = (lng: string) => {
    document.documentElement.lang = lng;
    const subtitle = i18n.t('hero.subtitle');
    document.title = `Andrei Constantin Apostol — ${subtitle}`;
};
syncDocument(i18n.resolvedLanguage ?? 'es');
i18n.on('languageChanged', syncDocument);

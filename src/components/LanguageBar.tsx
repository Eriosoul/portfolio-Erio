import type { LanguageShare } from '../data/github-stats';
import { colourFor } from '../data/github-stats';

/** Distribucion real de lenguajes del repositorio, en bytes segun GitHub. */
export default function LanguageBar({
    languages,
    className = 'h-1.5',
}: {
    languages: LanguageShare[];
    className?: string;
}) {
    return (
        <div
            className={`flex w-full overflow-hidden rounded-full bg-elevated ${className}`}
            role="img"
            aria-label={languages.map((l) => `${l.name} ${l.percent}%`).join(', ')}
        >
            {languages.map((language) => (
                <span
                    key={language.name}
                    style={{ width: `${language.percent}%`, backgroundColor: colourFor(language.name) }}
                />
            ))}
        </div>
    );
}

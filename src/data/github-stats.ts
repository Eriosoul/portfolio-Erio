import raw from './github-stats.json';

export interface LanguageShare {
    name: string;
    percent: number;
}

export interface CodeSnippet {
    /** Ruta del fichero dentro del repositorio. */
    path: string;
    /** HTML ya resaltado por Shiki durante el build. */
    html: string;
    truncated: boolean;
}

export interface RepoStats {
    pushedAt: string;
    sizeKb: number;
    languages: LanguageShare[];
    snippet?: CodeSnippet | null;
}

/**
 * Datos reales de GitHub, congelados en el build por `pnpm run sync:github`.
 * Se pintan al instante y el visitante no hace peticiones a terceros.
 */
const stats = raw as Record<string, RepoStats>;

export function repoStats(repoName: string): RepoStats | undefined {
    return stats[repoName];
}

/** Colores oficiales de GitHub para los lenguajes presentes en estos repos. */
export const languageColour: Record<string, string> = {
    Python: '#3572A5',
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C++': '#f34b7d',
    Batchfile: '#C1F12E',
    'Jupyter Notebook': '#DA5B0B',
    Shell: '#89e051',
    Dockerfile: '#384d54',
};

export function colourFor(language: string): string {
    return languageColour[language] ?? '#F7AB0A';
}

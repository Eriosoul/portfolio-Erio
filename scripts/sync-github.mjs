/**
 * Descarga de GitHub los datos de cada proyecto y los guarda en
 * src/data/github-stats.json.
 *
 * Incluye un fragmento de codigo real de cada repositorio, ya resaltado con
 * Shiki en tiempo de build: en el navegador no se carga ningun resaltador ni
 * se hace ninguna peticion a terceros.
 *
 * Se ejecuta a mano: `pnpm run sync:github`.
 * Con GITHUB_TOKEN en el entorno sube el limite de 60 peticiones/hora.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { codeToHtml } from 'shiki';

const OWNER = 'Eriosoul';
const REPOS = [
    'JarvisAgents',
    'EntrenamientoLabelingYOLO',
    'ChatBot_AI_Flask',
    'tfg_spider_web_py',
    'Java_Spring_API',
    'TFG-DAM',
    'AlmacenarDatosArchivos_cpp',
];

/** Extensiones que vale la pena enseñar, con su lenguaje para Shiki. */
const LANGS = {
    '.py': 'python',
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.js': 'javascript',
    '.jsx': 'jsx',
    '.java': 'java',
    '.cpp': 'cpp',
    '.cc': 'cpp',
    '.h': 'cpp',
    '.hpp': 'cpp',
};

const SKIP = /node_modules|\/dist\/|\/build\/|venv|\.min\.|test|spec|__pycache__/i;
const MAX_LINES = 26;

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'github-stats.json');

async function api(path) {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${path}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
        },
    });
    if (!response.ok) throw new Error(`${path}: GitHub respondio ${response.status}`);
    return response.json();
}

/** Elige el fichero fuente mas grande del repositorio, que suele ser el nucleo. */
async function pickSourceFile(repo) {
    const tree = await api(`${repo}/git/trees/HEAD?recursive=1`);
    const candidates = (tree.tree ?? [])
        .filter((node) => node.type === 'blob' && !SKIP.test(node.path))
        .filter((node) => LANGS[extname(node.path).toLowerCase()])
        .sort((a, b) => (b.size ?? 0) - (a.size ?? 0));
    return candidates[0] ?? null;
}

async function buildSnippet(repo) {
    const file = await pickSourceFile(repo);
    if (!file) return null;

    const blob = await api(`${repo}/git/blobs/${file.sha}`);
    const source = Buffer.from(blob.content, blob.encoding === 'base64' ? 'base64' : 'utf8').toString(
        'utf8',
    );

    const lines = source.split('\n');
    const truncated = lines.length > MAX_LINES;
    const code = lines.slice(0, MAX_LINES).join('\n').trimEnd();

    const html = await codeToHtml(code, {
        lang: LANGS[extname(file.path).toLowerCase()],
        theme: 'github-dark-default',
    });

    return { path: file.path, html, truncated };
}

const existing = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
const stats = { ...existing };

for (const repo of REPOS) {
    const entry = { ...(stats[repo] ?? {}) };

    if (!entry.pushedAt) {
        const [meta, languages] = await Promise.all([api(repo), api(`${repo}/languages`)]);
        const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
        entry.pushedAt = meta.pushed_at;
        entry.sizeKb = meta.size;
        entry.languages = Object.entries(languages)
            .map(([name, bytes]) => ({
                name,
                percent: total ? Number(((bytes / total) * 100).toFixed(1)) : 0,
            }))
            .sort((a, b) => b.percent - a.percent);
    }

    if (!entry.snippet) {
        try {
            entry.snippet = await buildSnippet(repo);
            console.log(`  ${repo.padEnd(28)} ${entry.snippet?.path ?? '(sin fuente)'}`);
        } catch (error) {
            // Un fallo puntual (limite de la API) no debe tirar todo lo demas.
            console.warn(`  ${repo.padEnd(28)} sin fragmento: ${error.message}`);
        }
    } else {
        console.log(`  ${repo.padEnd(28)} ${entry.snippet.path} (ya estaba)`);
    }

    stats[repo] = entry;
}

await writeFile(OUT, `${JSON.stringify(stats, null, 2)}\n`, 'utf8');
console.log(`\nEscrito ${OUT}`);

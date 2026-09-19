/** Id del contenedor que hace scroll (no es el documento). */
export const SCROLL_ROOT_ID = 'main-scroll';

/** Secciones navegables, en orden de aparicion. */
export const sections = [
    { id: 'about', titleKey: 'about.title' },
    { id: 'work', titleKey: 'work.title' },
    { id: 'study', titleKey: 'study.title' },
    { id: 'stack', titleKey: 'stack.title' },
    { id: 'projects', titleKey: 'projects.title' },
    { id: 'contact', titleKey: 'contact.title' },
] as const;

export const sectionIds = sections.map((section) => section.id);

/**
 * Datos del CV que NO dependen del idioma: fechas, enlaces, tecnologias.
 * Todo el texto traducible vive en src/i18n/{es,en}.ts, referenciado por `id`.
 */

export const profile = {
    name: 'Andrei Constantin Apostol',
    email: 'andrei.ca.dev@gmail.com',
    github: 'https://github.com/Eriosoul',
    linkedin: 'https://www.linkedin.com/in/acapostol',
    // El avatar anterior era una URL de media.licdn.com con token caducado (403).
    // El de GitHub no caduca.
    avatar: 'https://avatars.githubusercontent.com/u/50803166?v=4',
    accent: '#F7AB0A',
    sourceRepo: 'https://github.com/Eriosoul/portfolio-Erio',
} as const;

export interface Period {
    /** ISO corto: 'YYYY-MM'. `null` en `end` significa "hasta hoy". */
    start: string;
    end: string | null;
}

export interface WorkItem extends Period {
    id: 'blanch' | 'oversant' | 'enthec' | 'sermicro' | 'adalides' | 'ibermatica' | 'ineco';
    company: string;
    tags: string[];
}

export const work: WorkItem[] = [
    {
        id: 'blanch',
        company: 'Blanch Internacional',
        start: '2025-03',
        end: null,
        tags: [
            'Python', 'Flask', 'FastAPI', 'MongoDB', 'Sistemas multiagente', 'OpenAI',
            'Gemini', 'Ollama', 'llama.cpp', 'YOLOv8', 'ByteTrack', 'React 19',
            'TypeScript', 'WebSockets', 'MQTT', 'Docker',
        ],
    },
    {
        id: 'oversant',
        company: 'Oversant',
        start: '2024-03',
        end: '2024-10',
        tags: [
            'Python', 'GPT-2', 'Fine-tuning', 'Google Cloud Vision', 'Google Maps API',
            'Scikit-learn', 'Streamlit', 'YOLOv8', 'ByteTrack', 'AWS',
        ],
    },
    {
        id: 'enthec',
        company: 'Enthec',
        start: '2023-06',
        end: '2024-01',
        tags: ['Python', 'Web scraping', 'Kafka', 'Jenkins', 'Docker', 'Git'],
    },
    {
        id: 'sermicro',
        company: 'Sermicro S.L.',
        start: '2020-11',
        end: '2021-06',
        tags: ['CRM', 'Soporte N2', 'Google Analytics', 'Gestión de tickets'],
    },
    {
        id: 'adalides',
        company: 'Adalides S.L.',
        start: '2019-11',
        end: '2020-01',
        tags: ['Java', 'Android', 'XML', 'JSON', 'Navori'],
    },
    {
        id: 'ibermatica',
        company: 'Ibermática',
        start: '2018-06',
        end: '2018-09',
        tags: ['Java', 'SQL', 'JavaScript', 'JSON'],
    },
    {
        id: 'ineco',
        company: 'Ineco',
        start: '2018-06',
        end: '2018-09',
        tags: ['HTML', 'CSS3', 'JavaScript', 'Bases de datos'],
    },
];

export interface StudyItem extends Period {
    id: 'deusto-python' | 'deusto-cpp' | 'ceac-dam' | 'ies-smr';
    school: string;
    /** Siglas de la titulacion: es lo que encabeza la tarjeta. */
    code: string;
    tags: string[];
}

export const study: StudyItem[] = [
    {
        id: 'deusto-python',
        code: 'PY',
        school: 'Universidad de Deusto',
        start: '2023-06',
        end: '2024-10',
        tags: ['Python', 'PLN', 'Scikit-learn', 'pandas'],
    },
    {
        id: 'deusto-cpp',
        code: 'C++',
        school: 'Universidad de Deusto',
        start: '2021-05',
        end: '2023-01',
        tags: ['C++', 'POO', 'Punteros'],
    },
    {
        id: 'ceac-dam',
        code: 'DAM',
        school: 'CEAC',
        start: '2020-09',
        end: '2022-07',
        tags: ['Java', 'Android', 'MySQL', 'XML'],
    },
    {
        id: 'ies-smr',
        code: 'SMR',
        school: 'IES Cañada Real',
        start: '2015-09',
        end: '2018-06',
        tags: ['Redes', 'Windows Server', 'Hardware'],
    },
];

export interface ProjectItem {
    id:
        | 'jarvis'
        | 'yolo-labeling'
        | 'chatbot-flask'
        | 'spider'
        | 'spring-api'
        | 'tfg-dam'
        | 'cpp-files';
    name: string;
    repo: string;
    /** Lenguaje principal; agrupa las tarjetas en el carrusel. */
    language: 'Python' | 'TypeScript' | 'Java' | 'C++';
    tags: string[];
}

export const projects: ProjectItem[] = [
    {
        id: 'jarvis',
        name: 'JarvisAgents',
        language: 'Python',
        repo: 'https://github.com/Eriosoul/JarvisAgents',
        tags: ['Python', 'FastAPI', 'Multiagente', 'TTS'],
    },
    {
        id: 'yolo-labeling',
        name: 'EntrenamientoLabelingYOLO',
        language: 'TypeScript',
        repo: 'https://github.com/Eriosoul/EntrenamientoLabelingYOLO',
        tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'YOLO'],
    },
    {
        id: 'chatbot-flask',
        name: 'ChatBot_AI_Flask',
        language: 'Python',
        repo: 'https://github.com/Eriosoul/ChatBot_AI_Flask',
        tags: ['Python', 'Flask', 'Streaming'],
    },
    {
        id: 'spider',
        name: 'tfg_spider_web_py',
        language: 'Python',
        repo: 'https://github.com/Eriosoul/tfg_spider_web_py',
        tags: ['Python', 'Scraping'],
    },
    {
        id: 'spring-api',
        name: 'Java_Spring_API',
        language: 'Java',
        repo: 'https://github.com/Eriosoul/Java_Spring_API',
        tags: ['Java', 'Spring Boot', 'API REST', 'Tomcat'],
    },
    {
        id: 'tfg-dam',
        name: 'TFG-DAM',
        language: 'Java',
        repo: 'https://github.com/Eriosoul/TFG-DAM',
        tags: ['Java', 'MySQL', 'Escritorio', 'Hash de contraseñas'],
    },
    {
        id: 'cpp-files',
        name: 'AlmacenarDatosArchivos_cpp',
        language: 'C++',
        repo: 'https://github.com/Eriosoul/AlmacenarDatosArchivos_cpp',
        tags: ['C++', 'POO', 'fstream', 'Ficheros'],
    },
];

export interface StackGroup {
    id: 'ai' | 'vision' | 'ml' | 'backend' | 'frontend' | 'mobile' | 'infra' | 'domain';
    tags: string[];
}

export const stack: StackGroup[] = [
    {
        id: 'ai',
        tags: ['Sistemas multiagente', 'Orquestación', 'RAG', 'Fine-tuning', 'Prompt engineering',
               'Salida estructurada', 'Streaming SSE', 'OpenAI', 'Google Gemini', 'Ollama', 'llama.cpp'],
    },
    {
        id: 'vision',
        tags: ['YOLOv8', 'ByteTrack', 'DeepSORT', 'ReID multicámara', 'OpenCV', 'PyTorch', 'CUDA',
               'Google Cloud Vision'],
    },
    {
        id: 'ml',
        tags: ['Scikit-learn', 'pandas', 'PLN', 'Sistemas de recomendación', 'Filtrado colaborativo',
               'Data augmentation', 'Streamlit'],
    },
    {
        id: 'backend',
        tags: ['Python', 'Flask', 'FastAPI', 'MongoDB', 'WebSockets', 'Socket.IO', 'MQTT', 'Kafka',
               'Sockets TCP', 'JWT'],
    },
    {
        id: 'frontend',
        tags: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS', 'MapLibre', 'Leaflet', 'deck.gl',
               'Three.js', 'Zustand', 'TanStack Query'],
    },
    {
        id: 'mobile',
        tags: ['React Native (Expo)', 'WebRTC', 'SQLite', 'Electron', 'Inno Setup'],
    },
    {
        id: 'infra',
        tags: ['Docker', 'Docker Compose', 'AWS', 'Jenkins', 'Git', 'Linux'],
    },
    {
        id: 'domain',
        tags: ['C4ISR', 'Fusión de sensores', 'AIS/NMEA', 'ADS-B', 'Radar', 'SAPIENT',
               'Cursor-on-Target', 'MIL-STD-2525', 'MGRS', 'GIS (Luciad)'],
    },
];

export type LanguageId = 'es-native' | 'ro-native' | 'en-intermediate';
export const languages: LanguageId[] = ['es-native', 'ro-native', 'en-intermediate'];

/** Proyectos agrupados por lenguaje, en el orden en que se recorren. */
export const projectsByLanguage = (['Python', 'TypeScript', 'Java', 'C++'] as const)
    .map((language) => ({
        language,
        items: projects.filter((project) => project.language === language),
    }))
    .filter((group) => group.items.length > 0);

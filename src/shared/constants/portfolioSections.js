
export const SECTION_PREVIEWS = {
    '¿Quién Soy?': [
        { title: 'Roberto Antonio Milián Reyna', desc: 'FullStack Developer Jr. Próximo a iniciar Ingeniería en Sistemas.' }
    ],
    'Habilidades': [
        { title: 'Lenguajes', desc: 'JavaScript, Java, HTML, CSS' },
        { title: 'Bases de Datos', desc: 'SQL, MongoDB' },
        { title: 'Frameworks', desc: 'Spring Boot, Node.js' },
        { title: 'Sistemas Operativos', desc: 'Linux, Windows' }
    ],
    'Educación': [
        { title: 'Nivel Básico', desc: '2021 – 2023 · Fundación Kinal' },
        { title: 'Perito en Informática', desc: '2024 – Presente · Fundación Kinal' }
    ],
    'Experiencia': [
        { title: 'Pre-Prácticas de 5to. Perito', desc: '2025 · Procuraduría de los Derechos Humanos' },
        { title: 'Prácticas de 6to. Perito', desc: '2026 · Grupo Cemaco S.A.' }
    ],
    'Idiomas': [
        { title: 'Español', desc: 'Nativo' },
        { title: 'Inglés', desc: '85%' }
    ],
    'Proyectos': [
        { title: 'Próximamente', desc: 'Esta sección está en construcción.' }
    ]
};

export const CATEGORIES = Object.keys(SECTION_PREVIEWS);

export const SECTIONS = [
    { id: 'quien-soy', label: '¿Quién Soy?' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'educacion', label: 'Educación' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'idiomas', label: 'Idiomas' },
    { id: 'proyectos', label: 'Proyectos' }
];
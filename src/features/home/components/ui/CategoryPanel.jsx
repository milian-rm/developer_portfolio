import { AnimatePresence, motion } from 'motion/react';
import '../style/CategoryPanel.css';
import WhoAmICard from './WhoAmICard';
import ProjectsPanel from './ProjectsPanel';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const SKILLS = {
    Lenguajes: [
        { name: 'JavaScript', percent: 75, icon: 'javascript/javascript-original.svg' },
        { name: 'Java', percent: 85, icon: 'java/java-original.svg' },
        { name: 'HTML', percent: 90, icon: 'html5/html5-original.svg' },
        { name: 'CSS', percent: 75, icon: 'css3/css3-original.svg' }
    ],
    'Bases de Datos': [
        { name: 'SQL', percent: 90, icon: 'sql' },
        { name: 'MongoDB', percent: 90, icon: 'mongodb/mongodb-original.svg' }
    ],
    Frameworks: [
        { name: 'Spring Boot', percent: 75, icon: 'spring/spring-original.svg' },
        { name: 'Node.js', percent: 80, icon: 'nodejs/nodejs-original.svg' }
    ],
    'Sistemas Operativos': [
        { name: 'Linux', percent: 80, icon: 'linux/linux-original.svg', chip: true },
        { name: 'Windows', percent: 95, icon: 'windows8/windows8-original.svg' }
    ],
    'Control de Versiones': [
        { name: 'Git', percent: 85, icon: 'git/git-original.svg' },
        { name: 'GitHub', percent: 85, icon: 'github/github-original.svg', chip: true }
    ]
};

const SqlIcon = () => (
    <svg viewBox="0 0 24 24" className="skill-item__icon skill-item__icon--sql" fill="none">
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#7dbeff" strokeWidth="1.6" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#7dbeff" strokeWidth="1.6" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#7dbeff" strokeWidth="1.6" />
    </svg>
);

const SkillIcon = ({ skill }) => {
    if (skill.icon === 'sql') return <SqlIcon />;

    const img = (
        <img
            src={`${DEVICON_BASE}${skill.icon}`}
            alt={skill.name}
            className="skill-item__icon"
            loading="lazy"
        />
    );

    // Algunos logos (Linux, GitHub) son negros sobre fondo transparente:
    // se les da un chip claro en vez de invertirles el color.
    return skill.chip ? <span className="skill-item__icon-chip">{img}</span> : img;
};

const SkillItem = ({ skill }) => (
    <div className="skill-item">
        <SkillIcon skill={skill} />
        <div className="skill-item__info">
            <div className="skill-item__row">
                <span className="skill-item__name">{skill.name}</span>
                <span className="skill-item__percent">{skill.percent}%</span>
            </div>
            <div className="skill-item__bar">
                <motion.div
                    className="skill-item__bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percent}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                />
            </div>
        </div>
    </div>
);

const renderCategory = category => {
    switch (category) {
        case '¿Quién Soy?':
            return <WhoAmICard />;

        case 'Habilidades':
            return (
                <>
                    <h2>Habilidades</h2>
                    <div className="skills-grid">
                        {Object.entries(SKILLS).map(([group, items]) => (
                            <div className="skill-panel" key={group}>
                                <h3>{group}</h3>
                                <div className="skill-panel__list">
                                    {items.map(skill => (
                                        <SkillItem skill={skill} key={skill.name} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            );

        case 'Educación':
            return (
                <>
                    <h2>Educación</h2>
                    <ul className="timeline-list">
                        <li>
                            <span className="timeline-years">2021 – 2023</span>
                            <h3>Educación de Nivel Básico</h3>
                            <p>Fundación Kinal</p>
                        </li>
                        <li>
                            <span className="timeline-years">2024 – Presente</span>
                            <h3>Educación de Nivel Diversificado — Perito en Informática</h3>
                            <p>Fundación Kinal</p>
                        </li>
                    </ul>
                </>
            );

        case 'Experiencia':
            return (
                <>
                    <h2>Experiencia</h2>
                    <ul className="timeline-list">
                        <li>
                            <span className="timeline-years">2025</span>
                            <h3>Pre-Prácticas de 5to. Perito</h3>
                            <p>Departamento de Desarrollo — Procuraduría de los Derechos Humanos</p>
                        </li>
                        <li>
                            <span className="timeline-years">2026</span>
                            <h3>Prácticas de 6to. Perito</h3>
                            <p>Departamento de Telecomunicaciones — Grupo Cemaco S.A.</p>
                        </li>
                    </ul>
                </>
            );

        case 'Idiomas':
            return (
                <>
                    <h2>Idiomas</h2>
                    <ul className="language-list">
                        <li>
                            <span>Español</span>
                            <div className="language-bar"><div className="language-bar-fill" style={{ width: '100%' }} /></div>
                            <span className="language-level">Nativo</span>
                        </li>
                        <li>
                            <span>Inglés</span>
                            <div className="language-bar"><div className="language-bar-fill" style={{ width: '85%' }} /></div>
                            <span className="language-level">85%</span>
                        </li>
                    </ul>
                </>
            );

        case 'Proyectos':
            return <ProjectsPanel />;

        default:
            return (
                <>
                    <h2>Proyectos</h2>
                    <div className="pending-card">
                        <p>Próximamente — esta sección está en construcción.</p>
                    </div>
                </>
            );
    }
};

const CategoryPanel = ({ category }) => (
    <motion.div
        className="panel-wrapper"
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
    >
        <AnimatePresence mode="wait">
            <motion.div
                key={category}
                className="category-panel__card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
                {renderCategory(category)}
            </motion.div>
        </AnimatePresence>
    </motion.div>
);

export default CategoryPanel;
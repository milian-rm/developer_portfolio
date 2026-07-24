import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LightRays from './ui/LightRays';
import ProfileCard from './ui/ProfileCard';
import TextType from './ui/TextType';
import OptionWheel from './ui/OptionWheel';
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';
import './style/HomeView.css';

const SECTION_PREVIEWS = {
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

const CATEGORIES = Object.keys(SECTION_PREVIEWS);

const HomeView = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const initialIndex = (() => {
        const idx = CATEGORIES.indexOf(location.state?.category);
        return idx !== -1 ? idx : 0;
    })();

    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[initialIndex]);

    // Si volvemos desde /detalles, bajamos directo a la sección de categorías
    useEffect(() => {
        if (location.state?.category) {
            document.querySelector('.wheel-section')?.scrollIntoView({ behavior: 'auto' });
        }
    }, [location.state]);

    const handleWheelChange = (_idx, item) => {
        setSelectedCategory(item);
    };

    const handleCardClick = (category) => {
        navigate('/detalles', { state: { section: category } });
    };

    const currentItems = SECTION_PREVIEWS[selectedCategory] ?? [];

    return (
        <div className="home-view">
            {/* ---------- 1. HERO ---------- */}
            <section className="view-section hero-section">
                <div className="hero-bg">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#fdfdfd"
                        raysSpeed={1.2}
                        lightSpread={0.8}
                        rayLength={1.5}
                        pulsating={false}
                    />
                </div>

                <div className="hero-content">
                    <ProfileCard
                        avatarUrl="/src/assets/profilePhoto.jpeg"
                        name="Roberto Milián"
                        title="Desarrollador FullStack Jr."
                        handle="milian-rm"
                        contactText="Contáctame"
                        onContactClick={() => console.log('Contact clicked')}
                    />

                    <TextType
                        text={[
                            'Bienvenido, soy Roberto Milián',
                            'Talk is cheap. Show me the code',
                        ]}
                        as="h1"
                        className="hero-title"
                        typingSpeed={100}
                        pauseDuration={5000}
                        loop
                        showCursor
                        cursorCharacter="|"
                    />
                </div>

                <div className="scroll-indicator">
                    <span className="arrow">↓</span>
                    <p>Scroll</p>
                </div>
            </section>

            {/* ---------- 2. SELECCIÓN + RESUMEN ---------- */}
            <section className="view-section wheel-section">
                <h2 className="section-title">Conóceme mejor</h2>

                <div className="wheel-stack-row">
                    <div className="wheel-wrapper">
                        <OptionWheel
                            items={CATEGORIES}
                            defaultSelected={initialIndex}
                            side="left"
                            fontSize={2}
                            spacing={2}
                            inset={40}
                            curve={1}
                            onChange={handleWheelChange}
                        />
                    </div>

                    <div className="stack-wrapper">
                        <ScrollStack>
                            {currentItems.map(item => (
                                <ScrollStackItem key={item.title}>
                                    <button
                                        type="button"
                                        className="preview-card-btn"
                                        onClick={() => handleCardClick(selectedCategory)}
                                    >
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                        <span className="preview-card-more">Ver más →</span>
                                    </button>
                                </ScrollStackItem>
                            ))}
                        </ScrollStack>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeView;
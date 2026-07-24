import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineSidebar from './ui/LineSidebar';
import './style/DetailsView.css';

const SECTIONS = [
  { id: 'quien-soy', label: '¿Quién Soy?' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'educacion', label: 'Educación' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'idiomas', label: 'Idiomas' },
  { id: 'proyectos', label: 'Proyectos' }
];

const DetailsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticScroll = useRef(false);

  // Al entrar desde el Home, saltar a la sección correspondiente
  useEffect(() => {
    const incoming = location.state?.section;
    const index = SECTIONS.findIndex(s => s.label === incoming);
    if (index !== -1) {
      isProgrammaticScroll.current = true;
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'auto', block: 'start' });
      setActiveIndex(index);
      setTimeout(() => { isProgrammaticScroll.current = false; }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scrollspy: detecta qué sección está visible y actualiza el sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (isProgrammaticScroll.current) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: null, rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    sectionRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSidebarClick = useCallback(index => {
    isProgrammaticScroll.current = true;
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveIndex(index);
    setTimeout(() => { isProgrammaticScroll.current = false; }, 700);
  }, []);

  const handleBackHome = () => {
    navigate('/', { state: { category: SECTIONS[activeIndex].label } });
  };

  return (
    <div className="details-view">
      <button className="back-home-btn" onClick={handleBackHome} type="button">
        ← Volver al inicio
      </button>

      <div className="details-layout">
        <aside className="details-sidebar">
          <LineSidebar
            items={SECTIONS.map(s => s.label)}
            activeIndex={activeIndex}
            onItemClick={handleSidebarClick}
            showIndex
            showMarker
            accentColor="#7dbeff"
            textColor="#7a7a7a"
            markerColor="#3a3a3a"
            itemGap={40}
            maxShift={20}
          />
        </aside>

        <main className="details-content">
          <section id="quien-soy" ref={el => (sectionRefs.current[0] = el)} className="details-section">
            <h1>Roberto Antonio Milián Reyna</h1>
            <h2 className="details-subtitle">FullStack Developer Jr.</h2>
            <p>
              Soy un joven desarrollador apasionado por la tecnología, actualmente curso el 6to. Grado de
              Perito en Informática, y estoy próximo a iniciar mis estudios universitarios en la carrera de
              Ingeniería en Sistemas. Busco que mi estudio sea el medio por el cuál pueda crear soluciones
              tecnológicas a problemas reales.
            </p>
          </section>

          <section id="habilidades" ref={el => (sectionRefs.current[1] = el)} className="details-section">
            <h2>Habilidades</h2>

            <div className="skills-grid">
              <div className="skill-group">
                <h3>Lenguajes</h3>
                <ul className="skill-pills">
                  <li>JavaScript</li>
                  <li>Java</li>
                  <li>HTML</li>
                  <li>CSS</li>
                </ul>
              </div>

              <div className="skill-group">
                <h3>Bases de Datos</h3>
                <ul className="skill-pills">
                  <li>SQL</li>
                  <li>MongoDB</li>
                </ul>
              </div>

              <div className="skill-group">
                <h3>Frameworks</h3>
                <ul className="skill-pills">
                  <li>Spring Boot</li>
                  <li>Node.js</li>
                </ul>
              </div>

              <div className="skill-group">
                <h3>Sistemas Operativos</h3>
                <ul className="skill-pills">
                  <li>Linux</li>
                  <li>Windows</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="educacion" ref={el => (sectionRefs.current[2] = el)} className="details-section">
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
          </section>

          <section id="experiencia" ref={el => (sectionRefs.current[3] = el)} className="details-section">
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
          </section>

          <section id="idiomas" ref={el => (sectionRefs.current[4] = el)} className="details-section">
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
          </section>

          <section id="proyectos" ref={el => (sectionRefs.current[5] = el)} className="details-section">
            <h2>Proyectos</h2>
            <div className="pending-card">
              <p>🚧 Próximamente — esta sección está en construcción.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DetailsView;
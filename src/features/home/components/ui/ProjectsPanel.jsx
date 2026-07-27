import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import InteractiveHoverButton from '../../../../shared/components/ui/InteractiveHoverButton';
import '../style/ProjectsPanel.css';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const ExternalLinkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none">
        <path
            d="M14 5h5v5M19 5l-8 8M8 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// TODO: reemplaza por tus proyectos reales (imágenes, textos y enlaces)
const PROJECTS = [
    {
        title: 'KinalBank',
        description: 'API RESTful para la gestión bancaria: cuentas, tarjetas, transacciones y deudas. Desarrollado con Node.js, Express, MongoDB y Mongoose, incluyendo autenticación JWT y control de roles.',
        images: [
            '/src/assets/bank-1.jpeg',
            '/src/assets/bank-2.jpeg',
            '/src/assets/bank-3.jpeg',
            '/src/assets/bank-4.jpeg',
            '/src/assets/bank-5.jpeg',
        ],
        deployUrl: 'https://proyecto1.example.com',
        repoUrl: 'https://github.com/milian-rm/proyecto1'
    },
    {
        title: 'Kinal Fried Chicken',
        description: 'Sistema de administración de restaurante con autenticación, inventario, menú, reservaciones, empleados, ventas y facturación. Construido con Node.js, Express, MongoDB, PostgreSQL, React y Docker.',
        images: [
            '/src/assets/rs-1.jpeg',
            '/src/assets/rs-2.jpeg',
            '/src/assets/rs-3.jpeg',
            '/src/assets/rs-4.jpeg',
            '/src/assets/rs-5.jpeg',
            '/src/assets/rs-6.jpeg',
            '/src/assets/rs-7.jpeg',
            '/src/assets/rs-8.jpeg',

        ],
        deployUrl: 'https://proyecto2.example.com',
        repoUrl: 'https://github.com/milian-rm/proyecto2'
    },
    {
        title: 'Nombre del Proyecto 3',
        description: 'Breve descripción de qué hace el proyecto, con qué tecnologías se construyó y qué problema resuelve.',
        images: [
            '/src/assets/projects/proyecto3-1.png',
            '/src/assets/projects/proyecto3-2.png',
            '/src/assets/projects/proyecto3-3.png'
        ],
        deployUrl: 'https://proyecto3.example.com',
        repoUrl: 'https://github.com/milian-rm/proyecto3'
    }
];

const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none">
        <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronRight = () => (
    <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// --- Lightbox: se monta directo en document.body vía portal ---
const ImageLightbox = ({ images, title, startIndex, onClose }) => {
    const [current, setCurrent] = useState(startIndex);
    const total = images.length;

    useEffect(() => {
        const handleKey = e => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % total);
            if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + total) % total);
        };
        document.addEventListener('keydown', handleKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [total, onClose]);

    return createPortal(
        <div className="lightbox" onClick={onClose}>
            <button type="button" className="lightbox__close" onClick={onClose} aria-label="Cerrar">
                <CloseIcon />
            </button>

            <div className="lightbox__content" onClick={e => e.stopPropagation()}>
                <img
                    src={images[current]}
                    alt={`${title} — imagen ${current + 1}`}
                    className="lightbox__image"
                />

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            className="lightbox__nav lightbox__nav--prev"
                            onClick={() => setCurrent(c => (c - 1 + total) % total)}
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            type="button"
                            className="lightbox__nav lightbox__nav--next"
                            onClick={() => setCurrent(c => (c + 1) % total)}
                            aria-label="Imagen siguiente"
                        >
                            <ChevronRight />
                        </button>

                        <div className="lightbox__dots">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={`lightbox__dot ${i === current ? 'is-active' : ''}`}
                                    onClick={() => setCurrent(i)}
                                    aria-label={`Ir a la imagen ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

const ProjectCarousel = ({ images, title, onOpen }) => {
    const [current, setCurrent] = useState(0);
    const total = images.length;

    const goTo = i => setCurrent(((i % total) + total) % total);

    return (
        <div className="project-card__carousel">
            <div
                className="project-card__track"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((src, i) => (
                    <div
                        className="project-card__slide"
                        key={src}
                        onClick={() => onOpen(current)}
                    >
                        <img src={src} alt={`${title} — captura ${i + 1}`} loading="lazy" />
                    </div>
                ))}
            </div>

            {total > 1 && (
                <>
                    <button
                        type="button"
                        className="project-card__nav project-card__nav--prev"
                        onClick={e => { e.stopPropagation(); setCurrent(c => (c - 1 + total) % total); }}
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        type="button"
                        className="project-card__nav project-card__nav--next"
                        onClick={e => { e.stopPropagation(); setCurrent(c => (c + 1) % total); }}
                        aria-label="Imagen siguiente"
                    >
                        <ChevronRight />
                    </button>

                    <div className="project-card__dots">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`project-card__dot ${i === current ? 'is-active' : ''}`}
                                onClick={e => { e.stopPropagation(); goTo(i); }}
                                aria-label={`Ir a la imagen ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const ProjectCard = ({ project, index, onOpenLightbox }) => (
    <motion.article
        className="project-card"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
        <ProjectCarousel
            images={project.images}
            title={project.title}
            onOpen={i => onOpenLightbox(project.images, project.title, i)}
        />

        <div className="project-card__body">
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.description}</p>

            <div className="project-card__links">
                <InteractiveHoverButton
                    as="a"
                    href={project.deployUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ihb--primary"
                    icon={<ExternalLinkIcon />}
                >
                    Ver despliegue
                </InteractiveHoverButton>
                <InteractiveHoverButton
                    as="a"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ihb--secondary"
                    icon={<img src={`${DEVICON_BASE}github/github-original.svg`} alt="" />}
                >
                    Repositorio
                </InteractiveHoverButton>
            </div>
        </div>
    </motion.article>
);

const ProjectsPanel = () => {
    const [lightbox, setLightbox] = useState(null); // { images, title, index }

    const openLightbox = (images, title, index) => setLightbox({ images, title, index });
    const closeLightbox = () => setLightbox(null);

    return (
        <>
            <h2>Proyectos</h2>

            <div className="projects-grid">
                {PROJECTS.map((project, index) => (
                    <ProjectCard
                        project={project}
                        index={index}
                        key={project.title}
                        onOpenLightbox={openLightbox}
                    />
                ))}
            </div>

            {lightbox && (
                <ImageLightbox
                    images={lightbox.images}
                    title={lightbox.title}
                    startIndex={lightbox.index}
                    onClose={closeLightbox}
                />
            )}
        </>
    );
};

export default ProjectsPanel;
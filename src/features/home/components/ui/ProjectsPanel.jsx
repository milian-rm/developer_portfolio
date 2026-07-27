import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import InteractiveHoverButton from '../../../../shared/components/ui/InteractiveHoverButton';
import bank1 from '../../../../assets/bank-1.jpeg';
import bank2 from '../../../../assets/bank-2.jpeg';
import bank3 from '../../../../assets/bank-3.jpeg';
import bank4 from '../../../../assets/bank-4.jpeg';
import bank5 from '../../../../assets/bank-5.jpeg';
import rs1 from '../../../../assets/rs-1.jpeg';
import rs2 from '../../../../assets/rs-2.jpeg';
import rs3 from '../../../../assets/rs-3.jpeg';
import rs4 from '../../../../assets/rs-4.jpeg';
import rs5 from '../../../../assets/rs-5.jpeg';
import rs6 from '../../../../assets/rs-6.jpeg';
import rs7 from '../../../../assets/rs-7.jpeg';
import rs8 from '../../../../assets/rs-8.jpeg';
import wd1 from '../../../../assets/wd-1.jpeg';
import wd2 from '../../../../assets/wd-2.jpeg';
import wd3 from '../../../../assets/wd-3.jpeg';
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

const PROJECTS = [
    {
        title: 'KinalBank',
        description: 'API RESTful para la gestión bancaria: cuentas, tarjetas, transacciones y deudas. Desarrollado con Node.js, Express, MongoDB y Mongoose, incluyendo autenticación JWT y control de roles.',
        images: [bank1, bank2, bank3, bank4, bank5],
        deployUrl: 'https://client-user-bank-system.vercel.app/',
        repoUrl: 'https://github.com/orgs/KinalBank/repositories'
    },
    {
        title: 'Kinal Fried Chicken',
        description: 'Sistema de administración de restaurante con autenticación, inventario, menú, reservaciones, empleados, ventas y facturación. Construido con Node.js, Express, MongoDB, PostgreSQL, React y Docker.',
        images: [rs1, rs2, rs3, rs4, rs5, rs6, rs7, rs8],
        deployUrl: 'https://kinal-fried-chicken-user.web.app/',
        repoUrl: 'https://github.com/orgs/restaurantSystemKFC/repositories'
    },
    {
        title: 'WorkDispatch',
        description: 'Plataforma marketplace que conecta trabajadores del sector informal con clientes. Arquitectura de microservicios con .NET 8, Node.js, Express, MongoDB, PostgreSQL, React, React Native y Expo. Incluye panel administrativo, app móvil y autenticación JWT con verificación por email.',
        images: [wd1, wd2, wd3],
        repoUrl: 'https://github.com/orgs/ProjectWorkDispatch/repositories'
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
                {project.deployUrl && (
                    <InteractiveHoverButton
                        as="a"
                        href={project.deployUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ihb--primary"
                        icon={<ExternalLinkIcon />}
                    >
                        Ir al Proyecto
                    </InteractiveHoverButton>
                )}
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
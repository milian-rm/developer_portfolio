import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import '../style/WhoAmICard.css';
import InteractiveHoverButton from '../../../../shared/components/ui/InteractiveHoverButton';

const GALLERY_PHOTOS = [
  '/src/assets/foto-1.jpeg',
  '/src/assets/foto-2.jpeg',
  '/src/assets/foto-3.jpeg',
  '/src/assets/foto-4.jpeg',
  '/src/assets/foto-5.jpeg'
];

// TODO: reemplaza por tus datos reales
const QUICK_FACTS = [
  { label: 'Edad', value: '18 años' },
  { label: 'Programando', value: '3 años' }
];

// TODO: reemplaza por tus pasatiempos reales
const HOBBIES = ['Videojuegos', 'Música', 'Gimnasio', 'Lectura'];

const GAP = 14;
const BASE_SPEED = 26; // px por segundo, flujo base
const NUDGE_MULTIPLIER = 7;
const NUDGE_DURATION = 420; // ms

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="whoami-card__flip-icon" fill="none">
    <path d="M9 6l6 6-6 6" stroke="#7dbeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="whoami-card__flip-icon" fill="none">
    <path d="M15 6l-6 6 6 6" stroke="#7dbeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" className="whoami-marquee__chevron" fill="none">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="whoami-marquee__chevron" fill="none">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Fondo de fotos en flujo continuo: nunca empieza ni termina, siempre fluye.
// Se mueve manipulando el DOM directamente vía requestAnimationFrame (sin
// re-render de React en cada frame) para que sea perfectamente suave.
const PhotoMarquee = ({ active }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const directionRef = useRef(1);
  const boostRef = useRef({ multiplier: 1, until: 0 });
  const [itemWidth, setItemWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const width = containerRef.current?.offsetWidth ?? 0;
      const computed = (width - GAP * 2) / 3;
      setItemWidth(Math.max(computed, 90));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !itemWidth) return undefined;

    const setWidth = GALLERY_PHOTOS.length * (itemWidth + GAP);
    let frameId;
    let lastTime = performance.now();

    const step = time => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const now = performance.now();
      const multiplier = now < boostRef.current.until ? boostRef.current.multiplier : 1;

      offsetRef.current += BASE_SPEED * multiplier * directionRef.current * delta;

      if (offsetRef.current >= setWidth) offsetRef.current -= setWidth;
      if (offsetRef.current < 0) offsetRef.current += setWidth;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active, itemWidth]);

  const nudge = direction => {
    directionRef.current = direction;
    boostRef.current = { multiplier: NUDGE_MULTIPLIER, until: performance.now() + NUDGE_DURATION };
    window.setTimeout(() => {
      directionRef.current = 1;
    }, NUDGE_DURATION);
  };

  const photosDoubled = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

  return (
    <div className="whoami-marquee" ref={containerRef}>
      <div className="whoami-marquee__track" ref={trackRef}>
        {photosDoubled.map((photo, index) => (
          <div
            key={`${photo}-${index}`}
            className="whoami-marquee__item"
            style={{ width: itemWidth || undefined, marginRight: GAP }}
          >
            <img src={photo} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      <div className="whoami-marquee__overlay" />

    </div>
  );
};

const WhoAmICard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [heights, setHeights] = useState({ front: null, back: null });

  const frontRef = useRef(null);
  const backRef = useRef(null);

  useLayoutEffect(() => {
    const measure = () => {
      setHeights({
        front: frontRef.current?.offsetHeight ?? null,
        back: backRef.current?.offsetHeight ?? null
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (frontRef.current) observer.observe(frontRef.current);
    if (backRef.current) observer.observe(backRef.current);
    return () => observer.disconnect();
  }, [isFlipped]);

  const activeHeight = isFlipped ? heights.back : heights.front;
  const toggleFlip = () => setIsFlipped(prev => !prev);

  return (
    <div
      className="whoami-card"
      onClick={toggleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') toggleFlip();
      }}
    >
      <motion.div
        className="whoami-card__viewport"
        animate={{ height: activeHeight ?? 'auto' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence initial={false} mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              ref={frontRef}
              className="whoami-card__face whoami-card__face--front"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1>Roberto Antonio Milián Reyna</h1>
              <p className="category-panel__subtitle">FullStack Developer Jr.</p>
              <p className="category-panel__bio">
                Soy un joven desarrollador apasionado por la tecnología, actualmente curso el 6to. Grado de
                Perito en Informática, y estoy próximo a iniciar mis estudios universitarios en la carrera de
                Ingeniería en Sistemas. Busco que mi estudio sea el medio por el cuál pueda crear soluciones
                tecnológicas a problemas reales.
              </p>
              <InteractiveHoverButton className="whoami-card__flip-btn">
                Conóceme más
              </InteractiveHoverButton>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              ref={backRef}
              className="whoami-card__face whoami-card__face--back"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhotoMarquee active={isFlipped} />

              <div className="whoami-card__back-content">
                <div className="whoami-facts">
                  {QUICK_FACTS.map(fact => (
                    <div className="whoami-facts__item" key={fact.label}>
                      <span className="whoami-facts__value">{fact.value}</span>
                      <span className="whoami-facts__label">{fact.label}</span>
                    </div>
                  ))}
                </div>

                <div className="whoami-hobbies">
                  {HOBBIES.map(hobby => (
                    <span className="whoami-hobbies__tag" key={hobby}>{hobby}</span>
                  ))}
                </div>
                <InteractiveHoverButton reverse className="whoami-card__flip-btn whoami-card__flip-btn--back">
                  Volver
                </InteractiveHoverButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WhoAmICard;
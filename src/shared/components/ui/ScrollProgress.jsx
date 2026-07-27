import { motion, useScroll, useSpring } from 'motion/react';
import './ScrollProgress.css';

const ScrollProgress = ({ className = '' }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className={`scroll-progress ${className}`} style={{ scaleX }} />;
};

export default ScrollProgress;
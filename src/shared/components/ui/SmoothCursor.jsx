import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './SmoothCursor.css';

const CursorIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...props}>
    <path
      fill="#ffffff"
      stroke="#08060d"
      strokeWidth="1"
      strokeLinejoin="round"
      d="M4 2.5 19.5 12l-6.6 1.4L9.8 20 4 2.5Z"
    />
  </svg>
);

const SPRING = { damping: 28, stiffness: 400, mass: 0.6 };

const SmoothCursor = ({ icon = <CursorIcon /> }) => {
  const [isTouch, setIsTouch] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, SPRING);
  const springY = useSpring(cursorY, SPRING);
  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, SPRING);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const touchCapable = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(touchCapable);
    if (touchCapable) return undefined;

    document.body.classList.add('has-smooth-cursor');

    const handleMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.hypot(dx, dy) > 2) {
        rotation.set((Math.atan2(dy, dx) * 180) / Math.PI + 90);
      }
      lastPos.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.body.classList.remove('has-smooth-cursor');
    };
  }, [cursorX, cursorY, rotation]);

  if (isTouch) return null;

  return (
    <motion.div className="smooth-cursor" style={{ x: springX, y: springY, rotate: springRotation }}>
      {icon}
    </motion.div>
  );
};

export default SmoothCursor;
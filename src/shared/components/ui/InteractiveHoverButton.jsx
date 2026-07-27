import { forwardRef } from 'react';
import './InteractiveHoverButton.css';

const ArrowIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const InteractiveHoverButton = forwardRef(
  ({ children, className = '', reverse = false, as = 'button', icon, ...props }, ref) => {
    const Comp = as;
    return (
      <Comp ref={ref} className={`ihb ${reverse ? 'ihb--reverse' : ''} ${className}`} {...props}>
        <span className="ihb__row">
          {icon ? <span className="ihb__icon">{icon}</span> : <span className="ihb__dot" />}
          <span className="ihb__idle-text">{children}</span>
        </span>
        <span className="ihb__reveal">
          {reverse && <ArrowIcon className="ihb__arrow ihb__arrow--reverse" />}
          <span className="ihb__text">{children}</span>
          {!reverse && <ArrowIcon className="ihb__arrow" />}
        </span>
      </Comp>
    );
  }
);

InteractiveHoverButton.displayName = 'InteractiveHoverButton';

export default InteractiveHoverButton;
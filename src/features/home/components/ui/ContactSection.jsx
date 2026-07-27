import { motion } from 'motion/react';
import InteractiveHoverButton from '../../../../shared/components/ui/InteractiveHoverButton';
import avatar from '../../../../assets/avatar.png';
import '../style/ContactSection.css';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const WHATSAPP_NUMBER = '50235679090'; // +502 3567 9090, sin signos ni espacios
const WHATSAPP_MESSAGE = 'Hola Roberto, vi tu portafolio y me gustaría contactarte.';

const EMAIL_ADDRESS = 'romilian2007@gmail.com';
const EMAIL_SUBJECT = 'Contacto desde tu portafolio';
const EMAIL_BODY = 'Hola Roberto,\n\nVi tu portafolio y me gustaría contactarte.\n\n';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`,
    kind: 'mail'
  },
  {
    label: 'GitHub',
    value: '@milian-rm',
    href: 'https://github.com/milian-rm',
    kind: 'icon',
    icon: 'github/github-original.svg',
    chip: true
  },
  {
    label: 'LinkedIn',
    value: 'Roberto Milián',
    href: 'https://www.linkedin.com/in/roberto-milian-0a6690385/',
    kind: 'icon',
    icon: 'linkedin/linkedin-original.svg'
  },
  {
    label: 'WhatsApp',
    value: '+502 3567 9090',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    kind: 'phone'
  }
];

const EMAIL_LINK = CONTACT_LINKS[0];
const WHATSAPP_LINK = CONTACT_LINKS[3];

const CONTACT_ROWS = [
  [CONTACT_LINKS[0], CONTACT_LINKS[1]], // Email + GitHub
  [CONTACT_LINKS[2], CONTACT_LINKS[3]], // LinkedIn + WhatsApp
];

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="contact-card__icon" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#7dbeff" strokeWidth="1.6" />
    <path d="M4 6.5l8 6 8-6" stroke="#7dbeff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="contact-card__icon" fill="none">
    <path
      d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2C10.6 19 5 13.4 4.5 5.2A2 2 0 0 1 6.5 3Z"
      stroke="#7dbeff"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const ContactIcon = ({ link }) => {
  if (link.kind === 'mail') return <MailIcon />;
  if (link.kind === 'phone') return <PhoneIcon />;

  const img = (
    <img
      src={`${DEVICON_BASE}${link.icon}`}
      alt={link.label}
      className="contact-card__icon"
      loading="lazy"
    />
  );

  return link.chip ? <span className="contact-card__icon-chip">{img}</span> : img;
};

const ContactSection = () => (
  <section className="contact-section" id="contacto">
    <div className="contact-section__inner">

      <h2 className="section-title">¿Hablamos?</h2>

      <p className="contact-section__lead">
        Estoy abierto a prácticas, proyectos o simplemente conversar sobre tecnología.
        Este es el mejor lugar para encontrarme.
      </p>

      <div className="contact-section__cta">
        <InteractiveHoverButton as="a" href={EMAIL_LINK.href} className="ihb--primary">
          Enviar un correo
        </InteractiveHoverButton>
        <InteractiveHoverButton
          as="a"
          href={WHATSAPP_LINK.href}
          target="_blank"
          rel="noreferrer"
          className="ihb--secondary"
        >
          Escríbeme por WhatsApp
        </InteractiveHoverButton>
      </div>

      <div className="contact-layout">
        <motion.div
          className="contact-avatar"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-avatar__glow" />
          <img
            src={avatar}
            alt="Foto de perfil"
            className="contact-avatar__img"
            loading="lazy"
          />
        </motion.div>

        <div className="contact-grid">
  {CONTACT_ROWS.map((row, rowIndex) => (
    <div className="contact-row" key={rowIndex}>
      {row.map((link, i) => {
        const index = rowIndex * 2 + i;
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            className="contact-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactIcon link={link} />
            <div className="contact-card__info">
              <span className="contact-card__label">{link.label}</span>
              <span className="contact-card__value">{link.value}</span>
            </div>
            <span className="contact-card__arrow">→</span>
          </motion.a>
        );
      })}
    </div>
  ))}
</div>
      </div>
    </div>
  </section>
);

export default ContactSection;
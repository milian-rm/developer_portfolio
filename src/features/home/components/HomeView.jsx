import LightRays from './ui/LightRays';
import ProfileCard from './ui/ProfileCard';
import TextType from './ui/TextType';
import profilePhoto from '../../../assets/profilePhoto.jpeg';
import './style/HomeView.css';

const HomeView = () => {
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
                        avatarUrl={profilePhoto}
                        name="Roberto Milián"
                        title="Desarrollador FullStack Jr."
                        handle="milian-rm"
                        contactText="Contáctame"
                        onContactClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
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
        </div>
    );
};

export default HomeView;
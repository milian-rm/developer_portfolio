import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../features/home/components/ui/Navbar';
import ScrollProgress from './ui/ScrollProgress';
import OptionWheel from '../../features/home/components/ui/OptionWheel';
import CategoryPanel from '../../features/home/components/ui/CategoryPanel';
import ContactSection from '../../features/home/components/ui/ContactSection';
import { CATEGORIES } from '../constants/portfolioSections';
import './MainLayout.css';

const MainLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleWheelChange = (_idx, item) => {
    setSelectedCategory(item);
  };

  return (
    <div className="app-shell">


      <div className="app-shell__page">
        <Outlet />
      </div>

      <div className="wheel-stack-block" id="sobre-mi">
        <h2 className="section-title">Conóceme mejor</h2>

        <div className="wheel-stack-row">
          <div className="wheel-wrapper">
            <OptionWheel
              items={CATEGORIES}
              defaultSelected={0}
              side="left"
              fontSize={2}
              spacing={2}
              inset={40}
              curve={1}
              activeColor="#7dbeff"
              onChange={handleWheelChange}
            />
          </div>

          <CategoryPanel category={selectedCategory} />
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default MainLayout;
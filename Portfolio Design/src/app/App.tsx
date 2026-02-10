import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { Experience } from './components/Experience';
import { CompetitiveProgramming } from './components/CompetitiveProgramming';
import { ContributionActivity } from './components/ContributionActivity';
import { FeaturedWork } from './components/FeaturedWork';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Content */}
      <div className="relative">
        <div id="home">
          <Hero />
        </div>
        <About />
        <div id="skills">
          <TechnicalArsenal />
        </div>
        <Experience />
        <CompetitiveProgramming />
        <ContributionActivity />
        <FeaturedWork />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
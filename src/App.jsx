import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Profiles from './components/Profiles';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SectionLayout from './components/SectionLayout';
import InfiniteSkills from './components/InfiniteSkills';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portfolio" element={
          <main>
            <Header />
            <Hero />
            <SectionLayout title="About Me" id="about">
              <About />
            </SectionLayout>
            <InfiniteSkills />
            
            <SectionLayout title="Featured Projects" id="projects">
              <Projects />
            </SectionLayout>
            <SectionLayout title="Coding Profiles" id="profiles">
              <Profiles />
            </SectionLayout>
            <SectionLayout title="Education & Experience" id="education">
              <Education />
            </SectionLayout>
            <SectionLayout title="Achievements" id="achievements">
              <Achievements />
            </SectionLayout>

            <SectionLayout title="Resume" id="resume">
              <Resume />
            </SectionLayout>
            <SectionLayout title="Get In Touch" id="contact">
              <Contact />
            </SectionLayout>
            <Footer />
          </main>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
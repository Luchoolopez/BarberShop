import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { PricingList } from '../components/PricingList';
import { Testimonials } from '../components/Testimonials';

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      
      <div className="portafolio_trabajo text-center py-5">
         <h1>WORKS</h1>
         <p>Un recorrido fotográfico por mis trabajos...</p>
         <button className="btn btn-outline-dark">VER MIS TRABAJOS ▼</button>
      </div>

      <PricingList />
      <Testimonials />
      
      <section className="mapa_contenedor my-4">
         <h1 className="text-center mb-3">¿Dónde podés encontrarnos?</h1>
         <iframe 
            className="map w-100"
            src="https://www.google.com/maps/embed?..." 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
         ></iframe>
      </section>
    </>
  );
};
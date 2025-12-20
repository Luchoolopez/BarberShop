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
      <PricingList />
      <Testimonials />
      
      <section className="mapa_contenedor my-4">
         <h1 className="text-center mb-3">¿Dónde podés encontrarnos?</h1>
         <iframe 
            className="map w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99611.4592697827!2d-62.338772566841506!3d-38.721066698090354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbcabdc1302bd%3A0x76d1d88d241e7a11!2sBah%C3%ADa%20Blanca%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1766264950685!5m2!1ses!2sar"
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
import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

export const Testimonials: React.FC = () => {
  return (
    <Container className="testimonios my-5 text-center">
      <h1 className="mb-4">TESTIMONIOS</h1>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
            <div className="d-flex flex-column align-items-center p-5">
                <h3>"El curso con Barber Shop fue un antes y un despues..."</h3>
                <p className="mt-3 fw-bold">KATHIA RIQUELME SEIF EDDINE</p>
                <p>MASTER EN WELLA - ASUNCION, PARAGUAY</p>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div className="d-flex flex-column align-items-center p-5">
                <h3>"Hice el curso de 10 clases con Barber Shop y me encanto..."</h3>
                <p className="mt-3 fw-bold">MATIAS VALENZUELA</p>
                <p>CORTADOR CON 20 AÑOS DE EXPERIENCIA</p>
            </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};
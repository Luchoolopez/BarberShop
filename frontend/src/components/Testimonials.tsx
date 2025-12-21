import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import '../styles/Testimonials.css';

export const Testimonials: React.FC = () => {
  return (
    <Container className="testimonios my-5 text-center">
      <h1 className="mb-4">TESTIMONIOS</h1>
      <Carousel>
        <Carousel.Item>
          <div className="d-flex flex-column align-items-center p-5">
            <h3>"Nunca me habían entendido tan bien lo que quería. Salí con el corte justo que buscaba."</h3>
            <p className="mt-3 fw-bold">Lucas Fernández</p>
            <p>Cliente frecuente</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex flex-column align-items-center p-5">
            <h3>"Excelente atención y un corte impecable. Se nota la dedicación en cada detalle."</h3>
            <p className="mt-3 fw-bold">Matías González</p>
            <p>Cliente habitual</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex flex-column align-items-center p-5">
            <h3>"No es solo un corte, es toda una experiencia. Salís renovado."</h3>
            <p className="mt-3 fw-bold">Franco Medina</p>
            <p>Cliente</p>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};
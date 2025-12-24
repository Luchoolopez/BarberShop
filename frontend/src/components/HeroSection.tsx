import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/HeroSection.css';

export const HeroSection: React.FC = () => {
  return (
    <section className='hero-section min-vh-50 d-flex align-items-center py-5 border-bottom border-2'>
      <Container>
        <Row className='align-items-center gy-5'>
          <Col md={6} className='text-center text-md-start'>
            <h1 className='display-1 fw-bold tracking-tighter' style={{fontSize: 'clamp(4rem, 12vw, 9rem)'}}>
                FADEIT
            </h1>
            <div 
                className="d-none d-md-block mt-2 bg-secondary" 
                style={{ width: '120px', height: '6px' }}
            ></div>
          </Col>

          <Col md={6}>
            <div className="p-lg-5 border-start border-secondary">
              <h2 className="h1 mb-3 fw-light">Cortes, barba y estilo personal.</h2>
              <p className="lead mb-4 opacity-75">
Elegí tu profesional, reservá tu turno y renová tu look sin esperas. Somos una peluquería y barbería pensada para quienes cuidan su imagen.
              </p>
              
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <Button 
                    variant="dark" 
                    size="lg" 
                    className="px-4 rounded-pill fw-bold"
                    href='/calendario-turnos'
                >
                  Turnos
                </Button>
                
                <Button 
                    variant="outline-dark" 
                    size="lg" 
                    className="px-4 rounded-pill"
                >
                  Más Info
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
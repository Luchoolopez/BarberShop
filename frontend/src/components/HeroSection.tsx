import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/HeroSection.css';
import { useTheme } from '../context/ThemeContext';

export const HeroSection: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark'
  return (
    <section className='hero-section min-vh-10 d-flex align-items-center py-5 border-bottom border-2'>
      <Container>
        <Row className='align-items-center gy-5'>
          <Col md={6} className='text-center text-md-start'>
          <h1 className='display-1 fw-bold tracking-tighter' style={{fontSize: 'clamp(4rem, 12vw, 9rem)'}}>FADEIT</h1>
          <div 
                className={`d-none d-md-block mt-2 ${isDark ? 'bg-light' : 'bg-dark'}`} 
                style={{ width: '120px', height: '6px' }}
            ></div>
          </Col>

          {/* --- DERECHA: TEXTO Y BOTONES --- */}
          <Col md={6}>
            <div className={`p-lg-5 ${isDark ? 'border-start-lg-secondary' : ''}`}>
              <h2 className="h1 mb-3 fw-light">Tu estilo, sin filtros.</h2>
              <p className="lead mb-4 opacity-75">
                La forma más simple de conectar con tu mejor versión. 
                Gestioná tus turnos, elegí tu profesional y olvidate de las esperas.
                Fade It es donde tu imagen toma vuelo.
              </p>
              
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                {/* Botón 1: Color sólido (Invierte según el tema) */}
                <Button 
                    variant={isDark ? "light" : "dark"} 
                    size="lg" 
                    className="px-4 rounded-pill fw-bold"
                >
                  Ver Cortes
                </Button>
                
                {/* Botón 2: Borde (Outline) */}
                <Button 
                    variant={isDark ? "outline-light" : "outline-dark"} 
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
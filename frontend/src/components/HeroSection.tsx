import React from 'react';
import { Button, Container } from 'react-bootstrap';

export const HeroSection: React.FC = () => {
  return (
    <div className="portada_principal text-center py-5">
      <Container>
         <div className="portada_principal_boton">
            <Button variant="primary" size="lg">AGENDAR UN TURNO</Button>
         </div>
      </Container>
    </div>
  );
};
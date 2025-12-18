import React from 'react';
import { Container } from 'react-bootstrap';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-body-tertiary mt-auto">
        <Container className="py-4 text-center">
            <p className="mb-0 text-body-secondary">
                © 2025 Urban Look - Todos los derechos reservados
            </p>
        </Container>
    </footer>
  );
};
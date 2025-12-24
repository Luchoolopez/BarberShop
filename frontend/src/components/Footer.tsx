import React from 'react';
import { Container } from 'react-bootstrap';
import '../App.css'
export const Footer: React.FC = () => {
  return (
    <footer className=" mt-auto bg-black">
        <Container className="py-4 text-center">
            <p className="mb-0 text-white">
                © 2025 Urban Look - Todos los derechos reservados
            </p>
        </Container>
    </footer>
  );
};
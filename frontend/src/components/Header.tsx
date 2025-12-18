import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { ThemeToggleButton } from './ThemeToggleButton';

export const Header: React.FC = () => {
  return (
    <header className="header sticky-top">
      <Navbar expand="lg" className="py-3 bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" className="titulo fw-bold">
            FADE IT
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="menu align-items-center gap-2">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/turnos">Sacar Turno</Nav.Link>
              <Nav.Link href="/contacto">Contactos</Nav.Link>
              <Nav.Link></Nav.Link>
              
              <ThemeToggleButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
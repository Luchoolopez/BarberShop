import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom'; // Si usas react-router

export const MainLayout: React.FC = () => {
  return (
    <>
      <header className="header">
        <Navbar expand="lg" bg="light" variant="light" className="py-3">
          <Container>
            <Navbar.Brand href="#home" className="titulo">Urban Look</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="menu">
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/turnos">Sacar Turno</Nav.Link>
                <Nav.Link href="/contacto">Contactos</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>
        {/* Aquí se renderizarán las páginas (Home, etc.) */}
        <Outlet /> 
      </main>

      <footer>
        {/* Tu footer aquí */}
        <Container className="py-4 text-center">
          <p>© 2025 Urban Look - Todos los derechos reservados</p>
        </Container>
      </footer>
    </>
  );
};
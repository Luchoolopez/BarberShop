import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuthContext();
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
              <Nav.Link
                href={isAuthenticated ? '/mi-perfil' : '/iniciar-sesion'}
              >
                {isAuthenticated ? 'Mi cuenta' : 'Iniciar sesion'}
              </Nav.Link>
              <Nav.Link href="/turnos">Sacar Turno</Nav.Link>
              <Nav.Link href="/beneficios">Beneficios</Nav.Link>
              <Nav.Link href={user?.role === 'admin' ? '/admin' : ''}>{user?.role ? 'Panel de Admin' : ''}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
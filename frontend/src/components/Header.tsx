import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuthContext();
  return (
    <header className="header sticky-top border-bottom border-2">
      <Navbar expand="lg" className="py-3 bg-black" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" className="titulo fw-bold fs-1">
            FADE IT
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end fs-4">
            <Nav className="menu align-items-center gap-2">
              <Nav.Link
                href={isAuthenticated ? '/mi-perfil' : '/iniciar-sesion'}
              >
                {isAuthenticated ? 'Mi cuenta' : 'Iniciar sesion'}
              </Nav.Link>
              <Nav.Link href="/calendario-turnos">Sacar Turno</Nav.Link>
              <Nav.Link href="/premios">Beneficios</Nav.Link>
              <Nav.Link href={user?.role === 'admin' ? '/admin/servicios' : ''}>{user?.role === 'admin' ? 'Panel de Admin' : ''}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
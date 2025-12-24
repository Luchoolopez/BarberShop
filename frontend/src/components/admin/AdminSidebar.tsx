import React, { useState } from 'react';
import { Nav, Button, Offcanvas, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { FaStore, FaCalendarAlt, FaUser, FaBars } from "react-icons/fa"; 
import { FaScissors } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";
import "./AdminSidebar.css";

export const AdminSidebar = () => {
    const { user, logout } = useAuthContext();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SidebarContent = () => (
        <div className="d-flex flex-column h-100 justify-content-between">
            <div>
                <div className="mb-4 text-center">
                    <h3 className="admin-sidebar-title text-uppercase fw-bold text-white mb-0">
                        FADE IT
                    </h3>
                    <small className="text-secondary">Panel de administrador</small>
                </div>

                <div className="admin-sidebar-links d-flex flex-column gap-2">
                    <Nav.Link as={Link} to="/admin/usuarios" className="admin-nav-link text-white" onClick={handleClose}>
                        <FaUser className="admin-nav-icon" />
                        <span>Usuarios</span>
                    </Nav.Link>

                    <Nav.Link as={Link} to="/admin/servicios" className="admin-nav-link text-white" onClick={handleClose}>
                        <FaScissors className="admin-nav-icon" />
                        <span>Servicios</span>
                    </Nav.Link>
                    
                    <Nav.Link as={Link} to="/admin/calendario" className="admin-nav-link text-white" onClick={handleClose}>
                        <FaCalendarAlt className="admin-nav-icon" />
                        <span>Calendario</span>
                    </Nav.Link>

                    <Nav.Link as={Link} to="/admin/premios" className="admin-nav-link text-white" onClick={handleClose}>
                        <RiDiscountPercentFill className="admin-nav-icon" />
                        <span>Premios</span>
                    </Nav.Link>

                    <div className="border-top border-secondary my-2 opacity-50"></div>

                    <Nav.Link as={Link} to="/" className="admin-nav-link text-white" title="Ir a la tienda">
                        <FaStore className="admin-nav-icon" />
                        <span>Ver Sitio Web</span>
                    </Nav.Link>
                </div>
            </div>

            <div className="mt-3">
                <Button variant="outline-light" className="w-100 logout-btn" onClick={logout}>
                    Cerrar sesión
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <Navbar bg="dark" variant="dark" expand={false} className="d-md-none mb-3 w-100">
                <Container fluid>
                    <Navbar.Brand href="#">Panel Admin</Navbar.Brand>
                    <Button variant="outline-light" onClick={handleShow}>
                        <FaBars />
                    </Button>
                    <Offcanvas show={show} onHide={handleClose} responsive="lg" className="bg-dark text-white">
                        <Offcanvas.Header closeButton closeVariant="white">
                            <Offcanvas.Title>Menú</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <SidebarContent />
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
            </Navbar>

            <div className="d-none d-md-flex flex-column bg-black border-end p-3 admin-sidebar vh-100">
                <SidebarContent />
            </div>
        </>
    );
};
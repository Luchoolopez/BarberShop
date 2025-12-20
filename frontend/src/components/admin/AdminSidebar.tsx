import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { FaStore } from "react-icons/fa"; 
import { FaScissors } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

import "./AdminSidebar.css";

export const AdminSidebar = () => {
    const { user, logout } = useAuthContext();

    return (
        <Nav as="nav" className="admin-sidebar vh-100 bg-dark border-end d-flex flex-column justify-content-between p-3">
            <div>
                <div className="mb-4 text-center">
                    <h3 className="admin-sidebar-title text-uppercase fw-bold text-white mb-0">
                        {user?.name}
                    </h3>
                    <small className="text-secondary">{user?.role}</small>
                </div>

                <div className="admin-sidebar-links d-flex flex-column gap-2">


                    <Nav.Link as={Link} to="/admin/servicios" className="admin-nav-link text-white">
                        <FaScissors className="admin-nav-icon" />
                        <span>Servicios</span>
                    </Nav.Link>

                    
                    <Nav.Link as={Link} to="/admin/calendario" className="admin-nav-link text-white">
                        <FaCalendarAlt className="admin-nav-icon" />
                        <span>Calendario</span>
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
        </Nav>
    );
};
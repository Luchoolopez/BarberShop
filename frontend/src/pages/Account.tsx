import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button, Table } from 'react-bootstrap';
import { FaUserCircle, FaStar, FaCalendarAlt, FaPhone, FaEnvelope, FaHistory, FaBan } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Services & Types
import { authService } from '../services/auth.service';
import { appointmentService } from '../services/appointment.service';
import type { User } from '../types/auth.types';
import type { Appointment } from '../types/appointment.types';

export const Account: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar datos al montar
    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        setLoading(true);
        try {
            // 1. Traemos datos frescos del usuario (para ver los puntos actualizados)
            const userData = await authService.checkAuth();
            setUser(userData);

            // 2. Traemos el historial de reservas
            const history = await appointmentService.getMyHistory();
            setAppointments(history);
        } catch (e) {
            console.error(e);
            setError("No se pudieron cargar los datos del perfil.");
        } finally {
            setLoading(false);
        }
    };

    // Helper para los colores de estado
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return <Badge bg="primary">Confirmado</Badge>;
            case 'COMPLETED': return <Badge bg="success">Completado</Badge>;
            case 'CANCELLED': return <Badge bg="danger">Cancelado</Badge>;
            default: return <Badge bg="secondary">{status}</Badge>;
        }
    };

    // Función para cancelar desde el perfil (opcional, reutiliza lógica)
    const handleCancel = async (id: number) => {
        if (!window.confirm("¿Seguro querés cancelar este turno?")) return;
        try {
            await appointmentService.cancelAppointment(id);
            fetchProfileData(); // Recargar para actualizar estado
        } catch (e) {
            alert("Error al cancelar");
        }
    };

    if (loading) {
        return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
    }

    if (!user) {
        return <Alert variant="warning">No has iniciado sesión.</Alert>;
    }

    return (
        <Container className="py-5">
            {error && <Alert variant="danger">{error}</Alert>}

            {/* SECCIÓN SUPERIOR: DATOS Y PUNTOS */}
            <Row className="g-4 mb-5">
                {/* Tarjeta de Datos Personales */}
                <Col md={8}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body className="d-flex align-items-center p-4">
                            <div className="me-4 text-secondary">
                                <FaUserCircle size={80} />
                            </div>
                            <div>
                                <h3 className="fw-bold mb-1">{user.name}</h3>
                                <div className="text-muted d-flex align-items-center gap-2 mb-1">
                                    <FaEnvelope /> {user.email}
                                </div>
                                {user.phone && (
                                    <div className="text-muted d-flex align-items-center gap-2">
                                        <FaPhone /> {user.phone}
                                    </div>
                                )}
                                <div className="mt-3">
                                    <Badge bg="info" text="dark" className="me-2">Cliente</Badge>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Tarjeta de Puntos (Gamification) */}
                <Col md={4}>
                    <Card className="shadow-sm border-0 h-100 bg-primary text-white">
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4 text-center">
                            <h6 className="text-uppercase opacity-75 mb-2">Mis Puntos Floyd</h6>
                            <div className="display-4 fw-bold d-flex align-items-center gap-2">
                                <FaStar className="text-warning" />
                                {user.points_balance}
                            </div>
                            <p className="small mt-2 opacity-75">
                                ¡Seguí sumando para canjear premios increíbles!
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* SECCIÓN INFERIOR: HISTORIAL DE RESERVAS */}
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white py-3">
                    <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                        <FaHistory className="text-primary" /> Historial de Reservas
                    </h5>
                </Card.Header>
                <Card.Body className="p-0">
                    {appointments.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                            <FaCalendarAlt size={40} className="mb-3 opacity-50" />
                            <p>Aún no tenés reservas registradas.</p>
                            <Button variant="outline-primary" href="/reservar">Reservar Turno</Button>
                        </div>
                    ) : (
                        <Table responsive hover className="mb-0 align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Fecha</th>
                                    <th>Hora</th>
                                    <th>Servicio</th>
                                    <th>Precio</th>
                                    <th>Estado</th>
                                    <th className="text-end pe-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <tr key={appt.id}>
                                        <td className="ps-4 fw-bold text-secondary">
                                            {appt.time_slot?.slot_date && 
                                                format(parseISO(appt.time_slot.slot_date), "d 'de' MMMM, yyyy", { locale: es })
                                            }
                                        </td>
                                        <td>
                                            {appt.time_slot?.start_time.slice(0, 5)} hs
                                        </td>
                                        <td>
                                            {appt.service?.name || "Servicio eliminado"}
                                        </td>
                                        <td>
                                            ${appt.recorded_price}
                                        </td>
                                        <td>
                                            {getStatusBadge(appt.status)}
                                        </td>
                                        <td className="text-end pe-4">
                                            {appt.status === 'CONFIRMED' && (
                                                <Button 
                                                    variant="link" 
                                                    className="text-danger p-0 text-decoration-none small"
                                                    onClick={() => handleCancel(appt.id)}
                                                    title="Cancelar Turno"
                                                >
                                                    <FaBan className="me-1"/>Cancelar
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};
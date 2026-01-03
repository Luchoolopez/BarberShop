import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button, Table } from 'react-bootstrap';
import { FaUserCircle, FaStar, FaCalendarAlt, FaPhone, FaEnvelope, FaHistory, FaBan, FaGift, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Services & Types
import { authService } from '../services/auth.service';
import { appointmentService } from '../services/appointment.service';
import { rewardService } from '../services/reward.service'; 
import type { User } from '../types/auth.types';
import type { Appointment } from '../types/appointment.types';
import type { UserReward } from '../types/reward.types'; 
import { useAuthContext } from '../context/AuthContext';

export const Account: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [myRewards, setMyRewards] = useState<UserReward[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuthContext();

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        setLoading(true);
        setError(null);
        try {
            const userData = await authService.checkAuth();
            setUser(userData); 

            try {
                const [history, rewardsData] = await Promise.all([
                    appointmentService.getMyHistory(),
                    rewardService.getMyRewards()
                ]);
                setAppointments(history);
                setMyRewards(rewardsData);
            } catch (dataError) {
                console.error("Error cargando datos secundarios:", dataError);
                setError("Hubo un problema cargando el historial o los premios.");
            }

        } catch (e: any) {
            console.error("Fallo de autenticación:", e);
            if (e.response && e.response.status !== 401) {
                 setError("Error de conexión al cargar el perfil.");
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return <Badge bg="primary">Confirmado</Badge>;
            case 'COMPLETED': return <Badge bg="success">Completado</Badge>;
            case 'CANCELLED': return <Badge bg="danger">Cancelado</Badge>;
            default: return <Badge bg="secondary">{status}</Badge>;
        }
    };

    const handleCancel = async (id: number) => {
        if (!window.confirm("¿Seguro querés cancelar este turno?")) return;
        try {
            await appointmentService.cancelAppointment(id);
            const history = await appointmentService.getMyHistory();
            setAppointments(history);
        } catch (e) {
            alert("Error al cancelar");
        }
    };

    if (loading) {
        return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
    }

    if (!user) {
        return (
            <Container className="py-5">
                <Alert variant="warning">No has iniciado sesión o tu sesión ha expirado.</Alert>
                <div className="text-center">
                    <Button variant="outline-dark" onClick={logout}>
                        Ir al Login
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {error && <Alert variant="warning" dismissible onClose={() => setError(null)}>{error}</Alert>}
            
            <Row className="g-4 mb-4">
                <Col md={8}>
                    <Card className="shadow-sm border-2 h-100">
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

                <Col md={4}>
                    <Card className="shadow-sm border-0 h-100 bg-black text-white">
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

            <Card className="shadow-sm border-2 mb-4">
                <Card.Header className="bg-white py-3">
                    <h5 className="mb-0 fw-bold d-flex align-items-center gap-2 text-warning">
                        <FaGift /> Mis Premios Canjeados
                    </h5>
                </Card.Header>
                <Card.Body className="p-0">
                    {myRewards.length === 0 ? (
                        <div className="text-center py-4 text-muted">
                            <p className="mb-0 small">Aún no has canjeado premios.</p>
                            <Button variant="link" href="/premios" className="text-decoration-none">Ir al Catálogo</Button>
                        </div>
                    ) : (
                        <Table responsive hover className="mb-0 align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Premio</th>
                                    <th>Costo</th>
                                    <th>Estado</th>
                                    <th className="text-end pe-4">Fecha Canje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myRewards.map((ur) => (
                                    <tr key={ur.id}>
                                        <td className="ps-4 fw-bold text-dark">
                                            {ur.reward?.name || "Premio eliminado"}
                                        </td>
                                        <td className="text-muted">
                                            {ur.reward?.points_cost} pts
                                        </td>
                                        <td>
                                            {ur.is_used ? (
                                                <Badge bg="secondary" className="d-inline-flex align-items-center gap-1">
                                                    <FaCheckCircle size={10} /> Usado
                                                </Badge>
                                            ) : (
                                                <Badge bg="success" className="d-inline-flex align-items-center gap-1">
                                                    <FaHourglassHalf size={10} /> Disponible
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="text-end pe-4 small text-muted">
                                            {ur.created_at && format(parseISO(ur.created_at), "dd/MM/yyyy")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            <Card className="shadow-sm border-2 mb-4">
                <Card.Header className="bg-white py-3">
                    <h5 className="mb-0 fw-bold d-flex align-items-center gap-2 text-primary">
                        <FaHistory /> Historial de Reservas
                    </h5>
                </Card.Header>
                <Card.Body className="p-0">
                    {appointments.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                            <FaCalendarAlt size={40} className="mb-3 opacity-50" />
                            <p>Aún no tenés reservas registradas.</p>
                            <Button variant="outline-primary" href="/calendario-turnos">Reservar Turno</Button>
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
                                                    <FaBan className="me-1" />Cancelar
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

            <div>
                <Button variant="outline-danger" onClick={logout}>
                    Cerrar sesión
                </Button>
            </div>
        </Container>
    );
};
import React, { useState } from 'react';
import { Modal, Button, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaClock, FaCalendarAlt, FaCut, FaWhatsapp, FaBan } from 'react-icons/fa';
import type { TimeSlot } from '../../../types/time-slot.types';
import { appointmentService } from '../../../services/appointment.service';

interface BookingInfoModalProps {
    show: boolean;
    onHide: () => void;
    slot: TimeSlot | null;
    onUpdate: () => void; // Para recargar los slots al cancelar
}

export const BookingInfoModal: React.FC<BookingInfoModalProps> = ({ show, onHide, slot, onUpdate }) => {
    const [canceling, setCanceling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!slot) return null;

    const appointment = slot.appointment;
    const client = appointment?.client;
    const service = appointment?.service;

    // Aquí solucionamos tu duda: El teléfono viene del cliente
    // Asegúrate de que en tu tipo ClientInfo (time-slot.types.ts) diga 'phone' o 'phone_number' según lo que devuelve el back
    const clientPhone = client?.phone || client?.phone; 

    const handleWhatsApp = () => {
        if (!clientPhone) return;
        const message = `Hola ${client.name}, te escribimos de la Barbería por tu turno del día ${slot.slot_date} a las ${slot.start_time.slice(0,5)}hs.`;
        const url = `https://wa.me/${clientPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleCancel = async () => {
        if (!appointment?.id) return;
        if (!window.confirm("¿Seguro que deseas cancelar este turno? Se liberará el horario.")) return;

        setCanceling(true);
        setError(null);
        try {
            await appointmentService.cancelAppointment(appointment.id);
            onUpdate(); // Recargar calendario
            onHide();   // Cerrar modal
        } catch (e) {
            console.error(e);
            setError("Error al cancelar el turno.");
        } finally {
            setCanceling(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detalle del Horario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <div className="mb-3 p-3 bg-light rounded border d-flex justify-content-between align-items-center">
                    <div>
                        <div className="text-muted small mb-1"><FaCalendarAlt className="me-1"/> {slot.slot_date}</div>
                        <div className="fs-4 fw-bold text-primary"><FaClock className="me-1"/> {slot.start_time.slice(0, 5)}</div>
                    </div>
                    <div>
                        {slot.is_booked ? <Badge bg="primary">Reservado</Badge> : <Badge bg="success">Disponible</Badge>}
                    </div>
                </div>

                {slot.is_booked && appointment ? (
                    <>
                        <div className="mb-3">
                            <h6 className="fw-bold text-secondary border-bottom pb-2 mb-2"><FaUser className="me-2" />Datos del Cliente</h6>
                            {client ? (
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="px-0 py-1 border-0"><strong>Nombre:</strong> {client.name}</ListGroup.Item>
                                    <ListGroup.Item className="px-0 py-1 border-0"><strong>Email:</strong> {client.email}</ListGroup.Item>
                                    {clientPhone && (
                                        <ListGroup.Item className="px-0 py-1 border-0 d-flex justify-content-between align-items-center">
                                            <span><strong>Teléfono:</strong> {clientPhone}</span>
                                            <Button variant="success" size="sm" onClick={handleWhatsApp} title="Enviar WhatsApp">
                                                <FaWhatsapp />
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            ) : <p className="text-danger small">Sin datos de cliente.</p>}
                        </div>

                        <div>
                            <h6 className="fw-bold text-secondary border-bottom pb-2 mb-2"><FaCut className="me-2" />Servicio</h6>
                            {service ? (
                                <div className="d-flex justify-content-between bg-light p-2 rounded">
                                    <span>{service.name}</span>
                                    <span className="fw-bold text-success">${service.price}</span>
                                </div>
                            ) : <p className="text-muted small">Sin servicio.</p>}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-muted">
                        <p className="mb-0">Este horario está libre.</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
                {slot.is_booked && (
                    <Button variant="danger" onClick={handleCancel} disabled={canceling}>
                        {canceling ? <Spinner size="sm" animation="border"/> : <><FaBan className="me-2"/>Cancelar Turno</>}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};
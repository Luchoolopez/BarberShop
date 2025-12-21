import React, { useState } from 'react';
import { Modal, Button, ListGroup, Badge, Form, Spinner, Alert } from 'react-bootstrap';
import { FaUser, FaClock, FaCalendarAlt, FaCut, FaPhone, FaWhatsapp, FaEdit } from 'react-icons/fa';
import type { TimeSlot } from '../../../types/time-slot.types';
import { appointmentService } from '../../../services/appointment.service';

interface BookingInfoModalProps {
    show: boolean;
    onHide: () => void;
    slot: TimeSlot | null;
    onUpdate: () => void;
}

export const BookingInfoModal: React.FC<BookingInfoModalProps> = ({ show, onHide, slot, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    if (!slot) return null;

    const appointment = slot.appointment;
    const client = appointment?.client;
    const service = appointment?.service;

    const handleWhatsApp = () => {
        if (!client?.phone) return;
        const message = `Hola ${client.name}, te escribimos por tu turno del día ${slot.slot_date} a las ${slot.start_time.slice(0,5)}hs.`;
        const url = `https://wa.me/${client.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const startEditing = () => {
        if (appointment) {
            setNewStatus(appointment.status);
            setIsEditing(true);
        }
    };

    const handleSaveStatus = async () => {
        if (!appointment) return;
        setLoading(true);
        setError(null);
        try {
            await appointmentService.updateStatus(appointment.id, newStatus);
            onUpdate(); 
            setIsEditing(false);
            onHide();
        } catch (e: any) {
            console.error(e);
            setError(e.response?.data?.message || "Error al actualizar estado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {appointment ? 'Gestionar Turno' : 'Horario Disponible'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <div className="mb-3 p-3 bg-light rounded border d-flex justify-content-between align-items-center">
                    <div>
                        <div className="text-muted small mb-1"><FaCalendarAlt className="me-1"/> {slot.slot_date}</div>
                        <div className="fs-4 fw-bold text-primary"><FaClock className="me-1"/> {slot.start_time.slice(0, 5)}</div>
                    </div>
                    <div>
                        {appointment ? (
                            <Badge bg={
                                appointment.status === 'CONFIRMED' ? 'primary' :
                                appointment.status === 'COMPLETED' ? 'success' : 'danger'
                            }>
                                {appointment.status}
                            </Badge>
                        ) : (
                            <Badge bg="success">Libre</Badge>
                        )}
                    </div>
                </div>

                {appointment && client ? (
                    <>
                        <ListGroup variant="flush" className="mb-3">
                            <ListGroup.Item>
                                <strong><FaUser className="me-2"/>Cliente:</strong> {client.name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong><FaPhone className="me-2"/>Contacto:</strong> {client.phone || '-'}
                                {client.phone && (
                                    <Button variant="link" size="sm" onClick={handleWhatsApp} className="text-success ms-2 p-0">
                                        <FaWhatsapp size={20}/>
                                    </Button>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong><FaCut className="me-2"/>Servicio:</strong> {service?.name}
                            </ListGroup.Item>
                        </ListGroup>

                        <div className="border-top pt-3">
                            {!isEditing ? (
                                <Button variant="outline-secondary" size="sm" onClick={startEditing} className="w-100">
                                    <FaEdit className="me-2"/> Cambiar Estado Manualmente
                                </Button>
                            ) : (
                                <div className="bg-light p-2 rounded border">
                                    <Form.Label className="small fw-bold">Nuevo Estado:</Form.Label>
                                    <Form.Select 
                                        value={newStatus} 
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="mb-2"
                                    >
                                        <option value="confirmed">CONFIRMED (Pendiente)</option>
                                        <option value="completed">COMPLETED (Finalizado + Puntos)</option>
                                        <option value="cancelled">CANCELLED (Cancelado + Libera Slot)</option>
                                    </Form.Select>
                                    <div className="d-flex gap-2">
                                        <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)} className="flex-grow-1">
                                            Cancelar
                                        </Button>
                                        <Button variant="primary" size="sm" onClick={handleSaveStatus} disabled={loading} className="flex-grow-1">
                                            {loading ? <Spinner size="sm" animation="border"/> : 'Guardar Cambio'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-muted text-center py-3">Este horario no tiene reservas.</p>
                )}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};
import React from 'react';
import { Modal, Button, ListGroup, Alert } from 'react-bootstrap';
import type { TimeSlot } from '../../types/time-slot.types';
import type { Service } from '../../types/service.types';

interface ConfirmBookingModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    loading: boolean;
    slot: TimeSlot | null;
    service: Service | null;
}

export const ConfirmBookingModal: React.FC<ConfirmBookingModalProps> = ({ 
    show, onHide, onConfirm, loading, slot, service 
}) => {
    if (!slot || !service) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Reserva</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="info">
                    Por favor revisá los datos de tu turno.
                </Alert>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>Día:</strong> {slot.slot_date}</ListGroup.Item>
                    <ListGroup.Item><strong>Hora:</strong> {slot.start_time.slice(0,5)} hs</ListGroup.Item>
                    <ListGroup.Item><strong>Servicio:</strong> {service.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Duración:</strong> {service.duration_minutes} min</ListGroup.Item>
                    <ListGroup.Item><strong>Precio:</strong> <span className="text-success fw-bold">${service.price}</span></ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={onConfirm} disabled={loading}>
                    {loading ? 'Confirmando...' : 'Confirmar Reserva'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ServiceDeleteModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    serviceName: string;
}

export const ServiceDeleteModal: React.FC<ServiceDeleteModalProps> = ({ 
    show, 
    onHide, 
    onConfirm, 
    serviceName 
}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Seguro que deseas desactivar el servicio <strong>{serviceName}</strong>?
                <br />
                <span className="text-muted small">Esta acción solo desactivara el servicio, se puede volver a restaurar.</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="danger" onClick={onConfirm}>Desactivar</Button>
            </Modal.Footer>
        </Modal>
    );
};
import React from 'react';
import { Form, Card, Badge } from 'react-bootstrap';
import { FaCut } from 'react-icons/fa';
import type { Service } from '../../../types/service.types';

interface ServiceSelectorProps {
    services: Service[];
    selectedService: number | null;
    onSelect: (id: number) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services, selectedService, onSelect }) => {
    return (
        <Card className="mb-4 shadow-sm border-2">
            <Card.Header className="bg-white fw-bold text-black">
                <FaCut className="me-2" /> 1. Elegí tu servicio
            </Card.Header>
            <Card.Body>
                {services.length === 0 ? (
                    <p className="text-muted small">No hay servicios disponibles.</p>
                ) : (
                    <div className="d-flex flex-column gap-2">
                        {services.map((service) => (
                            <div 
                                key={service.id}
                                onClick={() => onSelect(service.id)}
                                className={`p-3 rounded border cursor-pointer d-flex justify-content-between align-items-center ${selectedService === service.id ? 'border-primary bg-light' : ''}`}
                                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                            >
                                <div>
                                    <div className="fw-bold">{service.name}</div>
                                    <div className="text-muted small">{service.duration_minutes} min</div>
                                </div>
                                <div className="text-end">
                                    <Badge bg="success" className="fs-6">${service.price}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};
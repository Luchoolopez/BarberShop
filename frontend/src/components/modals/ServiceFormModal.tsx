import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export interface ServiceFormData {
    name: string;
    description: string;
    price: number | string;           
    duration_minutes: number | string;
    points_reward: number | string;   
}

interface ServiceFormModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (data: ServiceFormData) => void;
    initialData?: any | null;
}

const INITIAL_STATE: ServiceFormData = {
    name: '',
    description: '',
    price: '', 
    duration_minutes: 30,
    points_reward: 10
};

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ 
    show, 
    onHide, 
    onSubmit, 
    initialData 
}) => {
    const [formData, setFormData] = useState<ServiceFormData>(INITIAL_STATE);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (show && initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description || '',
                price: initialData.price, 
                duration_minutes: initialData.duration_minutes,
                points_reward: initialData.points_reward || 0
            });
        } else if (show && !initialData) {
            setFormData(INITIAL_STATE);
        }
    }, [show, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isNumberField = ['price', 'duration_minutes', 'points_reward'].includes(name);
        
        setFormData(prev => ({
            ...prev,
            [name]: isNumberField 
                ? (value === '' ? '' : Number(value)) 
                : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current && !formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }
        const finalData = {
            ...formData,
            price: formData.price === '' ? 0 : formData.price,
            duration_minutes: formData.duration_minutes === '' ? 0 : formData.duration_minutes,
            points_reward: formData.points_reward === '' ? 0 : formData.points_reward,
        };
        onSubmit(finalData as ServiceFormData);
    };

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Editar Servicio' : 'Nuevo Servicio'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre del Servicio</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    autoFocus 
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                             <Form.Group className="mb-3">
                                <Form.Label>Puntos de Recompensa</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="points_reward" 
                                    value={formData.points_reward} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={2}
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required
                        />
                    </Form.Group>
                    
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio ($)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="price" 
                                    value={formData.price} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Duración (min)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="duration_minutes" 
                                    value={formData.duration_minutes} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide} type="button">Cancelar</Button>
                        <Button variant="primary" type="submit">
                            {initialData ? 'Guardar Cambios' : 'Crear Servicio'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
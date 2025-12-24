import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import type { Reward } from '../../types/reward.types';

interface RewardFormModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData: Reward | null;
}

export const RewardFormModal: React.FC<RewardFormModalProps> = ({ show, onHide, onSubmit, initialData }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (show) {
            if (initialData) {
                setName(initialData.name);
                setDescription(initialData.description);
                setPoints(String(initialData.points_cost));
            } else {
                setName('');
                setDescription('');
                setPoints('');
            }
            setError(null);
        }
    }, [show, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSubmit({
                name,
                description,
                points_cost: Number(points),
                active: true
            });
        } catch (err) {
            setError("Error al guardar el premio");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{initialData ? 'Editar Premio' : 'Nuevo Premio'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Premio</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej: Corte Gratis"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ej: Canje válido por un corte clásico..."
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Costo en Puntos</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={points} 
                            onChange={(e) => setPoints(e.target.value)}
                            placeholder="Ej: 1000"
                            min="1"
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
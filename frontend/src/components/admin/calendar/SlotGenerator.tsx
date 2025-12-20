import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';

interface SlotGeneratorProps {
    startTime: string;
    setStartTime: (time: string) => void;
    endTime: string;
    setEndTime: (time: string) => void;
    interval: number;
    setInterval: (min: number) => void;
    onGenerate: () => void;
    loading: boolean;
}

export const SlotGenerator: React.FC<SlotGeneratorProps> = ({
    startTime, setStartTime, endTime, setEndTime, interval, setInterval, onGenerate, loading
}) => {
    return (
        <div className="bg-light p-4 rounded mb-4 border">
            <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                <FaClock /> Generar Intervalos Automáticos
            </h6>
            <Row className="g-3 align-items-end">
                <Col xs={6} md={3}>
                    <Form.Label className="small fw-bold text-muted">Apertura</Form.Label>
                    <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </Col>
                <Col xs={6} md={3}>
                    <Form.Label className="small fw-bold text-muted">Cierre</Form.Label>
                    <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </Col>
                <Col xs={12} md={3}>
                    <Form.Label className="small fw-bold text-muted">Intervalo</Form.Label>
                    <Form.Select value={interval} onChange={(e) => setInterval(Number(e.target.value))}>
                        <option value={15}>15 min</option>
                        <option value={30}>30 min</option>
                        <option value={45}>45 min</option>
                        <option value={60}>60 min</option>
                    </Form.Select>
                </Col>
                <Col xs={12} md={3}>
                    <Button variant="primary" className="w-100 fw-bold" onClick={onGenerate} disabled={loading}>
                        Generar
                    </Button>
                </Col>
            </Row>
        </div>
    );
};
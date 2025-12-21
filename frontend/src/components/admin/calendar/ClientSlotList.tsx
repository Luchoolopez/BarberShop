import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import { parseISO, isBefore, set } from 'date-fns';
import type { TimeSlot } from '../../../types/time-slot.types';

interface ClientSlotListProps {
    slots: TimeSlot[];
    onSelectSlot: (slot: TimeSlot) => void;
    selectedSlotId: number | null;
}

export const ClientSlotList: React.FC<ClientSlotListProps> = ({ slots, onSelectSlot, selectedSlotId }) => {
    const now = new Date();

    const availableSlots = slots.filter(slot => {
        if (slot.is_booked) return false;

        const slotDate = parseISO(slot.slot_date);
        const [hours, minutes] = slot.start_time.split(':').map(Number);
        const slotDateTime = set(slotDate, { hours, minutes });
        
        return !isBefore(slotDateTime, now);
    });

    if (availableSlots.length === 0) {
        return (
            <div className="text-center py-5 text-muted border rounded bg-light">
                <p className="mb-0">No hay turnos disponibles para este día.</p>
            </div>
        );
    }

    return (
        <Row className="g-2">
            {availableSlots.map((slot) => (
                <Col xs={4} sm={3} md={4} lg={3} key={slot.id}>
                    <Button
                        variant={selectedSlotId === slot.id ? "primary" : "outline-primary"}
                        className="w-100 py-2 position-relative"
                        onClick={() => onSelectSlot(slot)}
                    >
                        <FaClock className="me-1 mb-1" size={12}/>
                        <strong>{slot.start_time.slice(0, 5)}</strong>
                    </Button>
                </Col>
            ))}
        </Row>
    );
};
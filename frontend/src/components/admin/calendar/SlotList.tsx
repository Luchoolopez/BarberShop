import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaUser, FaHistory } from 'react-icons/fa';
import { MdOutlineCleaningServices } from "react-icons/md";
import type { TimeSlot } from '../../../types/time-slot.types';
import { parseISO, set, isBefore } from 'date-fns';

interface SlotListProps {
    slots: TimeSlot[];
    loading: boolean;
    onClearDay: () => void;
    onSlotClick: (slot: TimeSlot) => void;
}

export const SlotList: React.FC<SlotListProps> = ({ slots, loading, onClearDay, onSlotClick }) => {
    
    // Helper para saber si ya pasó la hora
    const isSlotPast = (slot: TimeSlot) => {
        const now = new Date();
        const slotDate = parseISO(slot.slot_date);
        const [hours, minutes] = slot.start_time.split(':').map(Number);
        const slotDateTime = set(slotDate, { hours, minutes });
        return isBefore(slotDateTime, now);
    };

    const getBadgeStyle = (slot: TimeSlot) => {
        const isPast = isSlotPast(slot);
        if (slot.is_booked) return { bg: "primary", className: "slot-badge", title: "Reservado" };
        if (isPast) return { bg: "secondary", className: "slot-badge slot-past", title: "Pasado" };
        return { bg: "success", className: "slot-badge", title: "Disponible" };
    };

    const formatTimeDisplay = (timeStr: string) => timeStr.slice(0, 5);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Horarios ({slots.length})</h6>
                {slots.length > 0 && (
                    <Button variant="outline-danger" size="sm" onClick={onClearDay} disabled={loading}>
                        <MdOutlineCleaningServices className="me-2" /> Limpiar Libres
                    </Button>
                )}
            </div>

            {slots.length === 0 ? (
                <div className="text-center text-muted py-5 border rounded border-dashed bg-light">
                    <p className="mb-0">No hay disponibilidad configurada.</p>
                </div>
            ) : (
                <div className="d-flex flex-wrap gap-2">
                    {slots.map((slot) => {
                        const style = getBadgeStyle(slot);
                        const isPast = isSlotPast(slot);
                        return (
                            <Badge
                                key={slot.id}
                                bg={style.bg}
                                className={`p-2 d-flex align-items-center gap-2 shadow-sm border ${style.className}`}
                                style={{ fontSize: '0.95rem', fontWeight: '500' }}
                                onClick={() => onSlotClick(slot)}
                                title={style.title}
                            >
                                {formatTimeDisplay(slot.start_time)}
                                {slot.is_booked ? <FaUser size={12} /> : isPast ? <FaHistory size={12} /> : <FaCheckCircle style={{ opacity: 0.7 }} />}
                            </Badge>
                        );
                    })}
                </div>
            )}
        </>
    );
};
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { CalendarSidebar } from '../../components/admin/calendar/CalendarSidebar';
import { SlotGenerator } from '../../components/admin/calendar/SlotGenerator';
import { SlotList } from '../../components/admin/calendar/SlotList';
import { BookingInfoModal } from '../../components/admin/calendar/BookingInfoModal';

import { useTimeSlots } from '../../hooks/useTimeSlots';
import type { TimeSlot } from '../../types/time-slot.types';

const css = `
  .rdp { --rdp-cell-size: 45px; --rdp-accent-color: #0d6efd; margin: 0; }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #e9ecef; }
  .rdp-day_selected { font-weight: bold; }
  .slot-badge { cursor: pointer; transition: all 0.2s ease-in-out; user-select: none; }
  .slot-badge:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  .slot-past { opacity: 0.5; filter: grayscale(100%); cursor: default; }
  .slot-past:hover { transform: none; box-shadow: none; }
`;

export const AdminCalendar: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [interval, setInterval] = useState(60);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    const { slots, loading, error, fetchSlots, generateSlots, clearDay } = useTimeSlots();

    useEffect(() => {
        if (selectedDay) {
            const dateStr = format(selectedDay, 'yyyy-MM-dd');
            fetchSlots(dateStr);
            setSuccessMsg(null);
        }
    }, [selectedDay, fetchSlots]);

    const handleGenerate = async () => {
        if (!selectedDay) return;
        setSuccessMsg(null);
        try {
            await generateSlots({
                date: format(selectedDay, 'yyyy-MM-dd'),
                open_time: startTime,
                close_time: endTime,
                interval_minutes: interval
            });
            setSuccessMsg("¡Horarios generados correctamente!");
        } catch (e) { console.error(e); }
    };

    const handleClearDay = async () => {
        if (!selectedDay) return;
        if (!window.confirm("¿Estás seguro? Esto borrará todos los turnos LIBRES de este día.")) return;
        try {
            await clearDay(format(selectedDay, 'yyyy-MM-dd'));
            setSuccessMsg("Día limpiado correctamente.");
        } catch (e) { console.error(e); }
    };

    const handleSlotClick = (slot: TimeSlot) => {
        setSelectedSlot(slot);
        setShowInfoModal(true);
    };

    const handleRefresh = () => {
        if (selectedDay) fetchSlots(format(selectedDay, 'yyyy-MM-dd'));
    };

    return (
        <Container className="py-5">
            <style>{css}</style>
            
            <div className="d-flex align-items-center mb-4 gap-2">
                <h2 className="mb-0">Gestión de Disponibilidad</h2>
            </div>

            <Row className="g-4">
                <Col md={5} lg={4}>
                    <CalendarSidebar selectedDay={selectedDay} onSelect={setSelectedDay} />
                </Col>

                <Col md={7} lg={8}>
                    <Card className="shadow-sm border-2 h-100">
                        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 text-black fw-bold">
                                {selectedDay ? format(selectedDay, "EEEE d 'de' MMMM", { locale: es }) : "Selecciona una fecha"}
                            </h5>
                            {loading && <Spinner animation="border" size="sm" variant="primary" />}
                        </Card.Header>
                        
                        <Card.Body>
                            {!selectedDay ? (
                                <Alert variant="info">Por favor selecciona una fecha en el calendario.</Alert>
                            ) : (
                                <>
                                    {error && <Alert variant="danger" dismissible>{error}</Alert>}
                                    {successMsg && <Alert variant="success" dismissible onClose={() => setSuccessMsg(null)}><FaCheckCircle className="me-2"/>{successMsg}</Alert>}

                                    <SlotGenerator 
                                        startTime={startTime} setStartTime={setStartTime}
                                        endTime={endTime} setEndTime={setEndTime}
                                        interval={interval} setInterval={setInterval}
                                        onGenerate={handleGenerate} loading={loading}
                                    />

                                    <hr className="my-4 text-muted" />

                                    <SlotList 
                                        slots={slots} 
                                        loading={loading} 
                                        onClearDay={handleClearDay}
                                        onSlotClick={handleSlotClick}
                                    />
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <BookingInfoModal 
                show={showInfoModal} 
                onHide={() => setShowInfoModal(false)} 
                slot={selectedSlot}
                onUpdate={handleRefresh} 
            />
        </Container>
    );
};
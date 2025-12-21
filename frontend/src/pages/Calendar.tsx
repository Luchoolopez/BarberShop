import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { format } from 'date-fns';
import { CalendarSidebar } from '../components/admin/calendar/CalendarSidebar';
import { ServiceSelector } from '../components/admin/calendar/ServiceSelector';
import { ClientSlotList } from '../components/admin/calendar/ClientSlotList';
import { ConfirmBookingModal } from '../components/modals/ConfirmBookModal';
// Servicios y Tipos
import { timeSlotService } from '../services/time-slot.service';
import { serviceService } from '../services/service.service';
import { appointmentService } from '../services/appointment.service';
import type { TimeSlot } from '../types/time-slot.types';
import type { Service } from '../types/service.types';

export const Calendar: React.FC = () => {
    // State
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [services, setServices] = useState<Service[]>([]);
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    
    // Selection State
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    // UI State
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // 1. Cargar Servicios al inicio
    useEffect(() => {
        loadServices();
    }, []);

    // 2. Cargar Slots cuando cambia la fecha
    useEffect(() => {
        if (selectedDate) {
            loadSlots(selectedDate);
            setSelectedSlot(null); // Resetear slot si cambia el día
        }
    }, [selectedDate]);

    const loadServices = async () => {
        try {
            const data = await serviceService.getActiveService(); // Asegúrate de usar el método que trae solo activos
            setServices(data);
        } catch (e) {
            console.error(e);
            setError("No se pudieron cargar los servicios.");
        } finally {
            setLoadingServices(false);
        }
    };

    const loadSlots = async (date: Date) => {
        setLoadingSlots(true);
        setError(null);
        try {
            const dateStr = format(date, 'yyyy-MM-dd');
            const data = await timeSlotService.getSlotsByDate(dateStr);
            setSlots(data);
        } catch (e) {
            console.error(e);
            setSlots([]); // Si falla o no hay slots
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleSlotClick = (slot: TimeSlot) => {
        if (!selectedServiceId) {
            alert("Por favor seleccioná un servicio primero.");
            return;
        }
        setSelectedSlot(slot);
        setShowModal(true);
    };

    const handleConfirmBooking = async () => {
        if (!selectedSlot || !selectedServiceId) return;

        setBookingLoading(true);
        try {
            await appointmentService.createAppointment({
                time_slot_id: selectedSlot.id,
                service_id: selectedServiceId
            });
            
            setSuccessMsg("¡Turno reservado con éxito! Te esperamos.");
            setShowModal(false);
            
            // Recargar slots para que el reservado desaparezca
            if (selectedDate) loadSlots(selectedDate);
            setSelectedSlot(null);
            
        } catch (e: any) {
            console.error(e);
            alert(e.response?.data?.message || "Error al reservar el turno.");
        } finally {
            setBookingLoading(false);
        }
    };

    const selectedServiceObj = services.find(s => s.id === selectedServiceId) || null;

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-center fw-bold">Reservá tu Turno</h2>
            
            {successMsg && <Alert variant="success" onClose={() => setSuccessMsg(null)} dismissible>{successMsg}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Row>
                {/* Columna Izquierda: Calendario y Servicio */}
                <Col md={5} lg={4}>
                    {loadingServices ? (
                        <div className="text-center"><Spinner animation="border" /></div>
                    ) : (
                        <ServiceSelector 
                            services={services} 
                            selectedService={selectedServiceId} 
                            onSelect={setSelectedServiceId} 
                        />
                    )}

                    <div className="mb-4">
                         <h6 className="fw-bold mb-3">2. Elegí el día</h6>
                         <CalendarSidebar 
                            selectedDay={selectedDate} 
                            onSelect={setSelectedDate} 
                         />
                    </div>
                </Col>

                {/* Columna Derecha: Horarios */}
                <Col md={7} lg={8}>
                    <div className="bg-white p-4 rounded shadow-sm border h-100">
                        <h5 className="fw-bold mb-4 border-bottom pb-2">3. Horarios Disponibles</h5>
                        
                        {!selectedDate ? (
                            <Alert variant="info">Selecciona un día en el calendario.</Alert>
                        ) : loadingSlots ? (
                            <div className="text-center py-5"><Spinner animation="border" variant="primary"/></div>
                        ) : (
                            <ClientSlotList 
                                slots={slots} 
                                selectedSlotId={selectedSlot?.id || null} 
                                onSelectSlot={handleSlotClick} 
                            />
                        )}
                    </div>
                </Col>
            </Row>

            <ConfirmBookingModal 
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={handleConfirmBooking}
                loading={bookingLoading}
                slot={selectedSlot}
                service={selectedServiceObj}
            />
        </Container>
    );
};
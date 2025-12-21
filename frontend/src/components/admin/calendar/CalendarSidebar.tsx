import React from 'react';
import { Card } from 'react-bootstrap';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

interface CalendarSidebarProps {
    selectedDay: Date | undefined;
    onSelect: (date: Date | undefined) => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ selectedDay, onSelect }) => {
    return (
        <Card className="shadow-sm border-2 h-100">
            <Card.Body className="d-flex justify-content-center align-items-start p-3">
                <DayPicker
                    mode="single"
                    selected={selectedDay}
                    onSelect={onSelect}
                    locale={es}
                    showOutsideDays
                    footer={
                        <div className="mt-3 text-center small text-muted">
                            Selecciona un día para gestionar.
                        </div>
                    }
                />
            </Card.Body>
        </Card>
    );
};
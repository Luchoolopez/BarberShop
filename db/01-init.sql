CREATE DATABASE IF NOT EXISTS peluqueria_db;
USE peluqueria_db;

-- Tabla para los administradores (para futuro login)
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Tabla de Bloques de Tiempo Disponibles
-- El admin crea estos registros. "El 12/12/25 a las 10:00 estoy disponible"
CREATE TABLE IF NOT EXISTS time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    -- Un booleano para chequeo rápido, aunque se puede deducir de la tabla appointments.
    -- Ayuda a simplificar las queries de "dame los disponibles".
    is_booked BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Índice único compuesto: No puede haber dos bloques el mismo día a la misma hora
    UNIQUE KEY unique_slot (slot_date, start_time)
);

-- Tabla de Turnos (Reservas)
-- Cuando un usuario reserva, se crea una entrada aquí y se linkea al time_slot
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time_slot_id INT NOT NULL,
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20),
    status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
    cancellation_reason TEXT NULL, -- Solo se llena si el admin cancela
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (time_slot_id) REFERENCES time_slots(id) ON DELETE RESTRICT
);
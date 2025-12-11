CREATE DATABASE IF NOT EXISTS barbershop_db;
USE barbershop_db;

-- 1. Tabla de Usuarios (Sirve para Admins y Clientes)
-- Unificamos todo aquí. El campo 'role' define los permisos.
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Recuerda guardar esto HASHEADO (bcrypt)
    phone VARCHAR(20),
    role ENUM('admin', 'client') DEFAULT 'client', -- Aquí diferenciamos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Tabla de Servicios (NUEVA)
-- Indispensable para que el cliente elija "Corte de hombre" o "Alisado".
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- Ej: "Corte Clásico", "Barba"
    description TEXT,
    price DECIMAL(10, 2) NOT NULL, -- Ej: 5000.00
    duration_minutes INT DEFAULT 60, -- Dato útil para el futuro (aunque ahora uses slots fijos)
    active BOOLEAN DEFAULT TRUE -- Por si dejas de ofrecer un servicio sin borrarlo del historial
);

-- 3. Tabla de Bloques de Tiempo (Slots)
-- Mantenemos tu lógica de "Slots predefinidos por el admin".
CREATE TABLE IF NOT EXISTS time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_slot (slot_date, start_time)
);

-- 4. Tabla de Turnos (Appointments)
-- Ahora relaciona al User (cliente) con el Slot y el Servicio.
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,       -- Quién reserva
    time_slot_id INT NOT NULL,  -- Cuándo
    service_id INT NOT NULL,    -- Qué se hace
    status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    recorded_price DECIMAL(10, 2) NOT NULL,
    cancellation_reason TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Relaciones (Foreign Keys)
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (time_slot_id) REFERENCES time_slots(id) ON DELETE RESTRICT,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT
);
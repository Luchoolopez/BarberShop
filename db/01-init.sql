CREATE DATABASE IF NOT EXISTS barbershop_db;
USE barbershop_db;

-- 1. Tabla de Usuarios (Admins y Clientes)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    phone VARCHAR(20),
    role ENUM('admin', 'client') DEFAULT 'client',
    points_balance INT DEFAULT 0, -- NUEVO: Saldo de puntos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Tabla de Servicios (Catálogo)
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    description TEXT,
    price DECIMAL(10, 2) NOT NULL, 
    duration_minutes INT DEFAULT 60, 
    points_reward INT DEFAULT 0, -- NUEVO: Cuántos puntos gana el cliente al hacerlo
    active BOOLEAN DEFAULT TRUE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Tabla de Bloques de Tiempo (Horarios disponibles)
CREATE TABLE IF NOT EXISTS time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_slot (slot_date, start_time)
);

-- 4. Tabla de Turnos (Reservas)
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,      
    time_slot_id INT NOT NULL, 
    service_id INT NOT NULL,   
    status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    recorded_price DECIMAL(10, 2) NOT NULL, -- Precio congelado al momento de reservar
    cancellation_reason TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (time_slot_id) REFERENCES time_slots(id) ON DELETE RESTRICT,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT
);

-- 5. Tabla de Premios (Catálogo de canjes) -- NUEVA
CREATE TABLE IF NOT EXISTS rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,       
    description TEXT,
    points_cost INT NOT NULL,         -- Cuánto cuesta canjearlo
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Tabla de Premios de Usuarios (Billetera de cupones) -- NUEVA
CREATE TABLE IF NOT EXISTS user_rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reward_id INT NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,      -- Si ya lo gastó en el local
    used_at TIMESTAMP NULL,             
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reward_id) REFERENCES rewards(id) ON DELETE RESTRICT
);

-- 7. Historial de Puntos (Auditoría) -- NUEVA (Opcional pero recomendada)
CREATE TABLE IF NOT EXISTS points_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount INT NOT NULL,        -- Ej: +100 o -500
    description VARCHAR(255),   -- Ej: "Corte realizado", "Canje de premio"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
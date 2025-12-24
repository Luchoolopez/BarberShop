INSERT INTO users (name, email, password, phone, role, points_balance)
VALUES (
    'Admin Principal',
    'admin@barbershop.com',
    '$2b$10$e/oq7XbHaBbvfpZjxrpkheBSk86q3/wpH/io9evthrMrWSuhW2BIa',
    '1122334455',
    'admin',
    1000000
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    password = VALUES(password),
    phone = VALUES(phone),
    role = VALUES(role),
    points_balance = VALUES(points_balance);



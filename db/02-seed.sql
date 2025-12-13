INSERT INTO users (name, email, password, phone, role, points_balance) 
VALUES 
(
    'Admin Principal', 
    'admin@barbershop.com', 
    '$2b$10$vI8aWBnW3fBr4ffg5d3eye.99UtvByJb5Zy.Fv09VrD3.7bx.7.7', 
    '1122334455', 
    'admin',
    1000000 -- Le damos un millón de puntos para que pueda testear canjes si quiere
);


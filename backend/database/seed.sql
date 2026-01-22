-- Datos de prueba para Bride Squad Valencia 2026
-- Ejecutar en la base de datos creada

-- 1. Crear el grupo de prueba
INSERT INTO groups (code, pin_hash, name) 
VALUES ('VSQ-2026', '1234', 'Bride Squad Valencia 2026');

-- Obtener ID del grupo (asumimos 1 si es el primero)
SET @group_id = (SELECT id FROM groups WHERE code = 'VSQ-2026');

-- 2. Alojamientos sugeridos
INSERT INTO accommodations (group_id, name, zone, type, capacity, price_min, price_max, pros, cons, tags_json) 
VALUES 
(@group_id, 'Apartamento Ruzafa Glam', 'Ruzafa', 'Apartamento', 13, 85.00, 110.00, 'Barrio de moda, cerca de marcha', 'Un poco ruidoso de noche', '["Ruzafa", "Vibrante"]'),
(@group_id, 'Penthouse Cabanyal Beach', 'Cabanyal', 'Apartamento', 14, 95.00, 130.00, 'Vistas al mar e impresionantes', 'Lejos del centro histórico', '["Playa", "Vistas"]'),
(@group_id, 'Boutique Hostel Ciutat Vella', 'Centro', 'Hostel', 20, 45.00, 70.00, 'Ubicación inmejorable, muy barato', 'Habitaciones compartidas', '["Centro", "Económico"]');

-- 3. Actividades
INSERT INTO activities (group_id, category, name, time_slot, price_min, price_max, duration, location)
VALUES
(@group_id, 'Boat Party', 'Valencia Boat Party (Sábado)', 'Tarde', 45.00, 60.00, '3h', 'Marina de Valencia'),
(@group_id, 'Discoteca', 'Umbracle / Mya', 'Noche', 20.00, 35.00, 'Toda la noche', 'Ciudad de las Artes'),
(@group_id, 'Tardeo', 'Marina Beach Club', 'Tarde', 15.00, 50.00, '4h', 'Playa de la Malvarrosa'),
(@group_id, 'Restaurante', 'Cena Show temático', 'Noche', 40.00, 60.00, '3h', 'Zona Centro');

-- 4. Itinerario Base
INSERT INTO itinerary_blocks (group_id, day, slot, title, description, est_cost, order_index)
VALUES
(@group_id, '2026-07-10', '18:00', 'Llegada Valencia (Tren)', 'Llegada a la estación Joaquín Sorolla desde Valdepeñas.', 75.00, 1),
(@group_id, '2026-07-10', '20:00', 'Check-in y Brindis', 'Entrada al alojamiento y primera ronda de fucsia.', 0.00, 2),
(@group_id, '2026-07-10', '22:00', 'Cena de Bienvenida', 'Picoteo por el barrio (Ruzafa/Centro).', 30.00, 3),
(@group_id, '2026-07-11', '11:00', 'Playa y Relax', 'Mañana en la Malvarrosa / Patacona.', 10.00, 1),
(@group_id, '2026-07-11', '16:00', 'BOAT PARTY (Evento Estrella)', 'Fiesta en barco con copas y música. ¡OBLIGATORIO!', 55.00, 2),
(@group_id, '2026-07-11', '23:30', 'Discoteca Umbracle', 'Noche de glamour en las artes y ciencias.', 25.00, 3),
(@group_id, '2026-07-12', '12:00', 'Brunch de Recuperación', 'Para comentar las jugadas de ayer.', 20.00, 1),
(@group_id, '2026-07-12', '16:00', 'Vuelta en Tren', 'Regreso a Valdepeñas cansadas pero felices.', 75.00, 2);

-- 5. Checklist Inicial
INSERT INTO checklist_items (group_id, scope, title, order_index)
VALUES
(@group_id, 'global', 'Reservar Tren Valdepeñas -> Valencia', 1),
(@group_id, 'global', 'Comprar purpurina y accesorios fucsia', 2),
(@group_id, 'global', 'Playlist "Bride Squad Valencia"', 3),
(@group_id, 'Friday', 'Llevar el outfit de la cena de bienvenida', 4),
(@group_id, 'Saturday', 'Bañador y crema solar para el barco', 5);

-- 6. Presupuesto Objetivo
INSERT INTO budget_settings (group_id, target_total, max_total)
VALUES (@group_id, 300.00, 345.00);

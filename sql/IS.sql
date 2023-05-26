INSERT INTO sensor (fecha, temperatura) VALUES (NOW(), "35.5");
SELECT * from sensor ORDER BY fecha DESC limit 1;
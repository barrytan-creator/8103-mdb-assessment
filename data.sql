USE pet_booking_system;

-- DATA: OWNERS
INSERT INTO owners (owner_name, contact_number, email, address) VALUES
('Sarah Johnson', '91234567', 'sarah.j@email.com', '123 Orchard Road, Singapore 238858'),
('Michael Tan', '98765432', 'michael.tan@email.com', '456 Clementi Ave 3, Singapore 129876'),
('Emily Wong', '87654321', 'emily.wong@email.com', '789 Ang Mo Kio Ave 5, Singapore 560789'),
('David Lim', '92345678', 'david.lim@email.com', '321 Jurong West St 52, Singapore 640321'),
('Rachel Ng', '93456789', 'rachel.ng@email.com', '654 Tampines Ave 9, Singapore 521654');


-- DATA: SERVICES
INSERT INTO services (service_name, description, cost) VALUES
('Basic Grooming', 'Bath, brush, nail trim, ear cleaning', 45.00),
('Full Grooming', 'Basic grooming plus haircut', 85.00),
('Spa Treatment', 'Premium grooming with massage', 120.00),
('Vet Consultation', 'General health checkup', 60.00),
('Vaccination', 'Standard vaccination shots', 50.00),
('Dog Walking', '1-hour dog walking service', 25.00),
('Adoption Services', 'Adoption processing and documentation', 150.00),
('Pet Transportation', 'Safe pet transportation', 40.00);


-- DATA: PETS example
INSERT INTO pets (pet_name, species, breed, age, owner_id) VALUES
('Buddy', 'Dog', 'Golden Retriever', 3, 1),
('Whiskers', 'Cat', 'Persian', 2, 1),
('Max', 'Dog', 'German Shepherd', 5, 2),
('Luna', 'Cat', 'Siamese', 1, 3),
('Charlie', 'Dog', 'Beagle', 4, 3),
('Bella', 'Dog', 'Poodle', 2, 4),
('Milo', 'Cat', 'British Shorthair', 3, 5),
('Rocky', 'Dog', 'Bulldog', 6, 7);


-- Verify data
show tables;
DESCRIBE bookings;
DESCRIBE owners;
DESCRIBE pets;
DESCRIBE services;
DESCRIBE bookings

SHOW CREATE TABLE owners;
SHOW CREATE TABLE pets;
SHOW CREATE TABLE services;
SHOW CREATE TABLE bookings;

SELECT * FROM owners;
SELECT * FROM services;
SELECT * FROM pets;
SELECT * FROM bookings;
SELECT COUNT(*) AS total_bookings FROM bookings;

Insert BOOKINGS example:
INSERT INTO bookings (pet_id, service_id, booking_date, booking_time, status, notes) VALUES
(4, 7, '2024-03-29', '09:30:00', 'Pending', 'Interested in adoption process');
(6, 2, '2024-03-30', '14:00:00', 'Confirmed', 'Full grooming with poodle cut');
(7, 4, '2024-03-31', '11:00:00', 'Completed', 'Health certificate issued');

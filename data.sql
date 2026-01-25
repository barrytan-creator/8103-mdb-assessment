USE pet_booking_system;

-- ============================================
-- SAMPLE DATA: OWNERS
-- ============================================
INSERT INTO owners (owner_name, contact_number, email, address) VALUES
('Sarah Johnson', '91234567', 'sarah.j@email.com', '123 Orchard Road, Singapore 238858'),
('Michael Tan', '98765432', 'michael.tan@email.com', '456 Clementi Ave 3, Singapore 129876'),
('Emily Wong', '87654321', 'emily.wong@email.com', '789 Ang Mo Kio Ave 5, Singapore 560789'),
('David Lim', '92345678', 'david.lim@email.com', '321 Jurong West St 52, Singapore 640321'),
('Rachel Ng', '93456789', 'rachel.ng@email.com', '654 Tampines Ave 9, Singapore 521654');

-- ============================================
-- SAMPLE DATA: SERVICES
-- ============================================
INSERT INTO services (service_name, description, cost) VALUES
('Basic Grooming', 'Bath, brush, nail trim, ear cleaning', 45.00),
('Full Grooming', 'Basic grooming plus haircut', 85.00),
('Spa Treatment', 'Premium grooming with massage', 120.00),
('Vet Consultation', 'General health checkup', 60.00),
('Vaccination', 'Standard vaccination shots', 50.00),
('Dog Walking', '1-hour dog walking service', 25.00),
('Adoption Services', 'Adoption processing and documentation', 150.00),
('Pet Transportation', 'Safe pet transportation', 40.00);

-- ============================================
-- SAMPLE DATA: PETS
-- ============================================
INSERT INTO pets (pet_name, species, breed, age, owner_id) VALUES
('Buddy', 'Dog', 'Golden Retriever', 3, 1),
('Whiskers', 'Cat', 'Persian', 2, 1),
('Max', 'Dog', 'German Shepherd', 5, 2),
('Luna', 'Cat', 'Siamese', 1, 3),
('Charlie', 'Dog', 'Beagle', 4, 3),
('Bella', 'Dog', 'Poodle', 2, 4),
('Milo', 'Cat', 'British Shorthair', 3, 5),
('Rocky', 'Dog', 'Bulldog', 6, 5);

-- ============================================
-- SAMPLE DATA: BOOKINGS
-- ============================================
INSERT INTO bookings (pet_id, service_id, booking_date, booking_time, status, notes) VALUES
(1, 2, '2024-03-15', '10:00:00', 'Confirmed', 'First time customer'),
(1, 4, '2024-03-20', '14:30:00', 'Confirmed', 'Annual checkup'),
(2, 1, '2024-03-16', '11:00:00', 'Completed', 'Very well behaved'),
(3, 5, '2024-03-18', '09:00:00', 'Confirmed', 'Rabies vaccination due'),
(4, 1, '2024-03-19', '15:00:00', 'Pending', 'First grooming session'),
(5, 6, '2024-03-21', '08:00:00', 'Confirmed', 'Morning walk preferred'),
(6, 3, '2024-03-22', '13:00:00', 'Confirmed', 'Birthday spa treatment'),
(7, 1, '2024-03-23', '10:30:00', 'Pending', NULL),
(8, 4, '2024-03-24', '16:00:00', 'Confirmed', 'Senior dog checkup'),
(1, 6, '2024-03-25', '07:30:00', 'Pending', 'Early morning walk'),
(3, 2, '2024-03-26', '11:30:00', 'Confirmed', 'Regular customer'),
(5, 8, '2024-03-27', '14:00:00', 'Pending', 'Transport to vet clinic');

-- Verify data
SELECT * FROM owners;
SELECT * FROM services;
SELECT * FROM pets;
SELECT * FROM bookings;
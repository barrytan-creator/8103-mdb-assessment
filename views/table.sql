
CREATE DATABASE IF NOT EXISTS pet_booking_system;

-- Switch to the database
USE pet_booking_system;


DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS owners;


-- TABLE 1: OWNERS
CREATE TABLE owners (
    owner_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    owner_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- TABLE 2: SERVICES
CREATE TABLE services (
    service_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    description TEXT,
    cost DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- TABLE 3: PETS
CREATE TABLE pets (
    pet_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pet_name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    age INT UNSIGNED,
    owner_id INT UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Add foreign key for pets -> owners
ALTER TABLE pets ADD CONSTRAINT fk_pets_owners
    FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
    ON DELETE CASCADE;


-- TABLE 4: BOOKINGS
CREATE TABLE bookings (
    booking_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pet_id INT UNSIGNED NOT NULL,
    service_id INT UNSIGNED NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Add foreign keys for bookings
ALTER TABLE bookings ADD CONSTRAINT fk_bookings_pets
    FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
    ON DELETE CASCADE;

ALTER TABLE bookings ADD CONSTRAINT fk_bookings_services
    FOREIGN KEY (service_id) REFERENCES services(service_id)
    ON DELETE CASCADE;


SHOW TABLES;
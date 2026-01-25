const express = require("express");
const mysql2 = require("mysql2/promise");
const ejs = require("ejs");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Enable forms processing
app.use(express.urlencoded({
    extended: true
}));

// Serve static files (optional)
app.use(express.static('public'));

// Database connection pool
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const dbConnection = mysql2.createPool(dbConfig);

// ============================================
// HOME ROUTE
// ============================================
app.get('/', function(req, res) {
    res.render('home');
});

// ============================================
// SERVICES ROUTES
// ============================================

// List all services
app.get('/services', async function(req, res) {
    try {
        const sql = 'SELECT * FROM services ORDER BY service_id DESC';
        const [services] = await dbConnection.query(sql);
        res.render('services/list', {
            services: services
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).send('Error loading services');
    }
});

// Display create form
app.get('/services/create', function(req, res) {
    res.render('services/create');
});

// Process create form
app.post('/services/create', async function(req, res) {
    try {
        const { service_name, description, cost } = req.body;
        const sql = `INSERT INTO services (service_name, description, cost)
                     VALUES (?, ?, ?)`;
        const values = [service_name, description, cost];
        await dbConnection.execute(sql, values);
        res.redirect('/services');
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).send('Error creating service');
    }
});

// Display edit form
app.get('/services/edit/:service_id', async function(req, res) {
    try {
        const service_id = req.params.service_id;
        const [services] = await dbConnection.execute(
            'SELECT * FROM services WHERE service_id = ?',
            [service_id]
        );
        const service = services[0];
        res.render('services/edit', {
            service: service
        });
    } catch (error) {
        console.error('Error loading service edit form:', error);
        res.status(500).send('Error loading service');
    }
});

// Process edit form
app.post('/services/edit/:service_id', async function(req, res) {
    try {
        const service_id = req.params.service_id;
        const { service_name, description, cost } = req.body;
        const sql = `UPDATE services 
                     SET service_name = ?, description = ?, cost = ?
                     WHERE service_id = ?`;
        const values = [service_name, description, cost, service_id];
        await dbConnection.execute(sql, values);
        res.redirect('/services');
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).send('Error updating service');
    }
});

// Display delete confirmation
app.get('/services/delete/:service_id', async function(req, res) {
    try {
        const service_id = req.params.service_id;
        const [services] = await dbConnection.execute(
            'SELECT * FROM services WHERE service_id = ?',
            [service_id]
        );
        const service = services[0];
        res.render('services/confirm_delete', {
            service: service
        });
    } catch (error) {
        console.error('Error loading delete confirmation:', error);
        res.status(500).send('Error loading service');
    }
});

// Process delete
app.post('/services/delete/:service_id', async function(req, res) {
    try {
        const service_id = req.params.service_id;
        const sql = 'DELETE FROM services WHERE service_id = ?';
        await dbConnection.execute(sql, [service_id]);
        res.redirect('/services');
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).send('Error deleting service');
    }
});

// ============================================
// OWNERS ROUTES
// ============================================

// List all owners
app.get('/owners', async function(req, res) {
    try {
        const sql = 'SELECT * FROM owners ORDER BY owner_id DESC';
        const [owners] = await dbConnection.query(sql);
        res.render('owners/list', {
            owners: owners
        });
    } catch (error) {
        console.error('Error fetching owners:', error);
        res.status(500).send('Error loading owners');
    }
});

// Display create form
app.get('/owners/create', function(req, res) {
    res.render('owners/create');
});

// Process create form
app.post('/owners/create', async function(req, res) {
    try {
        const { owner_name, contact_number, email, address } = req.body;
        const sql = `INSERT INTO owners (owner_name, contact_number, email, address)
                     VALUES (?, ?, ?, ?)`;
        const values = [owner_name, contact_number, email, address];
        await dbConnection.execute(sql, values);
        res.redirect('/owners');
    } catch (error) {
        console.error('Error creating owner:', error);
        res.status(500).send('Error creating owner');
    }
});

// Display edit form
app.get('/owners/edit/:owner_id', async function(req, res) {
    try {
        const owner_id = req.params.owner_id;
        const [owners] = await dbConnection.execute(
            'SELECT * FROM owners WHERE owner_id = ?',
            [owner_id]
        );
        const owner = owners[0];
        res.render('owners/edit', {
            owner: owner
        });
    } catch (error) {
        console.error('Error loading owner edit form:', error);
        res.status(500).send('Error loading owner');
    }
});

// Process edit form
app.post('/owners/edit/:owner_id', async function(req, res) {
    try {
        const owner_id = req.params.owner_id;
        const { owner_name, contact_number, email, address } = req.body;
        const sql = `UPDATE owners 
                     SET owner_name = ?, contact_number = ?, email = ?, address = ?
                     WHERE owner_id = ?`;
        const values = [owner_name, contact_number, email, address, owner_id];
        await dbConnection.execute(sql, values);
        res.redirect('/owners');
    } catch (error) {
        console.error('Error updating owner:', error);
        res.status(500).send('Error updating owner');
    }
});

// Display delete confirmation
app.get('/owners/delete/:owner_id', async function(req, res) {
    try {
        const owner_id = req.params.owner_id;
        const [owners] = await dbConnection.execute(
            'SELECT * FROM owners WHERE owner_id = ?',
            [owner_id]
        );
        const owner = owners[0];
        res.render('owners/confirm_delete', {
            owner: owner
        });
    } catch (error) {
        console.error('Error loading delete confirmation:', error);
        res.status(500).send('Error loading owner');
    }
});

// Process delete - FIXED VERSION WITH CASCADE DELETE
app.post('/owners/delete/:owner_id', async function(req, res) {
    const connection = await dbConnection.getConnection();
    try {
        const owner_id = req.params.owner_id;
        
        // Start transaction
        await connection.beginTransaction();
        
        // Step 1: Get all pets belonging to this owner
        const [pets] = await connection.query(
            'SELECT pet_id FROM pets WHERE owner_id = ?', 
            [owner_id]
        );
        
        // Step 2: Delete all bookings for these pets
        for (let pet of pets) {
            await connection.query(
                'DELETE FROM bookings WHERE pet_id = ?', 
                [pet.pet_id]
            );
        }
        
        // Step 3: Delete all pets belonging to this owner
        await connection.query(
            'DELETE FROM pets WHERE owner_id = ?', 
            [owner_id]
        );
        
        // Step 4: Finally, delete the owner
        await connection.query(
            'DELETE FROM owners WHERE owner_id = ?', 
            [owner_id]
        );
        
        // Commit transaction
        await connection.commit();
        res.redirect('/owners');
    } catch (error) {
        // Rollback transaction on error
        await connection.rollback();
        console.error('Error deleting owner:', error);
        res.status(500).send('Error deleting owner. Please try again.');
    } finally {
        connection.release();
    }
});

// ============================================
// PETS ROUTES
// ============================================

// List all pets with owner info
app.get('/pets', async function(req, res) {
    try {
        const sql = `SELECT pets.*, owners.owner_name 
                     FROM pets 
                     JOIN owners ON pets.owner_id = owners.owner_id
                     ORDER BY pet_id DESC`;
        const [pets] = await dbConnection.query(sql);
        res.render('pets/list', {
            pets: pets
        });
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).send('Error loading pets');
    }
});

// Display create form
app.get('/pets/create', async function(req, res) {
    try {
        const [owners] = await dbConnection.query('SELECT * FROM owners ORDER BY owner_name');
        res.render('pets/create', {
            owners: owners
        });
    } catch (error) {
        console.error('Error loading pet create form:', error);
        res.status(500).send('Error loading form');
    }
});

// Process create form
app.post('/pets/create', async function(req, res) {
    try {
        const { pet_name, species, breed, age, owner_id } = req.body;
        const sql = `INSERT INTO pets (pet_name, species, breed, age, owner_id)
                     VALUES (?, ?, ?, ?, ?)`;
        const values = [pet_name, species, breed, age, owner_id];
        await dbConnection.execute(sql, values);
        res.redirect('/pets');
    } catch (error) {
        console.error('Error creating pet:', error);
        res.status(500).send('Error creating pet');
    }
});

// Display edit form
app.get('/pets/edit/:pet_id', async function(req, res) {
    try {
        const pet_id = req.params.pet_id;
        const [pets] = await dbConnection.execute(
            'SELECT * FROM pets WHERE pet_id = ?',
            [pet_id]
        );
        const [owners] = await dbConnection.query('SELECT * FROM owners ORDER BY owner_name');
        const pet = pets[0];
        res.render('pets/edit', {
            pet: pet,
            owners: owners
        });
    } catch (error) {
        console.error('Error loading pet edit form:', error);
        res.status(500).send('Error loading pet');
    }
});

// Process edit form
app.post('/pets/edit/:pet_id', async function(req, res) {
    try {
        const pet_id = req.params.pet_id;
        const { pet_name, species, breed, age, owner_id } = req.body;
        const sql = `UPDATE pets 
                     SET pet_name = ?, species = ?, breed = ?, age = ?, owner_id = ?
                     WHERE pet_id = ?`;
        const values = [pet_name, species, breed, age, owner_id, pet_id];
        await dbConnection.execute(sql, values);
        res.redirect('/pets');
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).send('Error updating pet');
    }
});

// Display delete confirmation
app.get('/pets/delete/:pet_id', async function(req, res) {
    try {
        const pet_id = req.params.pet_id;
        const [pets] = await dbConnection.execute(
            `SELECT pets.*, owners.owner_name 
             FROM pets 
             JOIN owners ON pets.owner_id = owners.owner_id
             WHERE pet_id = ?`,
            [pet_id]
        );
        const pet = pets[0];
        res.render('pets/confirm_delete', {
            pet: pet
        });
    } catch (error) {
        console.error('Error loading delete confirmation:', error);
        res.status(500).send('Error loading pet');
    }
});

// Process delete - WITH CASCADE DELETE FOR BOOKINGS
app.post('/pets/delete/:pet_id', async function(req, res) {
    const connection = await dbConnection.getConnection();
    try {
        const pet_id = req.params.pet_id;
        
        // Start transaction
        await connection.beginTransaction();
        
        // Step 1: Delete all bookings for this pet
        await connection.query(
            'DELETE FROM bookings WHERE pet_id = ?', 
            [pet_id]
        );
        
        // Step 2: Delete the pet
        await connection.query(
            'DELETE FROM pets WHERE pet_id = ?', 
            [pet_id]
        );
        
        // Commit transaction
        await connection.commit();
        res.redirect('/pets');
    } catch (error) {
        // Rollback transaction on error
        await connection.rollback();
        console.error('Error deleting pet:', error);
        res.status(500).send('Error deleting pet. Please try again.');
    } finally {
        connection.release();
    }
});

// ============================================
// BOOKINGS ROUTES
// ============================================

// List all bookings with related info
app.get('/bookings', async function(req, res) {
    try {
        const sql = `SELECT bookings.*, 
                            pets.pet_name, 
                            owners.owner_name,
                            services.service_name,
                            services.cost
                     FROM bookings 
                     JOIN pets ON bookings.pet_id = pets.pet_id
                     JOIN owners ON pets.owner_id = owners.owner_id
                     JOIN services ON bookings.service_id = services.service_id
                     ORDER BY booking_date DESC, booking_time DESC`;
        const [bookings] = await dbConnection.query(sql);
        res.render('bookings/list', {
            bookings: bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Error loading bookings');
    }
});

// Display create form
app.get('/bookings/create', async function(req, res) {
    try {
        const [pets] = await dbConnection.query('SELECT * FROM pets ORDER BY pet_name');
        const [services] = await dbConnection.query('SELECT * FROM services ORDER BY service_name');
        res.render('bookings/create', {
            pets: pets,
            services: services
        });
    } catch (error) {
        console.error('Error loading booking create form:', error);
        res.status(500).send('Error loading form');
    }
});

// Process create form
app.post('/bookings/create', async function(req, res) {
    try {
        const { pet_id, service_id, booking_date, booking_time, status, notes } = req.body;
        const sql = `INSERT INTO bookings (pet_id, service_id, booking_date, booking_time, status, notes)
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [pet_id, service_id, booking_date, booking_time, status, notes];
        await dbConnection.execute(sql, values);
        res.redirect('/bookings');
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Error creating booking');
    }
});

// Display edit form
app.get('/bookings/edit/:booking_id', async function(req, res) {
    try {
        const booking_id = req.params.booking_id;
        const [bookings] = await dbConnection.execute(
            'SELECT * FROM bookings WHERE booking_id = ?',
            [booking_id]
        );
        const [pets] = await dbConnection.query('SELECT * FROM pets ORDER BY pet_name');
        const [services] = await dbConnection.query('SELECT * FROM services ORDER BY service_name');
        const booking = bookings[0];
        res.render('bookings/edit', {
            booking: booking,
            pets: pets,
            services: services
        });
    } catch (error) {
        console.error('Error loading booking edit form:', error);
        res.status(500).send('Error loading booking');
    }
});

// Process edit form
app.post('/bookings/edit/:booking_id', async function(req, res) {
    try {
        const booking_id = req.params.booking_id;
        const { pet_id, service_id, booking_date, booking_time, status, notes } = req.body;
        const sql = `UPDATE bookings 
                     SET pet_id = ?, service_id = ?, booking_date = ?, 
                         booking_time = ?, status = ?, notes = ?
                     WHERE booking_id = ?`;
        const values = [pet_id, service_id, booking_date, booking_time, status, notes, booking_id];
        await dbConnection.execute(sql, values);
        res.redirect('/bookings');
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).send('Error updating booking');
    }
});

// Display delete confirmation
app.get('/bookings/delete/:booking_id', async function(req, res) {
    try {
        const booking_id = req.params.booking_id;
        const [bookings] = await dbConnection.execute(
            `SELECT bookings.*, 
                    pets.pet_name, 
                    services.service_name
             FROM bookings 
             JOIN pets ON bookings.pet_id = pets.pet_id
             JOIN services ON bookings.service_id = services.service_id
             WHERE booking_id = ?`,
            [booking_id]
        );
        const booking = bookings[0];
        res.render('bookings/confirm_delete', {
            booking: booking
        });
    } catch (error) {
        console.error('Error loading delete confirmation:', error);
        res.status(500).send('Error loading booking');
    }
});

// Process delete
app.post('/bookings/delete/:booking_id', async function(req, res) {
    try {
        const booking_id = req.params.booking_id;
        const sql = 'DELETE FROM bookings WHERE booking_id = ?';
        await dbConnection.execute(sql, [booking_id]);
        res.redirect('/bookings');
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).send('Error deleting booking');
    }
});

// ============================================
// START SERVER
// ============================================
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
-- Create Database (if not exists)
-- CREATE DATABASE IF NOT EXISTS bride_squad_valencia;
-- USE bride_squad_valencia;

-- Groups Table
CREATE TABLE groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL, -- VSQ-XXXX
    pin_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL DEFAULT 'Bride Squad Valencia 2026',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Devices Table (Attendees)
CREATE TABLE devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    device_uuid VARCHAR(100) NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    UNIQUE(group_id, device_uuid)
);

-- Accommodations Table
CREATE TABLE accommodations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    zone VARCHAR(100),
    type VARCHAR(50), -- Apartment, Hotel, Hostel
    capacity INT,
    price_min DECIMAL(10, 2),
    price_max DECIMAL(10, 2),
    link TEXT,
    maps_link TEXT,
    pros TEXT,
    cons TEXT,
    tags_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Activities Table
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    category VARCHAR(100), -- Boat Party, Club, Beach, etc.
    name VARCHAR(255) NOT NULL,
    time_slot VARCHAR(50), -- Morning, Afternoon, Evening, Night
    price_min DECIMAL(10, 2),
    price_max DECIMAL(10, 2),
    duration VARCHAR(50),
    location VARCHAR(255),
    link TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Itinerary Blocks
CREATE TABLE itinerary_blocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    day DATE NOT NULL,
    slot VARCHAR(50), -- 09:00, 14:00, etc.
    title VARCHAR(255) NOT NULL,
    description TEXT,
    est_cost DECIMAL(10, 2) DEFAULT 0,
    order_index INT DEFAULT 0,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Votes Table
CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    device_id INT NOT NULL,
    item_type ENUM('accommodation', 'activity') NOT NULL,
    item_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    UNIQUE(group_id, device_id, item_type, item_id)
);

-- Selections (Final Plan)
CREATE TABLE selections (
    group_id INT PRIMARY KEY,
    selected_accommodation_id INT,
    selected_boat_activity_id INT,
    selected_club_activity_id INT,
    selected_show_activity_id INT,
    selected_escape_activity_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Checklist Items
CREATE TABLE checklist_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    scope ENUM('global', 'Friday', 'Saturday', 'Sunday') DEFAULT 'global',
    title VARCHAR(255) NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    done_by_device_id INT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (done_by_device_id) REFERENCES devices(id) ON DELETE SET NULL
);

-- Pot Ledger (Expenses / Income)
CREATE TABLE pot_ledger (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    concept VARCHAR(255) NOT NULL,
    category VARCHAR(100), -- Food, Drink, Transport, etc.
    amount DECIMAL(10, 2) NOT NULL,
    paid_by VARCHAR(100),
    method VARCHAR(50), -- Cash, Card, Bizum
    expense_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Budget Settings
CREATE TABLE budget_settings (
    group_id INT PRIMARY KEY,
    target_total DECIMAL(10, 2) DEFAULT 300.00,
    max_total DECIMAL(10, 2) DEFAULT 345.00,
    allocations_json JSON, -- Standard distribution
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Media table for Miriam's photo
CREATE TABLE media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    type VARCHAR(50) DEFAULT 'hero_photo',
    content LONGTEXT, -- Base64 encoded image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Insert Seed Data for a group
-- We define a default group 'VSQ-2026' for initial testing
INSERT INTO groups (code, pin_hash, name) VALUES ('VSQ-2026', '1234', 'Bride Squad Valencia');

-- Get the ID (assuming it's 1)
-- SET @group_id = 1;

-- Add some seed accommodations
-- INSERT INTO accommodations (group_id, name, zone, type, capacity, price_min, price_max, pros, cons) VALUES 
-- (@group_id, 'Apartamento Ruzafa Glam', 'Ruzafa', 'Apartment', 13, 80.00, 110.00, 'Cerca de todo, muy chic', 'Un poco ruidoso'),
-- (@group_id, 'Beachfront Penthouse', 'Cabanyal', 'Apartment', 14, 90.00, 130.00, 'Vistas al mar', 'Lejos del centro');

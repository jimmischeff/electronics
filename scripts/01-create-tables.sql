-- Create manufacturers table
CREATE TABLE IF NOT EXISTS manufacturers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  website VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create parts table with comprehensive fields (~20 summary fields)
CREATE TABLE IF NOT EXISTS parts (
  id SERIAL PRIMARY KEY,
  part_number VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  manufacturer_id INTEGER REFERENCES manufacturers(id),
  category VARCHAR(100),
  description TEXT,
  
  -- Technical specifications
  value VARCHAR(50),
  tolerance VARCHAR(50),
  voltage_rating VARCHAR(50),
  current_rating VARCHAR(50),
  power_rating VARCHAR(50),
  temperature_range VARCHAR(100),
  package_type VARCHAR(50),
  mounting_type VARCHAR(50),
  lead_style VARCHAR(50),
  
  -- Inventory and pricing
  stock_quantity INTEGER DEFAULT 0,
  reorder_level INTEGER DEFAULT 10,
  location VARCHAR(100),
  supplier VARCHAR(255),
  unit_price DECIMAL(10, 2),
  
  -- Compliance and status
  status VARCHAR(50) DEFAULT 'active',
  rohs_compliant BOOLEAN DEFAULT true,
  lead_free BOOLEAN DEFAULT true,
  
  -- Additional information
  datasheet_url VARCHAR(500),
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_parts_manufacturer ON parts(manufacturer_id);
CREATE INDEX IF NOT EXISTS idx_parts_category ON parts(category);
CREATE INDEX IF NOT EXISTS idx_parts_part_number ON parts(part_number);
CREATE INDEX IF NOT EXISTS idx_parts_status ON parts(status);

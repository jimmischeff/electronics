/**
 * Database connection utility for PostgreSQL
 * Set DATABASE_URL environment variable to connect to your local PostgreSQL
 * Example: postgresql://username:password@localhost:5432/electronics_db
 */

import { neon } from "@neondatabase/serverless"

const USE_MOCK_DATA = !process.env.DATABASE_URL

let sql
if (!USE_MOCK_DATA) {
  sql = neon(process.env.DATABASE_URL)
}

// Mock data for development/preview
const mockManufacturers = [
  {
    id: 1,
    name: "Texas Instruments",
    country: "USA",
    website: "https://www.ti.com",
    description: "Leading semiconductor company specializing in analog and embedded processing",
    contact_email: "support@ti.com",
    contact_phone: "+1-800-336-5236",
    created_at: new Date("2024-01-15"),
  },
  {
    id: 2,
    name: "STMicroelectronics",
    country: "Switzerland",
    website: "https://www.st.com",
    description: "Global semiconductor leader serving customers across electronics applications",
    contact_email: "info@st.com",
    contact_phone: "+41-22-929-2929",
    created_at: new Date("2024-01-16"),
  },
  {
    id: 3,
    name: "Vishay",
    country: "USA",
    website: "https://www.vishay.com",
    description: "Manufacturer of discrete semiconductors and passive components",
    contact_email: "sales@vishay.com",
    contact_phone: "+1-402-563-6866",
    created_at: new Date("2024-01-17"),
  },
]

const mockParts = [
  {
    id: 1,
    part_number: "LM358N",
    category: "Operational Amplifier",
    manufacturer_id: 1,
    manufacturer_name: "Texas Instruments",
    manufacturer_country: "USA",
    description: "Dual operational amplifier, general purpose, low power",
    package_type: "DIP-8",
    voltage_rating: "32V",
    current_rating: "30mA",
    power_rating: "0.5W",
    value: "N/A",
    tolerance: "N/A",
    temperature_range: "-40°C to +85°C",
    lead_style: "Through-hole",
    stock_quantity: 450,
    reorder_level: 100,
    location: "A-12-3",
    unit_price: 0.85,
    supplier: "Digi-Key",
    datasheet_url: "https://www.ti.com/lit/ds/symlink/lm358.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Popular general-purpose op-amp for audio and signal processing",
    created_at: new Date("2024-02-01"),
  },
  {
    id: 2,
    part_number: "STM32F103C8T6",
    category: "Microcontroller",
    manufacturer_id: 2,
    manufacturer_name: "STMicroelectronics",
    manufacturer_country: "Switzerland",
    description: "32-bit ARM Cortex-M3 MCU, 64KB Flash, 20KB RAM",
    package_type: "LQFP-48",
    voltage_rating: "3.3V",
    current_rating: "150mA",
    power_rating: "0.5W",
    value: "N/A",
    tolerance: "N/A",
    temperature_range: "-40°C to +85°C",
    lead_style: "Surface Mount",
    stock_quantity: 120,
    reorder_level: 50,
    location: "B-05-1",
    unit_price: 3.45,
    supplier: "Mouser",
    datasheet_url: "https://www.st.com/resource/en/datasheet/stm32f103c8.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Blue Pill development board MCU, 72MHz max frequency",
    created_at: new Date("2024-02-02"),
  },
  {
    id: 3,
    part_number: "CRCW0805100KFKEA",
    category: "Resistor",
    manufacturer_id: 3,
    manufacturer_name: "Vishay",
    manufacturer_country: "USA",
    description: "Thick film chip resistor, 100kΩ, 0805 package",
    package_type: "0805",
    voltage_rating: "150V",
    current_rating: "N/A",
    power_rating: "0.125W",
    value: "100kΩ",
    tolerance: "±1%",
    temperature_range: "-55°C to +155°C",
    lead_style: "Surface Mount",
    stock_quantity: 5000,
    reorder_level: 1000,
    location: "C-20-5",
    unit_price: 0.02,
    supplier: "Digi-Key",
    datasheet_url: "https://www.vishay.com/docs/20035/dcrcwe3.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Standard 0805 SMD resistor for general use",
    created_at: new Date("2024-02-03"),
  },
  {
    id: 4,
    part_number: "NE555P",
    category: "Timer IC",
    manufacturer_id: 1,
    manufacturer_name: "Texas Instruments",
    manufacturer_country: "USA",
    description: "Precision timer, 555 type, single",
    package_type: "DIP-8",
    voltage_rating: "16V",
    current_rating: "200mA",
    power_rating: "0.6W",
    value: "N/A",
    tolerance: "N/A",
    temperature_range: "0°C to +70°C",
    lead_style: "Through-hole",
    stock_quantity: 850,
    reorder_level: 200,
    location: "A-15-2",
    unit_price: 0.45,
    supplier: "Newark",
    datasheet_url: "https://www.ti.com/lit/ds/symlink/ne555.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Classic 555 timer IC for oscillator and timing applications",
    created_at: new Date("2024-02-04"),
  },
  {
    id: 5,
    part_number: "1N4148",
    category: "Diode",
    manufacturer_id: 3,
    manufacturer_name: "Vishay",
    manufacturer_country: "USA",
    description: "Fast switching diode, 100V, 200mA",
    package_type: "DO-35",
    voltage_rating: "100V",
    current_rating: "200mA",
    power_rating: "0.5W",
    value: "N/A",
    tolerance: "N/A",
    temperature_range: "-65°C to +175°C",
    lead_style: "Through-hole",
    stock_quantity: 2500,
    reorder_level: 500,
    location: "D-08-4",
    unit_price: 0.08,
    supplier: "Digi-Key",
    datasheet_url: "https://www.vishay.com/docs/81857/1n4148.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "General purpose fast switching diode",
    created_at: new Date("2024-02-05"),
  },
  {
    id: 6,
    part_number: "2N2222A",
    category: "Transistor",
    manufacturer_id: 1,
    manufacturer_name: "Texas Instruments",
    manufacturer_country: "USA",
    description: "NPN switching transistor, 40V, 800mA",
    package_type: "TO-92",
    voltage_rating: "40V",
    current_rating: "800mA",
    power_rating: "0.5W",
    value: "N/A",
    tolerance: "N/A",
    temperature_range: "-55°C to +150°C",
    lead_style: "Through-hole",
    stock_quantity: 1200,
    reorder_level: 300,
    location: "E-12-1",
    unit_price: 0.15,
    supplier: "Mouser",
    datasheet_url: "https://www.ti.com/lit/ds/symlink/2n2222a.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Popular general-purpose NPN transistor",
    created_at: new Date("2024-02-06"),
  },
  {
    id: 7,
    part_number: "GRM188R71C104KA01D",
    category: "Capacitor",
    manufacturer_id: 3,
    manufacturer_name: "Vishay",
    manufacturer_country: "USA",
    description: "Ceramic capacitor, 100nF, 16V, X7R, 0603",
    package_type: "0603",
    voltage_rating: "16V",
    current_rating: "N/A",
    power_rating: "N/A",
    value: "100nF",
    tolerance: "±10%",
    temperature_range: "-55°C to +125°C",
    lead_style: "Surface Mount",
    stock_quantity: 8000,
    reorder_level: 2000,
    location: "F-25-3",
    unit_price: 0.03,
    supplier: "Digi-Key",
    datasheet_url: "https://www.vishay.com/docs/45171/y5v.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Standard decoupling capacitor for digital circuits",
    created_at: new Date("2024-02-07"),
  },
  {
    id: 8,
    part_number: "L7805CV",
    category: "Voltage Regulator",
    manufacturer_id: 2,
    manufacturer_name: "STMicroelectronics",
    manufacturer_country: "Switzerland",
    description: "Positive voltage regulator, 5V, 1.5A",
    package_type: "TO-220",
    voltage_rating: "35V",
    current_rating: "1.5A",
    power_rating: "15W",
    value: "5V",
    tolerance: "±4%",
    temperature_range: "0°C to +125°C",
    lead_style: "Through-hole",
    stock_quantity: 350,
    reorder_level: 100,
    location: "G-10-2",
    unit_price: 0.65,
    supplier: "Newark",
    datasheet_url: "https://www.st.com/resource/en/datasheet/l7805.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Classic linear 5V regulator with thermal protection",
    created_at: new Date("2024-02-08"),
  },
  {
    id: 9,
    part_number: "ATMEGA328P-PU",
    category: "Microcontroller",
    manufacturer_id: 1,
    manufacturer_name: "Texas Instruments",
    manufacturer_country: "USA",
    description: "8-bit AVR MCU, 32KB Flash, 2KB SRAM, 1KB EEPROM",
    package_type: "DIP-28",
    voltage_rating: "5V",
    current_rating: "200mA",
    power_rating: "1W",
    value: "N/A",
    tolerance: "N/A",
    temperature_range: "-40°C to +85°C",
    lead_style: "Through-hole",
    stock_quantity: 180,
    reorder_level: 50,
    location: "B-08-4",
    unit_price: 2.85,
    supplier: "Digi-Key",
    datasheet_url: "https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328_P.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Arduino Uno microcontroller, 20MHz max frequency",
    created_at: new Date("2024-02-09"),
  },
  {
    id: 10,
    part_number: "BC547B",
    category: "Transistor",
    manufacturer_id: 3,
    manufacturer_name: "Vishay",
    manufacturer_country: "USA",
    description: "NPN general purpose transistor, 45V, 100mA",
    package_type: "TO-92",
    voltage_rating: "45V",
    current_rating: "100mA",
    power_rating: "0.5W",
    value: "N/A",
    tolerance: "N/A",
    temperature_range: "-65°C to +150°C",
    lead_style: "Through-hole",
    stock_quantity: 950,
    reorder_level: 200,
    location: "E-14-2",
    unit_price: 0.12,
    supplier: "Mouser",
    datasheet_url: "https://www.vishay.com/docs/83063/bc547.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Low noise amplifier and switching applications",
    created_at: new Date("2024-02-10"),
  },
  {
    id: 11,
    part_number: "LED-RED-5MM",
    category: "LED",
    manufacturer_id: 3,
    manufacturer_name: "Vishay",
    manufacturer_country: "USA",
    description: "Red LED, 5mm, 20mA, 2.0V forward voltage",
    package_type: "5mm Round",
    voltage_rating: "5V",
    current_rating: "20mA",
    power_rating: "0.1W",
    value: "N/A",
    tolerance: "N/A",
    temperature_range: "-40°C to +85°C",
    lead_style: "Through-hole",
    stock_quantity: 3500,
    reorder_level: 1000,
    location: "H-18-5",
    unit_price: 0.05,
    supplier: "Digi-Key",
    datasheet_url: "https://www.vishay.com/docs/83012/tlur640.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Standard red indicator LED, 625nm wavelength",
    created_at: new Date("2024-02-11"),
  },
  {
    id: 12,
    part_number: "HC-SR04",
    category: "Sensor",
    manufacturer_id: 2,
    manufacturer_name: "STMicroelectronics",
    manufacturer_country: "Switzerland",
    description: "Ultrasonic distance sensor module, 2cm-400cm range",
    package_type: "Module",
    voltage_rating: "5V",
    current_rating: "15mA",
    power_rating: "0.075W",
    value: "N/A",
    tolerance: "±3mm",
    temperature_range: "-15°C to +70°C",
    lead_style: "Pin Header",
    stock_quantity: 85,
    reorder_level: 25,
    location: "I-05-1",
    unit_price: 1.95,
    supplier: "Amazon",
    datasheet_url: "https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf",
    rohs_compliant: true,
    lead_free: true,
    notes: "Popular ultrasonic ranging module for robotics",
    created_at: new Date("2024-02-12"),
  },
]

/**
 * Get all parts with manufacturer information
 */
export async function getParts() {
  if (USE_MOCK_DATA) {
    return mockParts
  }

  const parts = await sql`
    SELECT 
      p.*,
      m.name as manufacturer_name,
      m.country as manufacturer_country
    FROM parts p
    LEFT JOIN manufacturers m ON p.manufacturer_id = m.id
    ORDER BY p.created_at DESC
  `
  return parts
}

/**
 * Get a single part by ID with full details
 */
export async function getPartById(id) {
  if (USE_MOCK_DATA) {
    return mockParts.find((p) => p.id === Number.parseInt(id)) || null
  }

  const parts = await sql`
    SELECT 
      p.*,
      m.name as manufacturer_name,
      m.country as manufacturer_country,
      m.website as manufacturer_website,
      m.description as manufacturer_description
    FROM parts p
    LEFT JOIN manufacturers m ON p.manufacturer_id = m.id
    WHERE p.id = ${id}
  `
  return parts[0] || null
}

/**
 * Get all manufacturers
 */
export async function getManufacturers() {
  if (USE_MOCK_DATA) {
    return mockManufacturers.map((m) => ({
      ...m,
      parts_count: mockParts.filter((p) => p.manufacturer_id === m.id).length,
    }))
  }

  const manufacturers = await sql`
    SELECT 
      m.*,
      COUNT(p.id) as parts_count
    FROM manufacturers m
    LEFT JOIN parts p ON m.id = p.manufacturer_id
    GROUP BY m.id
    ORDER BY m.name ASC
  `
  return manufacturers
}

/**
 * Get a single manufacturer by ID with their parts
 */
export async function getManufacturerById(id) {
  if (USE_MOCK_DATA) {
    const manufacturer = mockManufacturers.find((m) => m.id === Number.parseInt(id))
    if (!manufacturer) return null

    const parts = mockParts.filter((p) => p.manufacturer_id === Number.parseInt(id))
    return { ...manufacturer, parts }
  }

  const manufacturers = await sql`
    SELECT * FROM manufacturers WHERE id = ${id}
  `

  if (manufacturers.length === 0) return null

  const parts = await sql`
    SELECT * FROM parts WHERE manufacturer_id = ${id} ORDER BY part_number ASC
  `

  return {
    ...manufacturers[0],
    parts,
  }
}

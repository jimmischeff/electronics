-- Insert sample manufacturers
INSERT INTO manufacturers (name, country, website, contact_email, contact_phone, description) VALUES
('Texas Instruments', 'USA', 'https://www.ti.com', 'support@ti.com', '+1-800-336-5236', 'Leading semiconductor design and manufacturing company specializing in analog ICs and embedded processors'),
('STMicroelectronics', 'Switzerland', 'https://www.st.com', 'info@st.com', '+41-22-929-2929', 'Global semiconductor leader serving customers across electronics applications with innovative solutions'),
('Analog Devices', 'USA', 'https://www.analog.com', 'support@analog.com', '+1-781-329-4700', 'High-performance analog, mixed-signal, and digital signal processing integrated circuits'),
('Infineon Technologies', 'Germany', 'https://www.infineon.com', 'info@infineon.com', '+49-89-234-0', 'Semiconductor solutions for automotive, industrial, and security applications'),
('NXP Semiconductors', 'Netherlands', 'https://www.nxp.com', 'support@nxp.com', '+31-40-272-9999', 'Secure connectivity solutions for embedded applications in automotive and IoT')
ON CONFLICT (name) DO NOTHING;

-- Insert sample electronic parts with comprehensive data
INSERT INTO parts (
  part_number, name, manufacturer_id, category, description,
  value, tolerance, voltage_rating, current_rating, power_rating,
  temperature_range, package_type, mounting_type, lead_style,
  stock_quantity, reorder_level, location, supplier, unit_price,
  status, rohs_compliant, lead_free, datasheet_url, notes
) VALUES
(
  'LM358P', 'Dual Operational Amplifier', 1, 'Operational Amplifiers',
  'Low power dual operational amplifier with wide supply voltage range and excellent performance',
  'N/A', '±5%', '3V to 32V', '50mA', '500mW',
  '-40°C to +85°C', 'DIP-8', 'Through-hole', 'Standard DIP',
  1500, 200, 'Shelf A3-B2', 'Digi-Key', 0.45,
  'active', true, true, 'https://www.ti.com/lit/ds/symlink/lm358.pdf', 'Popular general-purpose op-amp'
),
(
  'STM32F103C8T6', 'ARM Cortex-M3 Microcontroller', 2, 'Microcontrollers',
  '32-bit MCU with 64KB Flash, 20KB RAM, running at 72MHz with rich peripheral set',
  '64KB Flash', '±2%', '2.0V to 3.6V', '150mA', '300mW',
  '-40°C to +85°C', 'LQFP-48', 'Surface Mount', 'Gull Wing',
  850, 100, 'Shelf B1-C4', 'Mouser', 2.15,
  'active', true, true, 'https://www.st.com/resource/en/datasheet/stm32f103c8.pdf', 'Blue Pill compatible MCU'
),
(
  'AD8232', 'Single-Lead Heart Rate Monitor', 3, 'Analog Front End',
  'Integrated signal conditioning block for ECG and other biopotential measurement applications',
  'N/A', '±1%', '2.0V to 3.3V', '2mA', '6.6mW',
  '-40°C to +85°C', 'LFCSP-20', 'Surface Mount', 'No Lead',
  320, 50, 'Shelf C2-D1', 'Arrow', 3.85,
  'active', true, true, 'https://www.analog.com/media/en/technical-documentation/data-sheets/AD8232.pdf', 'Ideal for wearable health monitors'
),
(
  'IRF540N', 'N-Channel Power MOSFET', 4, 'Power MOSFETs',
  'High-speed power MOSFET with low on-resistance for switching applications',
  'N/A', '±10%', '100V', '33A', '130W',
  '-55°C to +175°C', 'TO-220', 'Through-hole', 'Standard TO-220',
  2400, 300, 'Shelf D3-E2', 'Newark', 0.68,
  'active', true, true, 'https://www.infineon.com/dgdl/irf540n.pdf', 'Excellent for motor control and power supplies'
),
(
  'TJA1050', 'High-Speed CAN Transceiver', 5, 'Interface ICs',
  'CAN transceiver for high-speed automotive and industrial applications up to 1 Mbps',
  'N/A', '±5%', '4.5V to 5.5V', '70mA', '300mW',
  '-40°C to +125°C', 'SOIC-8', 'Surface Mount', 'Gull Wing',
  1100, 150, 'Shelf E1-F3', 'Farnell', 0.92,
  'active', true, true, 'https://www.nxp.com/docs/en/data-sheet/TJA1050.pdf', 'Standard CAN bus interface'
),
(
  'LM7805', '5V Voltage Regulator', 1, 'Voltage Regulators',
  'Positive voltage regulator with 1A output current and thermal overload protection',
  '5V', '±4%', '7V to 35V', '1A', '15W',
  '0°C to +125°C', 'TO-220', 'Through-hole', 'Standard TO-220',
  3200, 400, 'Shelf A1-B3', 'Digi-Key', 0.35,
  'active', true, true, 'https://www.ti.com/lit/ds/symlink/lm7805.pdf', 'Classic linear regulator'
),
(
  'NE555P', 'Precision Timer', 1, 'Timers',
  'Highly stable precision timing circuit capable of producing accurate time delays',
  'N/A', '±1%', '4.5V to 16V', '200mA', '600mW',
  '0°C to +70°C', 'DIP-8', 'Through-hole', 'Standard DIP',
  5600, 500, 'Shelf B2-C1', 'Mouser', 0.28,
  'active', true, true, 'https://www.ti.com/lit/ds/symlink/ne555.pdf', 'Most popular timer IC ever made'
),
(
  'ADS1115', '16-Bit ADC', 1, 'Data Converters',
  '4-channel 16-bit analog-to-digital converter with programmable gain amplifier and I2C interface',
  '16-bit', '±0.5%', '2.0V to 5.5V', '150µA', '825µW',
  '-40°C to +125°C', 'MSOP-10', 'Surface Mount', 'Gull Wing',
  680, 80, 'Shelf C3-D2', 'Arrow', 4.25,
  'active', true, true, 'https://www.ti.com/lit/ds/symlink/ads1115.pdf', 'High-precision ADC for sensor applications'
),
(
  '1N4148', 'Fast Switching Diode', 1, 'Diodes',
  'High-speed switching diode with fast recovery time for general purpose applications',
  'N/A', '±5%', '100V', '200mA', '500mW',
  '-65°C to +175°C', 'DO-35', 'Through-hole', 'Axial',
  8500, 1000, 'Shelf F1-G2', 'Digi-Key', 0.08,
  'active', true, true, 'https://www.vishay.com/docs/81857/1n4148.pdf', 'Standard signal diode'
),
(
  'BC547', 'NPN Transistor', 2, 'Transistors',
  'General purpose NPN bipolar junction transistor for switching and amplification',
  'N/A', '±10%', '45V', '100mA', '500mW',
  '-65°C to +150°C', 'TO-92', 'Through-hole', 'Standard TO-92',
  6200, 800, 'Shelf G3-H1', 'Newark', 0.12,
  'active', true, true, 'https://www.st.com/resource/en/datasheet/bc547.pdf', 'Versatile small signal transistor'
),
(
  'ESP32-WROOM-32', 'WiFi & Bluetooth Module', 2, 'Wireless Modules',
  'Powerful WiFi and Bluetooth combo module with dual-core processor and rich peripherals',
  'Dual Core', '±2%', '3.0V to 3.6V', '500mA', '1.5W',
  '-40°C to +85°C', 'SMD-38', 'Surface Mount', 'Castellated',
  450, 60, 'Shelf H2-I3', 'Mouser', 3.95,
  'active', true, true, 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32_datasheet_en.pdf', 'Popular IoT development module'
),
(
  'MCP3008', '10-Bit ADC', 3, 'Data Converters',
  '8-channel 10-bit analog-to-digital converter with SPI interface',
  '10-bit', '±1%', '2.7V to 5.5V', '1.5mA', '5mW',
  '-40°C to +85°C', 'DIP-16', 'Through-hole', 'Standard DIP',
  920, 120, 'Shelf I1-J2', 'Farnell', 1.85,
  'active', true, true, 'https://ww1.microchip.com/downloads/en/DeviceDoc/21295d.pdf', 'Easy-to-use ADC for hobbyists'
)
ON CONFLICT (part_number) DO NOTHING;

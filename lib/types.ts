export interface Manufacturer {
  id: number
  name: string
  country: string | null
  website: string | null
  description: string | null
  founded_year: number | null
  headquarters: string | null
  created_at: Date
  updated_at: Date
}

export interface Part {
  id: number
  part_number: string
  name: string
  manufacturer_id: number | null
  category: string | null
  description: string | null

  // Technical specifications
  voltage_rating: number | null
  current_rating: number | null
  power_rating: number | null
  tolerance: number | null
  temperature_min: number | null
  temperature_max: number | null
  package_type: string | null
  mounting_type: string | null
  dimensions: string | null
  weight: number | null

  // Inventory and pricing
  stock_quantity: number
  unit_price: number | null
  currency: string
  lead_time_days: number | null
  minimum_order_quantity: number

  // Additional metadata
  datasheet_url: string | null
  image_url: string | null
  status: string
  rohs_compliant: boolean

  created_at: Date
  updated_at: Date
}

export interface PartWithManufacturer extends Part {
  manufacturer_name: string | null
}

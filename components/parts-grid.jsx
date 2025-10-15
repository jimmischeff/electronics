"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Package, Search } from "lucide-react"

export function PartsGrid({ parts }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [manufacturerFilter, setManufacturerFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const categories = useMemo(() => {
    const unique = [...new Set(parts.map((p) => p.category))].filter(Boolean)
    return unique.sort()
  }, [parts])

  const manufacturers = useMemo(() => {
    const unique = [...new Set(parts.map((p) => p.manufacturer_name))].filter(Boolean)
    return unique.sort()
  }, [parts])

  const filteredAndSortedParts = useMemo(() => {
    let filtered = parts

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (part) =>
          part.name?.toLowerCase().includes(query) ||
          part.part_number?.toLowerCase().includes(query) ||
          part.description?.toLowerCase().includes(query) ||
          part.category?.toLowerCase().includes(query) ||
          part.manufacturer_name?.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((part) => part.category === categoryFilter)
    }

    // Manufacturer filter
    if (manufacturerFilter !== "all") {
      filtered = filtered.filter((part) => part.manufacturer_name === manufacturerFilter)
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "")
        case "part_number":
          return (a.part_number || "").localeCompare(b.part_number || "")
        case "price_low":
          return (Number.parseFloat(a.unit_price) || 0) - (Number.parseFloat(b.unit_price) || 0)
        case "price_high":
          return (Number.parseFloat(b.unit_price) || 0) - (Number.parseFloat(a.unit_price) || 0)
        case "stock_low":
          return (a.stock_quantity || 0) - (b.stock_quantity || 0)
        case "stock_high":
          return (b.stock_quantity || 0) - (a.stock_quantity || 0)
        default:
          return 0
      }
    })

    return sorted
  }, [parts, searchQuery, categoryFilter, manufacturerFilter, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search parts by name, part number, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="part_number">Part Number</SelectItem>
              <SelectItem value="price_low">Price (Low to High)</SelectItem>
              <SelectItem value="price_high">Price (High to Low)</SelectItem>
              <SelectItem value="stock_low">Stock (Low to High)</SelectItem>
              <SelectItem value="stock_high">Stock (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={manufacturerFilter} onValueChange={setManufacturerFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Manufacturers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Manufacturers</SelectItem>
              {manufacturers.map((manufacturer) => (
                <SelectItem key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchQuery || categoryFilter !== "all" || manufacturerFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("")
                setCategoryFilter("all")
                setManufacturerFilter("all")
              }}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedParts.length} of {parts.length} parts
        </div>
      </div>

      {filteredAndSortedParts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No parts found</h3>
          <p className="text-muted-foreground">
            {parts.length === 0
              ? "Run the database scripts to populate your catalog with sample data."
              : "Try adjusting your search or filter criteria."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedParts.map((part) => (
            <Link key={part.id} href={`/parts/${part.id}`}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg leading-tight">{part.name}</CardTitle>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono">{part.part_number}</span>
                    {part.stock_quantity <= part.reorder_level && (
                      <Badge variant="destructive" className="text-xs">
                        Low Stock
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <p className="font-medium">{part.category}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Manufacturer:</span>
                      <p className="font-medium">{part.manufacturer_name || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Package:</span>
                      <p className="font-medium">{part.package_type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stock:</span>
                      <p className="font-medium">{part.stock_quantity} units</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Value:</span>
                      <p className="font-medium">{part.value}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tolerance:</span>
                      <p className="font-medium">{part.tolerance}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Voltage:</span>
                      <p className="font-medium">{part.voltage_rating}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Power:</span>
                      <p className="font-medium">{part.power_rating}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Temp Range:</span>
                      <p className="font-medium text-xs">{part.temperature_range}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <p className="font-medium">${Number.parseFloat(part.unit_price).toFixed(2)}</p>
                    </div>
                  </div>

                  {part.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 pt-2 border-t border-border">
                      {part.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

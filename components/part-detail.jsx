import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Package, AlertCircle } from "lucide-react"

export function PartDetail({ part }) {
  const stockStatus = part.stock_quantity <= part.reorder_level ? "low" : part.stock_quantity > 0 ? "in-stock" : "out"

  return (
    <div className="max-w-5xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Parts
        </Link>
      </Button>

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-balance mb-2">{part.name}</h1>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-mono text-lg">{part.part_number}</span>
              {stockStatus === "low" && (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Low Stock
                </Badge>
              )}
              {stockStatus === "in-stock" && <Badge variant="secondary">In Stock</Badge>}
              {stockStatus === "out" && <Badge variant="outline">Out of Stock</Badge>}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${Number.parseFloat(part.unit_price).toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">per unit</div>
          </div>
        </div>

        {part.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{part.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <SpecRow label="Category" value={part.category} />
              <SpecRow label="Package Type" value={part.package_type} />
              <SpecRow label="Value" value={part.value} />
              <SpecRow label="Tolerance" value={part.tolerance} />
              <SpecRow label="Voltage Rating" value={part.voltage_rating} />
              <SpecRow label="Current Rating" value={part.current_rating} />
              <SpecRow label="Power Rating" value={part.power_rating} />
              <SpecRow label="Temperature Range" value={part.temperature_range} />
              <SpecRow label="Mounting Type" value={part.mounting_type} />
              <SpecRow label="Lead Style" value={part.lead_style} />
            </div>
          </CardContent>
        </Card>

        {/* Inventory & Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SpecRow label="Stock Quantity" value={`${part.stock_quantity} units`} />
              <SpecRow label="Reorder Level" value={`${part.reorder_level} units`} />
              <SpecRow label="Location" value={part.location} />
              <SpecRow label="Supplier" value={part.supplier} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SpecRow label="Unit Price" value={`$${Number.parseFloat(part.unit_price).toFixed(2)}`} />
              <SpecRow label="Status" value={part.status} />
              <SpecRow label="RoHS Compliant" value={part.rohs_compliant ? "Yes" : "No"} />
              <SpecRow label="Lead Free" value={part.lead_free ? "Yes" : "No"} />
            </CardContent>
          </Card>
        </div>

        {/* Manufacturer Information */}
        {part.manufacturer_name && (
          <Card>
            <CardHeader>
              <CardTitle>Manufacturer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <SpecRow label="Manufacturer" value={part.manufacturer_name} />
                    {part.manufacturer_country && <SpecRow label="Country" value={part.manufacturer_country} />}
                    {part.manufacturer_description && (
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground leading-relaxed">{part.manufacturer_description}</p>
                      </div>
                    )}
                  </div>
                  {part.manufacturer_website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={part.manufacturer_website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        {(part.datasheet_url || part.notes) && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {part.datasheet_url && (
                <div>
                  <Button variant="outline" asChild>
                    <a href={part.datasheet_url} target="_blank" rel="noopener noreferrer">
                      View Datasheet
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}
              {part.notes && (
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{part.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function SpecRow({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-muted-foreground text-sm">{label}:</span>
      <span className="font-medium text-sm text-right">{value || "N/A"}</span>
    </div>
  )
}

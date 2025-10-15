import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, ExternalLink, MapPin } from "lucide-react"

export function ManufacturersGrid({ manufacturers }) {
  if (manufacturers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No manufacturers found</h3>
        <p className="text-muted-foreground">Run the database scripts to populate your catalog with sample data.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {manufacturers.map((manufacturer) => (
        <Card key={manufacturer.id} className="h-full transition-all hover:shadow-lg hover:border-primary/50">
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <CardTitle className="text-xl leading-tight">{manufacturer.name}</CardTitle>
              <Badge variant="secondary" className="flex-shrink-0">
                {manufacturer.parts_count} {manufacturer.parts_count === 1 ? "part" : "parts"}
              </Badge>
            </div>
            {manufacturer.country && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{manufacturer.country}</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {manufacturer.description && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{manufacturer.description}</p>
            )}

            <div className="space-y-2 pt-2 border-t border-border">
              {manufacturer.contact_email && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <a
                    href={`mailto:${manufacturer.contact_email}`}
                    className="ml-2 text-primary hover:underline font-medium"
                  >
                    {manufacturer.contact_email}
                  </a>
                </div>
              )}
              {manufacturer.contact_phone && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-2 font-medium">{manufacturer.contact_phone}</span>
                </div>
              )}
              {manufacturer.website && (
                <div className="pt-2">
                  <a
                    href={manufacturer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

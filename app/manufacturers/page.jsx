import { getManufacturers } from "@/lib/db"
import { Navigation } from "@/components/navigation"
import { ManufacturersGrid } from "@/components/manufacturers-grid"

export default async function ManufacturersPage() {
  const manufacturers = await getManufacturers()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-balance mb-2">Manufacturers</h1>
          <p className="text-muted-foreground text-lg">Browse {manufacturers.length} manufacturers in our catalog</p>
        </div>
        <ManufacturersGrid manufacturers={manufacturers} />
      </main>
    </div>
  )
}

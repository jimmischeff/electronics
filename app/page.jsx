import { getParts } from "@/lib/db"
import { Navigation } from "@/components/navigation"
import { PartsGrid } from "@/components/parts-grid"

export default async function HomePage() {
  const parts = await getParts()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-balance mb-2">Electronic Parts Catalog</h1>
          <p className="text-muted-foreground text-lg">Browse our collection of {parts.length} electronic components</p>
        </div>
        <PartsGrid parts={parts} />
      </main>
    </div>
  )
}

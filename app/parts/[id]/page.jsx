import { getPartById } from "@/lib/db"
import { Navigation } from "@/components/navigation"
import { PartDetail } from "@/components/part-detail"
import { notFound } from "next/navigation"

export default async function PartPage({ params }) {
  const part = await getPartById(params.id)

  if (!part) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <PartDetail part={part} />
      </main>
    </div>
  )
}

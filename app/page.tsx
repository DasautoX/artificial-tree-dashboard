import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Artificial Tree Project</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Our innovative artificial tree technology is designed to capture CO₂ from the atmosphere, helping to combat
        climate change and create a more sustainable future.
      </p>
      <Link href="/dashboard">
        <Button size="lg">Go to Dashboard</Button>
      </Link>
    </div>
  )
}


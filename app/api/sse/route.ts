import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      while (true) {
        const data = {
          co2Level: Math.random() * 100 + 400,
          temperature: Math.random() * 10 + 20,
          humidity: Math.random() * 20 + 60,
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
    },
  })

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}


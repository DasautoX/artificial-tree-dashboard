"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DashboardCard from "@/components/DashboardCard"
import { Label } from "@/components/ui/label"
import dynamic from "next/dynamic"

const TreeVisualization = dynamic(() => import("@/components/TreeVisualization").then((mod) => mod.TreeVisualization), {
  ssr: false,
})

const TreeParts = [
  { id: "surface", name: "Tree Top Surface" },
  { id: "chamber", name: "CO2 Extracting Chamber" },
  { id: "plate", name: "CO2 Purify Plate" },
]

interface SensorReadings {
  co2Level: number
  temperature: number
  humidity: number
}

const mockSensorReadings: Record<string, SensorReadings> = {
  surface: { co2Level: 450, temperature: 25, humidity: 60 },
  chamber: { co2Level: 1200, temperature: 22, humidity: 55 },
  plate: { co2Level: 200, temperature: 20, humidity: 50 },
}

export default function TreeMonitoring() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [readings, setReadings] = useState<SensorReadings | null>(null)

  useEffect(() => {
    if (selectedPart) {
      setReadings(mockSensorReadings[selectedPart])
    } else {
      setReadings(null)
    }
  }, [selectedPart])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h1 className="text-3xl font-bold">3D Tree Monitoring</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <DashboardCard title="3D Model">
            <TreeVisualization />
            <div className="mt-4 flex flex-wrap gap-2">
              {TreeParts.map((part) => (
                <button
                  key={part.id}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    selectedPart === part.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  }`}
                  onClick={() => setSelectedPart(part.id)}
                >
                  {part.name}
                </button>
              ))}
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <DashboardCard title="Sensor Readings">
            {readings ? (
              <>
                <h3 className="text-lg font-semibold mb-4">{TreeParts.find((p) => p.id === selectedPart)?.name}</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>CO₂ Concentration</Label>
                    <p className="text-2xl font-bold">{readings.co2Level} ppm</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Temperature</Label>
                    <p className="text-2xl font-bold">{readings.temperature}°C</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Humidity</Label>
                    <p className="text-2xl font-bold">{readings.humidity}%</p>
                  </div>
                </div>
              </>
            ) : (
              <p>Select a part of the tree to see sensor readings.</p>
            )}
          </DashboardCard>
        </motion.div>
      </div>
    </motion.div>
  )
}


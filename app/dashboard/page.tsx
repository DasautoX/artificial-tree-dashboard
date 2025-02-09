"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DashboardCard from "@/components/DashboardCard"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Chart from "@/components/Chart"
import { MaintenanceSchedule } from "@/components/MaintenanceSchedule"
import { NotificationCenter } from "@/components/NotificationCenter"
import { SystemHealthCheck } from "@/components/SystemHealthCheck"
import { DataExport } from "@/components/DataExport"
import { WeatherWidget } from "@/components/WeatherWidget"
import { TreeVisualization } from "@/components/TreeVisualization"
import { AIAssistant } from "@/components/AIAssistant"
import { TreeMap } from "@/components/TreeMap"

// Mock data for demonstration
const mockData = {
  totalCO2Absorbed: 1000,
  currentCaptureRate: 5,
  resinSaturation: 75,
  domeStatus: "Deployed",
  temperature: 25,
  storageLevel: 60,
  regenerationTime: 3600, // in seconds
}

const mockChartData = [
  { time: "00:00", co2: 400 },
  { time: "04:00", co2: 420 },
  { time: "08:00", co2: 450 },
  { time: "12:00", co2: 470 },
  { time: "16:00", co2: 460 },
  { time: "20:00", co2: 430 },
  { time: "24:00", co2: 410 },
]

export default function Dashboard() {
  const [timeLeft, setTimeLeft] = useState(mockData.regenerationTime)
  const [realtimeData, setRealtimeData] = useState({
    co2Level: 450,
    temperature: 25,
    humidity: 60,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    const eventSource = new EventSource("/api/sse")

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setRealtimeData(data)
    }

    return () => {
      clearInterval(timer)
      eventSource.close()
    }
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <NotificationCenter />
          <WeatherWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <DashboardCard title="Overview">
            <p>Total CO₂ Absorbed: {mockData.totalCO2Absorbed} kg</p>
            <p>Current Capture Rate: {mockData.currentCaptureRate} kg/hour</p>
            <p>Predicted Daily Capture: {(mockData.currentCaptureRate * 24).toFixed(2)} kg</p>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <DashboardCard title="Real-time Data">
            <p>CO₂ Level: {realtimeData.co2Level.toFixed(2)} ppm</p>
            <p>Temperature: {realtimeData.temperature.toFixed(1)}°C</p>
            <p>Humidity: {realtimeData.humidity.toFixed(1)}%</p>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <DashboardCard title="Resin Saturation">
            <Progress value={mockData.resinSaturation} className="w-full" />
            <p className="mt-2">{mockData.resinSaturation}% saturated</p>
            {mockData.resinSaturation >= 90 && (
              <Alert className="mt-4">
                <AlertTitle>Regeneration Needed</AlertTitle>
                <AlertDescription>Resin saturation has reached 90%. Please initiate regeneration.</AlertDescription>
              </Alert>
            )}
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <DashboardCard title="3D Visualization">
            <TreeVisualization />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
          <DashboardCard title="AI Assistant">
            <AIAssistant />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
          <DashboardCard title="Tree Locations">
            <TreeMap />
          </DashboardCard>
        </motion.div>
      </div>

      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
        <DashboardCard title="CO₂ Levels (Last 24 Hours)">
          <Chart data={mockChartData} xKey="time" yKeys={[{ key: "co2", color: "#8884d8" }]} height={300} />
        </DashboardCard>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
          <DashboardCard title="Maintenance">
            <MaintenanceSchedule />
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.0 }}>
          <DashboardCard title="System Health">
            <SystemHealthCheck />
          </DashboardCard>
        </motion.div>
      </div>

      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
        <DashboardCard title="Data Export">
          <DataExport />
        </DashboardCard>
      </motion.div>
    </motion.div>
  )
}


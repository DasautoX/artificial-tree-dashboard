"use client"

import { useState } from "react"
import DashboardCard from "@/components/DashboardCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Chart from "@/components/Chart"

// Mock data for demonstration
const mockData = {
  hourly: [
    { time: "00:00", co2: 400, temp: 20 },
    { time: "04:00", co2: 420, temp: 22 },
    { time: "08:00", co2: 450, temp: 25 },
    { time: "12:00", co2: 470, temp: 28 },
    { time: "16:00", co2: 460, temp: 27 },
    { time: "20:00", co2: 430, temp: 23 },
  ],
  daily: [
    { time: "Mon", co2: 430, temp: 24 },
    { time: "Tue", co2: 450, temp: 25 },
    { time: "Wed", co2: 440, temp: 23 },
    { time: "Thu", co2: 460, temp: 26 },
    { time: "Fri", co2: 470, temp: 27 },
    { time: "Sat", co2: 450, temp: 25 },
    { time: "Sun", co2: 440, temp: 24 },
  ],
  monthly: [
    { time: "Jan", co2: 440, temp: 22 },
    { time: "Feb", co2: 450, temp: 23 },
    { time: "Mar", co2: 460, temp: 24 },
    { time: "Apr", co2: 470, temp: 25 },
    { time: "May", co2: 480, temp: 26 },
    { time: "Jun", co2: 490, temp: 27 },
  ],
}

export default function HistoricalData() {
  const [timeRange, setTimeRange] = useState("hourly")

  const handleExport = () => {
    // In a real application, this would generate and download a CSV file
    alert("Exporting data...")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Historical Data</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleExport}>Export Data</Button>
      </div>

      <DashboardCard title="CO₂ Capture Levels">
        <Chart
          data={mockData[timeRange as keyof typeof mockData]}
          xKey="time"
          yKeys={[
            { key: "co2", color: "#8884d8" },
            { key: "temp", color: "#82ca9d" },
          ]}
          height={400}
        />
      </DashboardCard>
    </div>
  )
}


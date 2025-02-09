"use client"

import { useState } from "react"
import DashboardCard from "@/components/DashboardCard"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Settings() {
  const [domeDeployed, setDomeDeployed] = useState(false)
  const [regenerationActive, setRegenerationActive] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings & Alerts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="System Controls">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dome-switch">Deploy Dome</Label>
              <Switch id="dome-switch" checked={domeDeployed} onCheckedChange={setDomeDeployed} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="regeneration-switch">Start Regeneration</Label>
              <Switch id="regeneration-switch" checked={regenerationActive} onCheckedChange={setRegenerationActive} />
            </div>
            <Button variant="outline">Reset Alerts</Button>
          </div>
        </DashboardCard>

        <DashboardCard title="Alert Configuration">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alert-method">Alert Method</Label>
              <Select defaultValue="email">
                <SelectTrigger id="alert-method">
                  <SelectValue placeholder="Select alert method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="popup">On-screen Pop-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alert-threshold">Alert Threshold (% Saturation)</Label>
              <Input id="alert-threshold" type="number" defaultValue={90} />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Sensor Calibration">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="co2-calibration">CO₂ Sensor Calibration</Label>
              <Input id="co2-calibration" type="number" placeholder="Enter calibration value" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight-calibration">Weight Sensor Calibration</Label>
              <Input id="weight-calibration" type="number" placeholder="Enter calibration value" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temp-calibration">Temperature Sensor Calibration</Label>
              <Input id="temp-calibration" type="number" placeholder="Enter calibration value" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pressure-calibration">Pressure Sensor Calibration</Label>
              <Input id="pressure-calibration" type="number" placeholder="Enter calibration value" />
            </div>
            <Button>Apply Calibration</Button>
          </div>
        </DashboardCard>

        <DashboardCard title="User Preferences">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch id="notifications" defaultChecked />
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}


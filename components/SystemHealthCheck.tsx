import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface SystemComponent {
  name: string
  status: "operational" | "degraded" | "down"
  performance?: number
}

const mockSystemComponents: SystemComponent[] = [
  { name: "CO2 Capture Unit", status: "operational", performance: 95 },
  { name: "Sensor Array", status: "degraded", performance: 78 },
  { name: "Data Processing", status: "operational", performance: 99 },
  { name: "Storage System", status: "operational", performance: 88 },
  { name: "Communication Module", status: "down" },
]

export function SystemHealthCheck() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="text-green-500" />
      case "degraded":
        return <AlertTriangle className="text-yellow-500" />
      case "down":
        return <XCircle className="text-red-500" />
      default:
        return null
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">System Health</h2>
      {mockSystemComponents.map((component, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span>{component.name}</span>
            {getStatusIcon(component.status)}
          </div>
          {component.performance && <Progress value={component.performance} className="w-full" />}
        </div>
      ))}
    </div>
  )
}


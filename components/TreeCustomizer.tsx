import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface TreeParameters {
  height: number
  leafDensity: number
  trunkThickness: number
  rootSpread: number
}

export function TreeCustomizer() {
  const [parameters, setParameters] = useState<TreeParameters>({
    height: 10,
    leafDensity: 50,
    trunkThickness: 30,
    rootSpread: 5,
  })

  const handleParameterChange = (param: keyof TreeParameters) => (value: number[]) => {
    setParameters((prev) => ({ ...prev, [param]: value[0] }))
  }

  const handleApplyChanges = () => {
    // In a real application, this would update the 3D model or send data to a backend
    console.log("Applying tree customization:", parameters)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tree Customizer</h2>
      {Object.entries(parameters).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
          <Slider
            id={key}
            min={0}
            max={100}
            step={1}
            value={[value]}
            onValueChange={handleParameterChange(key as keyof TreeParameters)}
          />
        </div>
      ))}
      <Button onClick={handleApplyChanges}>Apply Changes</Button>
    </div>
  )
}


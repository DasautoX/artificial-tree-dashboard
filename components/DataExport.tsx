import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DataExport() {
  const handleExport = (format: string) => {
    // In a real application, this would trigger a data export process
    console.log(`Exporting data in ${format} format`)
  }

  return (
    <div className="flex items-center space-x-2">
      <Select onValueChange={handleExport}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="csv">CSV</SelectItem>
          <SelectItem value="json">JSON</SelectItem>
          <SelectItem value="pdf">PDF Report</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={() => handleExport("csv")}>Export Data</Button>
    </div>
  )
}


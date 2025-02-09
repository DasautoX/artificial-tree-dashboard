import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface MaintenanceTask {
  id: number
  task: string
  dueDate: string
  status: "Pending" | "In Progress" | "Completed"
}

const mockTasks: MaintenanceTask[] = [
  { id: 1, task: "Clean CO2 filters", dueDate: "2023-07-15", status: "Pending" },
  { id: 2, task: "Calibrate sensors", dueDate: "2023-07-20", status: "In Progress" },
  { id: 3, task: "Replace resin", dueDate: "2023-08-01", status: "Pending" },
]

export function MaintenanceSchedule() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Maintenance Schedule</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.task}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  {task.status === "Completed" ? "View Details" : "Update Status"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


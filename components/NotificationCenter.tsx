"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: number
  message: string
  type: "info" | "warning" | "error"
  timestamp: string
}

const mockNotifications: Notification[] = [
  { id: 1, message: "CO2 levels above threshold", type: "warning", timestamp: "2023-07-10 14:30" },
  { id: 2, message: "Maintenance due in 3 days", type: "info", timestamp: "2023-07-11 09:15" },
  { id: 3, message: "System update available", type: "info", timestamp: "2023-07-12 11:45" },
]

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 max-w-[90vw] z-50 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full">
              {mockNotifications.map((notification) => (
                <div key={notification.id} className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p
                    className={`text-sm ${
                      notification.type === "warning"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : notification.type === "error"
                          ? "text-red-600 dark:text-red-400"
                          : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.timestamp}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


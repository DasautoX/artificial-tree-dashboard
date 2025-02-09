"use client"

import Link from "next/link"
import { useState } from "react"
import { Home, BarChart2, TreesIcon as Tree, History, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
  { href: "/3d-monitoring", icon: Tree, label: "3D Monitoring" },
  { href: "/historical-data", icon: History, label: "Historical Data" },
  { href: "/settings", icon: Settings, label: "Settings & Alerts" },
]

const NavLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <Link
    href={href}
    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
)

const Navigation = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="hidden md:block w-64 bg-white dark:bg-black shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Artificial Tree</h1>
        </div>
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink {...item} />
            </li>
          ))}
        </ul>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white dark:bg-black">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Artificial Tree</h1>
          </div>
          <ul className="space-y-2 p-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink {...item} />
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Navigation


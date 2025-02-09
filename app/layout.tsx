"use client"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import Navigation from "@/components/Navigation"
import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-4 right-4 z-50"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="flex-1 p-4 md:p-6 overflow-x-hidden overflow-y-auto">
              <ThemeToggle />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
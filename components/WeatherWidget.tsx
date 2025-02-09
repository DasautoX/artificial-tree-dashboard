"use client"

import { useEffect, useState } from "react"
import { Cloud, Sun, CloudRain } from "lucide-react"

interface WeatherData {
  temperature: number
  condition: "sunny" | "cloudy" | "rainy"
  humidity: number
  windSpeed: number
}

const mockWeatherApi = (): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        temperature: Math.round(Math.random() * 15 + 10), // 10-25°C
        condition: ["sunny", "cloudy", "rainy"][Math.floor(Math.random() * 3)] as WeatherData["condition"],
        humidity: Math.round(Math.random() * 50 + 30), // 30-80%
        windSpeed: Math.round(Math.random() * 20), // 0-20 km/h
      })
    }, 1000)
  })
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    mockWeatherApi().then(setWeather)
  }, [])

  if (!weather) return <div>Loading weather data...</div>

  const getWeatherIcon = (condition: WeatherData["condition"]) => {
    switch (condition) {
      case "sunny":
        return <Sun className="text-yellow-400" />
      case "cloudy":
        return <Cloud className="text-gray-400" />
      case "rainy":
        return <CloudRain className="text-blue-400" />
    }
  }

  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="text-4xl">{getWeatherIcon(weather.condition)}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{weather.temperature}°C</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Humidity: {weather.humidity}%</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Wind: {weather.windSpeed} km/h</p>
      </div>
    </div>
  )
}


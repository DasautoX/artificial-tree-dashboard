"use client"

import { useState } from "react"

const treeLocations = [
  { id: 1, name: "Doha Tree", lat: 25.2854, lng: 51.531 },
  { id: 2, name: "Al Wakrah Tree", lat: 25.1715, lng: 51.6034 },
  { id: 3, name: "Al Khor Tree", lat: 25.684, lng: 51.498 },
  { id: 4, name: "Dukhan Tree", lat: 25.4242, lng: 50.778 },
  { id: 5, name: "Al Ruwais Tree", lat: 26.1324, lng: 51.2144 },
]

export function TreeMap() {
  const [selectedTree, setSelectedTree] = useState<number | null>(null)

  // Convert lat/lng to x/y coordinates on the SVG
  const projectToSVG = (lat: number, lng: number) => {
    const x = ((lng - 50.75) / (51.65 - 50.75)) * 100
    const y = ((26.2 - lat) / (26.2 - 25.15)) * 100
    return { x, y }
  }

  return (
    <div className="relative w-full h-[400px] bg-gray-100 dark:bg-black rounded-lg overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Simplified Qatar map shape */}
        <path
          d="M50,10 L60,15 L70,25 L75,40 L70,60 L60,80 L50,90 L40,85 L35,75 L30,60 L35,40 L40,25 L50,10"
          className="fill-gray-200 dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-700"
          strokeWidth="0.5"
        />

        {/* Tree locations */}
        {treeLocations.map((tree) => {
          const { x, y } = projectToSVG(tree.lat, tree.lng)
          return (
            <g
              key={tree.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer"
              onMouseEnter={() => setSelectedTree(tree.id)}
              onMouseLeave={() => setSelectedTree(null)}
            >
              <circle
                r="2"
                className={selectedTree === tree.id ? "fill-green-500" : "fill-gray-500 dark:fill-gray-400"}
              />
              {selectedTree === tree.id && (
                <text x="3" y="1" fontSize="4" className="fill-gray-800 dark:fill-gray-200">
                  {tree.name}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 p-2 rounded">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Qatar Artificial Trees</h3>
      </div>
    </div>
  )
}


import type React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartProps {
  data: any[]
  xKey: string
  yKeys: { key: string; color: string }[]
  height?: number
}

const Chart: React.FC<ChartProps> = ({ data, xKey, yKeys, height = 300 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        {yKeys.map((y) => (
          <Line key={y.key} type="monotone" dataKey={y.key} stroke={y.color} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart


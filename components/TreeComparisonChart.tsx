import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const mockData = [
  { name: "Tree A", co2Capture: 4000, o2Production: 2400, amt: 2400 },
  { name: "Tree B", co2Capture: 3000, o2Production: 1398, amt: 2210 },
  { name: "Tree C", co2Capture: 2000, o2Production: 9800, amt: 2290 },
  { name: "Tree D", co2Capture: 2780, o2Production: 3908, amt: 2000 },
  { name: "Tree E", co2Capture: 1890, o2Production: 4800, amt: 2181 },
]

export function TreeComparisonChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={mockData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="co2Capture" fill="#8884d8" />
          <Bar dataKey="o2Production" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


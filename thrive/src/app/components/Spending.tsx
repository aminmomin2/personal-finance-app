"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const chartData = [
  { month: "Jan", value: 2800 },
  { month: "Feb", value: 3200 },
  { month: "Mar", value: 2900 },
  { month: "Apr", value: 3100 },
  { month: "May", value: 3400 },
  { month: "Jun", value: 3300 },
  { month: "Jul", value: 3600 },
  { month: "Aug", value: 3800 },
  { month: "Sep", value: 3500 },
  { month: "Oct", value: 3700 },
  { month: "Nov", value: 3900 },
  { month: "Dec", value: 4200 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-[var(--border-color-light)]">
        <p className="text-sm font-medium text-[var(--color-text-dark)]">{label}</p>
        <p className="text-lg font-semibold text-[var(--color-danger)]">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export function Spending() {
  const [timeRange, setTimeRange] = useState("1M")

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-[var(--color-text-dark)]">$42,000</h3>
          <p className="text-sm text-[var(--color-danger)] mt-1 flex items-center gap-1">
            <span>+$1,400</span>
            <span className="text-[var(--color-text-dark)]/60">(3.4%)</span>
          </p>
        </div>
        <div className="flex gap-2">
          {["1W", "1M", "3M", "YTD", "All"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                timeRange === range
                  ? "bg-[var(--color-danger)] text-white"
                  : "text-[var(--color-text-dark)]/60 hover:bg-[var(--color-bg-light)]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="var(--border-color-light)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-dark)", opacity: 0.6, fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-dark)", opacity: 0.6, fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tickMargin={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-danger)"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{
                r: 6,
                fill: "var(--color-danger)",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const chartData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 4500 },
  { month: "Mar", value: 4200 },
  { month: "Apr", value: 4800 },
  { month: "May", value: 5200 },
  { month: "Jun", value: 5100 },
  { month: "Jul", value: 5500 },
  { month: "Aug", value: 5800 },
  { month: "Sep", value: 6200 },
  { month: "Oct", value: 6500 },
  { month: "Nov", value: 6800 },
  { month: "Dec", value: 7200 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-[var(--border-color-light)]">
        <p className="text-sm font-medium text-[var(--color-text-dark)]">{label}</p>
        <p className="text-lg font-semibold text-[var(--color-primary)]">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export function NetWorth() {
  const [timeRange, setTimeRange] = useState("1M")

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-[var(--color-text-dark)]">$72,000</h3>
          <p className="text-sm text-[var(--color-success)] mt-1 flex items-center gap-1">
            <span>+$4,200</span>
            <span className="text-[var(--color-text-dark)]/60">(6.2%)</span>
          </p>
        </div>
        <div className="flex gap-2">
          {["1W", "1M", "3M", "YTD", "All"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                timeRange === range
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-dark)]/60 hover:bg-[var(--color-bg-light)]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
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
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{
                r: 6,
                fill: "var(--color-primary)",
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

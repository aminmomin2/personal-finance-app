"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"
const chartData = [
  { month: "January", desktop: 100 },
  { month: "February", desktop: 200 },
  { month: "March", desktop: 300 },
  { month: "April", desktop: 400 },
  { month: "May", desktop: 500 },
  { month: "June", desktop: 600 },
  { month: "July", desktop: 600 },
  { month: "August", desktop: 600 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function NetWorth() {
  return (
    <Card className="border-0 shadow-none w-full mb-0 pb-0 gap-0">
      <CardHeader className="mb-5">
        <CardTitle>$8700</CardTitle>
        <CardDescription>$0 (0%)</CardDescription>
      </CardHeader>
      <CardContent className="mb-3">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="w-full items-start text-sm">
            <nav className="flex justify-center gap-15">
              <button className="
                flex items-center justify-center
                rounded-full border-[var(--hover-color-light)] border-2 p-2 pl-4 pr-4
                text-[12px] tracking-widest font-mono"
              >
                1W
              </button>
              <button className="
                flex items-center justify-center
                rounded-full border-[var(--hover-color-light)] border-2 p-2 pl-4 pr-4
                text-[12px] tracking-widest font-mono"
              >
                1M
              </button>
              <button className="
                flex items-center justify-center
                rounded-full border-[var(--hover-color-light)] border-2 p-2 pl-4 pr-4
                text-[12px] tracking-widest font-mono"
              >
                3M
              </button>
              <button className="
                flex items-center justify-center
                rounded-full border-[var(--hover-color-light)] border-2 p-2 pl-4 pr-4
                text-[12px] tracking-widest font-mono"
              >
                YTD
              </button>
              <button className="
                flex items-center justify-center
                rounded-full border-[var(--hover-color-light)] border-2 p-2 pl-4 pr-4
                text-[12px] tracking-widest font-mono"
              >
                All
              </button>
            </nav>
        </div>
      </CardFooter>
    </Card>
  )
}

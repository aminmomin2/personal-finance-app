"use client"

import { usePathname } from "next/navigation"
import { Plus, Info, Bell, Calendar, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"

export default function Topbar() {
  const path = usePathname()
  const timeRange = "This Month" // This should be managed by state if needed

  return (
    <div className="
      flex flex-row justify-between items-center 
      px-6 py-4
      border-b border-[var(--border-color-light)]
      bg-[var(--color-bg-light)]
    ">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-semibold text-[var(--color-text-dark)]">
          {path.substring(1) === "dashboard" ? "Hello Amin" : path.charAt(1).toUpperCase() + path.slice(2)}
        </h1>
        {path === "/dashboard" && (
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-dark)]/60">
            <Calendar className="w-4 h-4" />
            <span>{timeRange}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        )}
      </div>
      <nav className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          className="border-[var(--border-color-light)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
        >
          <Plus className="w-4 h-4 mr-2"/>
          Account
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
        >
          <Info className="w-5 h-5"/>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
        >
          <Bell className="w-5 h-5"/>
        </Button>
      </nav>
    </div>
  )
}
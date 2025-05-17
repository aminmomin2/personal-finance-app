"use client"

import { usePathname } from "next/navigation";
import { Plus, Info, Bell } from "lucide-react"

export default function Topbar() {
  const path = usePathname()
  return (
    <div className="
      flex flex-row justify-between items-center 
      pl-7 pr-7 pt-5 
      text-[30px]"
    >
      <p className="font-semibold w-50">
        {(path.substring(1)) === "dashboard" ? "Hello Amin" : path.charAt(1).toUpperCase() + path.slice(2)}
      </p>
        <nav className="
          flex items-center justify-end
          w-full gap-5"
        >
          <button className="
            flex items-center 
            rounded-full border-[var(--hover-color-light)] border-2 p-2 
            text-[12px] tracking-widest font-mono"
          >
            <Plus className="w-4 h-4 mr-1"/>
            Account
          </button>
          <Info className="w-5 h-5 flex-shrink-0 "/>
          <Bell className="w-5 h-5 flex-shrink-0"/>
        </nav>
    </div>
  )
}
"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
  Icon,
} from "lucide-react"
import { signOut } from "next-auth/react";

const navItems = [
  {label: "Dashboard", href: "/dashboard", icon: Home},
  { label: "Spending", href: "/spending", icon: CreditCard },
  { label: "Reports", href: "/reports", icon: BarChart2 },
  { label: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside
      className="
        flex flex-col
        w-55 h-screen
        p-6
        bg-[var(--color-bg-light)] text-[var(--color-text-dark)]
        dark:bg-[var(--color-bg-dark)] dark:text-[var(--color-text-light)]
        border-r-1
        border-[var(--border-color-light)]
      "
    >
      <div className="flex items-center justify-left mb-6">
        <Image
          src="/logo.png"
          alt="Thrive Logo"
          width={64}
          height={64}
        />
        <p className="text-center text-2xl tracking-wide font-mono scale-y-110">
          Thrive
        </p>
      </div>
      <nav className="flex-1 justify-left">
        <ul className="space-y-2">
          {navItems.map(({ label, href, icon: Icon}) => {
            const isActive = path === href;
            return (
              <li key={href}>
                <Link href={href}>
                  <p
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-lg transition
                      ${
                        isActive
                          ? "font-semibold hover:bg-[var(--hover-color-light)]"
                          : "hover:bg-[var(--hover-color-light)]"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "font-medium stroke-3"
                          : "text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]"
                      }`}
                    />
                    {label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
        <form action={async() => {
          await signOut()
        }}>
          <button className="w-full">
            <p
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-[var(--hover-color-light)]"
            >
              <LogOut
                className="w-5 h-5 text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]"
              />
              Logout
            </p>
          </button>
        </form>
      </nav>
    </aside>
  )
}
import { Button } from "../components/ui/button"

export default function Spending() {
  const navItems = [
  {label: "Overview", href: "/overview" },
  { label: "Breakdown & budget", href: "/breakdown" },
  { label: "Recurring", href: "/recurring" },
  { label: "Transactions", href: "/transactions" },
  { label: "Reports", href: "/reports" },
  ]

  return (
    <nav className="flex flex-row pl-7 pr-7 pt-3 gap-2">
      {navItems.map((item, index) => (
        <Button variant="ghost" key={index}>
          {item.label}
        </Button>
      ))}
    </nav>
  )
}
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]">
      {children}
    </div>
  )
}
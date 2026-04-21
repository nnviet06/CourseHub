'use client'
import useAuth from "@/hooks/useAuth"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, error } = useAuth()

  return (
    <main>
      {children}
    </main>
  )
}

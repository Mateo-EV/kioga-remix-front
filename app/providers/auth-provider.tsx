import type { Session } from "@/data/types"
import { createContext, useContext } from "react"

const AuthContext = createContext<Session | null>(null)

export default function AuthProvider({
  children,
  session
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

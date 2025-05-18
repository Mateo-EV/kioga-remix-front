import AuthPage from "@/components/home/auth/auth-page"
import { MetaGenerator } from "@/lib/metadata"

export const meta = () => MetaGenerator({ title: "Register" })

export default function RegisterPage() {
  return <AuthPage />
}

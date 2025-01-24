import AuthPage from "@/components/home/auth/auth-page"
import getEnv from "@/lib/env"
import { MetaGenerator } from "@/lib/metadata"

export const meta = () =>
  MetaGenerator({ app_url: getEnv().APP_URL, title: "Login" })

export default function LoginPage() {
  return <AuthPage isLoginPage />
}

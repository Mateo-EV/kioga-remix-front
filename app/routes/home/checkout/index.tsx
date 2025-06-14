import { getSession } from "@/data/server/auth"
import { redirect, type LoaderFunctionArgs } from "react-router"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request)

  if (!session) {
    return redirect("/login")
  }

  if (!session.isEmailVerified) {
    return redirect("/verificar-email")
  }

  return { session }
}

export default function CheckoutPage() {
  return <div>Checkout</div>
}

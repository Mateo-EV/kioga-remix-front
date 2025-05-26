import { getSession } from "@/data/server/auth"
import { redirect, type LoaderFunctionArgs } from "react-router"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request)
  console.log(session)

  if (!session || !session.isEmailVerified) {
    return redirect("/login")
  }

  return { session }
}

export default function CheckoutPage() {
  return <div>Checkout</div>
}

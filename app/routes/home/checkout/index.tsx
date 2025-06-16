import CheckoutContent from "@/components/home/checkout/checkout-content"
import { H1 } from "@/components/home/typography"
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
  return <section className="container space-y-6 py-6 md:py-10">
      <H1>Checkout</H1>
      <CheckoutContent />
    </section>
}

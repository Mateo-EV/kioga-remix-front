import { getSession } from "@/data/server/auth"
import type { Route } from "./+types"
import { redirect, useLoaderData } from "react-router"
import { api } from "@/lib/ky"
import OrderStatus from "@/components/home/orders/order-status"
import type { OrderResponse } from "@/data/types"
import { DataTable } from "@/components/home/datatable/data-table"
import { columns } from "@/components/home/orders/order-columns"
import OrderDetailsModal from "@/components/home/orders/order-details-modal"

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request)

  if (!session) {
    return redirect("/login")
  }

  if (!session.isEmailVerified) {
    return redirect("/verificar-email")
  }

  const orders = await api<OrderResponse[]>("orders/personal", {
    headers: request.headers
  }).json()

  if (!orders) redirect("/")

  return { session, orders }
}

export default function OrdersPage() {
  const { session, orders } = useLoaderData<typeof loader>()
  console.log(orders)

  return (
    <>
      <OrderStatus />
      <section className="container flex flex-col space-y-8 py-6 md:py-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Bienvenido {session.name}
          </h2>
          <p className="text-muted-foreground">
            Aquí tenemos una lista de tus últimos pedidos
          </p>
        </div>
        <div className="animate-opacity-in">
          <DataTable data={orders} columns={columns} model="pedidos" />
        </div>
        <OrderDetailsModal />
      </section>
    </>
  )
}

import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { toast } from "sonner"

export default function OrderStatus() {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Pedido creado exitosamente")
    } else if (searchParams.get("error") === "true") {
      toast.error("Ocurrió un error")
    }
    setSearchParams({})
  }, [searchParams, setSearchParams])

  return null
}

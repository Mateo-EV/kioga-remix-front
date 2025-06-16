import { buttonVariants, ButtonWithLoading } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { cn, formatPrice } from "@/lib/utils"
import { ShoppingCartIcon } from "lucide-react"
import { Link } from "react-router"
import CheckoutProducts from "./checkout-products"
import CheckoutForm from "./checkout-form"
import { useState } from "react"

export default function CheckoutContent() {
  const { products } = useCart()
  const [isDelivery, setIsDelivery] = useState(false)
  const [isMakingOrder, setIsMakingOrder] = useState(false)

  const subtotal = products.reduce((acc, product) => {
    return (
      acc +
      (product.price - product.discount * product.price) * product.quantity
    )
  }, 0)

  const isCartEmpty = products.length === 0
  const shippingPrice = !isCartEmpty && isDelivery ? 5 : 0

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <div
        className={cn(
          "lg:col-span-7",
          isCartEmpty
            ? "rounded-lg border-2 border-dashed border-zinc-200 p-12"
            : ""
        )}
      >
        {isCartEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <div aria-hidden="true" className="mb-4">
              <ShoppingCartIcon className="size-40" />
            </div>
            <h3 className="text-2xl font-semibold">Tu carro está vacío</h3>
            <Link
              to="/productos"
              className={buttonVariants({ variant: "link" })}
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <CheckoutForm
            setIsDelivery={setIsDelivery}
            setIsMakingOrder={setIsMakingOrder}
          />
        )}
      </div>

      <div className="top-24 mt-10 lg:sticky lg:col-span-5 lg:mt-0">
        <CheckoutProducts />
        <Card className="animate-fade-in px-4 py-6 sm:p-6 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-semibold">Resumen del pedido</h2>
          <div className="mt-6 space-y-4">
            {shippingPrice > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm font-medium">{formatPrice(subtotal)}</p>
                </div>

                <div className="flex items-center justify-between border-t-2 pt-4">
                  <p className="text-sm text-muted-foreground">Envío</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(shippingPrice)}
                  </p>
                </div>
              </>
            )}

            <div className="flex items-center justify-between border-t-2 pt-4">
              <p className="text-base font-semibold">Total</p>
              <p className="text-base font-semibold">
                {formatPrice(subtotal + shippingPrice)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ButtonWithLoading
              isLoading={isMakingOrder}
              className="w-full"
              size="lg"
              disabled={isCartEmpty}
              form="checkout-form"
            >
              Checkout
            </ButtonWithLoading>
          </div>
        </Card>
      </div>
    </div>
  )
}

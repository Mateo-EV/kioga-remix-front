"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Product } from "@/data/types"
import { useCart } from "@/hooks/use-cart"
import getEnv from "@/lib/env"
import { cn, formatPrice } from "@/lib/utils"
import { ShoppingCartIcon } from "lucide-react"
import { useMemo } from "react"
import { Link } from "react-router"

type ProductCardProps = React.ComponentPropsWithoutRef<typeof Card> & {
  product: Product
}

const backendUrl = getEnv().BACKEND_URL

export const ProductCard = ({ product, ...props }: ProductCardProps) => {
  const { addProduct } = useCart()

  const productDiscounted = useMemo(
    () => product.price - product.price * product.discount,
    [product.price, product.discount]
  )

  return (
    <Card {...props}>
      <CardHeader>
        <p className="line-clamp-2 overflow-hidden text-ellipsis text-lg font-semibold">
          {product.name}
        </p>
        <div className="text-sm text-muted-foreground">
          <Link
            to={"/productos?categoria=" + product.category.slug}
            className="underline-offset-4 hover:underline"
            viewTransition
          >
            {product.category.name}
          </Link>{" "}
          ·{" "}
          <Link
            to={"/productos?marca=" + product.brand.slug}
            className="underline-offset-4 hover:underline"
            viewTransition
          >
            {product.brand.name}
          </Link>
        </div>
      </CardHeader>
      <Link to={"/productos/" + product.slug}>
        <CardContent className="relative mx-auto aspect-square overflow-hidden rounded-lg">
          <img
            src={`${backendUrl}${product.image}`}
            alt="producto-1"
            className={cn(
              "object-cover transition hover:scale-110 size-full",
              product.stock === 0 && "grayscale"
            )}
          />
        </CardContent>
      </Link>
      <CardFooter className="justify-between font-semibold">
        <div>
          <span className="block text-xl">
            {formatPrice(productDiscounted)}
          </span>
          {product.discount > 0 && (
            <span className="block text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          disabled={product.stock === 0}
          onClick={() => addProduct({ ...product, quantity: 1 })}
        >
          <span className="sr-only">Agregar al carro</span>
          <ShoppingCartIcon className="size-5" aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  )
}

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import { ProductCart } from "../layout/navbar-cart"
import { useCart } from "@/hooks/use-cart"

const SALT_PAGE = 2

export default function CheckoutProducts() {
  const { products } = useCart()
  const [page, setPage] = useState(0)

  if (products.length === 0) return

  const startIndex = page * SALT_PAGE
  const endIndex = startIndex + SALT_PAGE
  const paginatedProducts = products.slice(startIndex, endIndex)

  const numberOfPages = Math.ceil(products.length / SALT_PAGE)
  const isNumberOfPagesMayorThanFour = numberOfPages > 4

  return (
    <div className="mb-4 space-y-2">
      {paginatedProducts.map(product => (
        <ProductCart key={product.id} product={product} />
      ))}
      {products.length > SALT_PAGE && (
        <div className="w-full">
          <div className="flex flex-row justify-between">
            <Button
              className="gap-2"
              variant="outline"
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeftIcon className="size-4" />
              <span>Anterior</span>
            </Button>
            <div className="flex items-center justify-center space-x-2">
              {isNumberOfPagesMayorThanFour ? (
                <span className="text-sm font-medium">
                  Página {page + 1} de {numberOfPages}
                </span>
              ) : (
                Array.from({ length: numberOfPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={i === page ? "default" : "outline"}
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </Button>
                ))
              )}
            </div>
            <Button
              className="gap-2"
              variant="outline"
              disabled={page === numberOfPages - 1}
              onClick={() => setPage(p => p + 1)}
            >
              <span>Siguiente</span>
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

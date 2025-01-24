import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import useGetInfiniteFilteredProducts from "@/hooks/products/use-get-infinite-filtered-products"
import { useIntersection } from "@/hooks/use-intersection"
import { GhostIcon } from "lucide-react"
import { useEffect } from "react"
import GalleryProductsSkeleton from "./gallery-products-skeleton"
import { ProductCard } from "./product-card"

const LIMIT_REQUEST = 3

const GalleryProducts = () => {
  const { ref, entry } = useIntersection<HTMLDivElement>({
    threshold: 1
  })

  const {
    query: { data, fetchNextPage, hasNextPage, isFetchingNextPage },
    limitterRequests,
    setLimitterRequests
  } = useGetInfiniteFilteredProducts()

  useEffect(() => {
    if (entry?.isIntersecting && limitterRequests < LIMIT_REQUEST) {
      void fetchNextPage()
    }
  }, [entry?.isIntersecting, fetchNextPage, limitterRequests])

  const products = data?.pages.flatMap(response => response.items)

  console.log(products)

  if (!products) return <GalleryProductsSkeleton />

  if (products.length === 0)
    return (
      <div className="mt-16 flex flex-1 flex-col items-center gap-2">
        <GhostIcon className="size-16" />
        <h3 className="text-xl font-semibold">Bastante vacio por aquí</h3>
        <p>No hay más productos que ver aquí</p>
      </div>
    )

  return (
    <div className="grid flex-1 animate-opacity-in auto-rows-min grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      {limitterRequests < LIMIT_REQUEST ? (
        <div ref={ref} />
      ) : (
        hasNextPage && (
          <Button
            className="col-span-full"
            variant="secondary"
            onClick={() => setLimitterRequests(0)}
          >
            Ver más
          </Button>
        )
      )}
      {isFetchingNextPage && (
        <div className="col-span-full mt-4 flex items-center justify-center">
          <LoadingSpinner className="size-6" />
        </div>
      )}
    </div>
  )
}

export default GalleryProducts

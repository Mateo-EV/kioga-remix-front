import { H2 } from "@/components/home/typography"
import { buttonVariants } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import GradientDecorator from "../gradient-decorator"
import { Skeleton } from "@/components/ui/skeleton"
import useGetBestSellingProductsWeekly from "@/hooks/products/use-get-best-selling-products-weekly"
import { Link } from "react-router"
import ProductsFullScreenCarousel from "../carousel/products-fullscreen-carousel"

export default function WeekProductsSection() {
  return (
    <section
      className="relative animate-fade-in overflow-hidden py-12 opacity-0 fill-mode-forwards"
      style={{ animationDelay: "850ms" }}
    >
      <GradientDecorator className="left-1/2 size-[250px] -translate-x-1/2 -translate-y-1/2 xs:left-1/3 xs:top-[300px] xs:size-[300px]" />
      <div className="container xs:space-y-8">
        <div className="flex flex-col items-center justify-between gap-4 xs:flex-row">
          <H2>Productos de la Semana</H2>
          <Link
            viewTransition
            to="/productos"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2",
              size: "lg"
            })}
          >
            Ver Más <EyeIcon className="size-4" />
          </Link>
        </div>
        <WeekProducts />
      </div>
    </section>
  )
}

const WeekProductsSkeleton = () => {
  return (
    <div className="mt-8 flex h-96 w-full gap-6">
      <Skeleton className="h-full" containerClassName="size-full" />
      <Skeleton
        className="h-full"
        containerClassName="size-full hidden md:block"
      />
      <Skeleton
        className="h-full"
        containerClassName="size-full hidden md:block"
      />
      <Skeleton
        className="h-full"
        containerClassName="size-full hidden xl:block"
      />
    </div>
  )
}

function WeekProducts() {
  const { data: products, isLoading } = useGetBestSellingProductsWeekly()

  if (isLoading || !products) return <WeekProductsSkeleton />

  return <ProductsFullScreenCarousel products={products} />
}

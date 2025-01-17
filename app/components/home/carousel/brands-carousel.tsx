"use client"

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import useGetBrands from "@/hooks/brands/use-get-brands"
import { useEffect, useState } from "react"
import { Link } from "react-router"

export const BrandsCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const { data: brands } = useGetBrands()

  useEffect(() => {
    const interval = setInterval(
      () => carouselApi?.scrollTo(carouselApi.selectedScrollSnap() + 1),
      2000
    )
    return () => {
      clearInterval(interval)
    }
  }, [carouselApi])

  return (
    <section className="container relative py-8 md:px-14">
      {brands ? (
        <Carousel
          opts={{ dragFree: true, loop: true, align: "start" }}
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {brands.map(brand => (
              <CarouselItem key={brand.id} className="basis-[1/10]">
                <Link
                  to={"/productos?marca=" + brand.slug}
                  viewTransition
                  className="flex size-full items-center justify-center rounded-lg border bg-zinc-100 p-3"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    width={50}
                    height={50}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      ) : (
        <Skeleton className="h-full" containerClassName="h-20 block" />
      )}
    </section>
  )
}

"use client"

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import type { Product } from "@/data/types"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ProductCard } from "../products/product-card"

type ProductsFullScreenCarouselProps = {
  products: Product[]
}

const ProductsFullScreenCarousel = ({
  products
}: ProductsFullScreenCarouselProps) => {
  const [carouselApi, setcarouselApi] = useState<CarouselApi>()
  const [selectedItem, setSelectedItem] = useState(0)
  useEffect(() => {
    carouselApi?.on("select", () => {
      setSelectedItem(carouselApi.selectedScrollSnap())
    })
  }, [carouselApi])

  return (
    <>
      <Carousel
        opts={{
          align: "center",
          loop: true,
          dragFree: true
        }}
        className="relative ml-[calc((100%-100vw)/2)] mr-[calc((100%-100vw)/2)] mt-2 cursor-grab xs:mt-0"
        setApi={setcarouselApi}
      >
        <CarouselContent className="my-4 px-4 py-2 xs:px-0">
          {products.map((product, i) => (
            <CarouselItem
              key={product.id}
              className="xs:basis-1/2 carouselMd:basis-1/4 xl:basis-1/6"
            >
              <ProductCard
                className={
                  "transition duration-500" +
                  (selectedItem === i ? " xs:scale-105 xs:bg-card/40" : "")
                }
                product={product}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mx-auto mt-4 flex w-[70%] gap-[4%]">
        {products.map((_, i) => (
          <div
            className={cn(
              "h-[3px] flex-1 cursor-pointer",
              selectedItem === i
                ? "bg-gradient-to-r from-primary to-secondary"
                : "bg-foreground"
            )}
            key={i}
            onClick={() => carouselApi?.scrollTo(i)}
          />
        ))}
      </div>
    </>
  )
}

export default ProductsFullScreenCarousel

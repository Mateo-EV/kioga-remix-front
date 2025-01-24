import { FilterProducts } from "@/components/home/products/filter-products"
import GalleryProducts from "@/components/home/products/gallery-products"
import { H1 } from "@/components/home/typography"
import getEnv from "@/lib/env"
import { MetaGenerator } from "@/lib/metadata"

export const meta = () =>
  MetaGenerator({ app_url: getEnv().APP_URL, title: "Productos" })

export default function ProductsPage() {
  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">Productos</H1>
      <FilterProducts>
        <GalleryProducts />
      </FilterProducts>
    </section>
  )
}

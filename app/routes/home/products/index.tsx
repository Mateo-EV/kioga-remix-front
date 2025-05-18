import { FilterProducts } from "@/components/home/products/filter-products"
import GalleryProducts from "@/components/home/products/gallery-products"
import { H1 } from "@/components/home/typography"
import { MetaGenerator } from "@/lib/metadata"

export const meta = () => MetaGenerator({ title: "Productos" })

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

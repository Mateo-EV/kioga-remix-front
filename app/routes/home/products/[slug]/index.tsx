import { H1, H2, Paragraph } from "@/components/home/typography"
import { BreadcrumbController } from "@/components/ui/breadcrumb"
import { MetaGenerator } from "@/lib/metadata"
import { Link, useLoaderData } from "react-router"
import type { Route } from "../[slug]/+types"
import { api } from "@/lib/ky"
import type { Product } from "@/data/types"
import AddCart from "@/components/home/cart/add-cart"
import { Card } from "@/components/ui/card"
import { Suspense, useEffect, useState } from "react"
import GradientDecorator from "@/components/home/gradient-decorator"
import { Skeleton } from "@/components/ui/skeleton"
import useGetSimilarProductsBySlug from "@/hooks/products/use-get-similar-products-by-slug"
import { ProductsCarousel } from "@/components/home/carousel/products-carousel"
import getEnv from "@/lib/env"

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params

  try {
    const product = await api<Product>(`products/${slug}`).json()

    return { product }
  } catch (error) {
    if (error instanceof Response) {
      if (error.status === 404) {
        throw new Response("Not Found", { status: 404 })
      }
    }

    throw new Response("Internal Server Error", { status: 500 })
  }
}

const backendUrl = getEnv().BACKEND_URL

export const meta = () => MetaGenerator({ title: "Producto" })

export default function ProductSlugPage() {
  const { product } = useLoaderData<typeof loader>()

  const [viewTransitionName, setViewTransitionName] = useState<
    string | undefined
  >("product-image-" + product.slug)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setViewTransitionName(undefined)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <section className="container space-y-4 py-6 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="basis-3/4 space-y-4">
            <BreadcrumbController
              prevPages={[
                { href: "/", name: "Home" },
                { href: "/productos", name: "Productos" }
              ]}
            />
            <H1>{product.name}</H1>
            <div className="text-sm text-muted-foreground">
              <Link
                to={"/productos?categoria=" + product.category.slug}
                className="underline-offset-4 hover:underline"
              >
                {product.category.name}
              </Link>{" "}
              ·{" "}
              <Link
                to={"/productos?marca=" + product.brand.slug}
                className="underline-offset-4 hover:underline"
              >
                {product.brand.name}
              </Link>
            </div>
            <Paragraph className="text-muted-foreground">
              {product.description}
            </Paragraph>
            <AddCart product={product} />
          </div>
          <Card className="relative flex basis-1/4 items-center justify-center overflow-hidden">
            <img
              src={backendUrl + product.image}
              sizes="270px"
              alt="Producto"
              style={{ viewTransitionName: viewTransitionName }}
            />
          </Card>
        </div>
      </section>
      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts productSlug={product.slug} />
      </Suspense>
    </>
  )
}

const SimilarProductsSkeleton = () => {
  return (
    <div className="container relative flex h-96 w-full gap-4 py-6">
      <GradientDecorator />
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

const SimilarProducts = ({ productSlug }: { productSlug: string }) => {
  const { data: products } = useGetSimilarProductsBySlug(productSlug)

  return (
    <section className="container relative space-y-4 py-6">
      <GradientDecorator />
      <H2>Productos Similares</H2>
      <ProductsCarousel products={products} />
    </section>
  )
}

import { H1 } from "@/components/home/typography"
import { BreadcrumbController } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import useGetCategories from "@/hooks/categories/use-get-categories"
import getEnv from "@/lib/env"
import { MetaGenerator } from "@/lib/metadata"
import { Suspense } from "react"
import { Link } from "react-router"

export const meta = () =>
  MetaGenerator({ app_url: getEnv().APP_URL, title: "Categorías" })

export default function CategoriesPage() {
  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">Categorías</H1>
      <BreadcrumbController
        className="container flex w-full justify-center"
        prevPages={[
          { href: "/", name: "Home" },
          { href: "/productos", name: "Productos" }
        ]}
        actualPage="Categorías"
      />
      <CategoriesList />
    </section>
  )
}

// const CategoriesListSkeleton = () => {
//   return (
//     <div className="relative flex flex-wrap items-center justify-center gap-10">
//       {Array.from({ length: 9 }).map((_, i) => (
//         <Skeleton key={i} className="size-full" containerClassName="size-96" />
//       ))}
//     </div>
//   )
// }

const CategoriesList = () => {
  const { data: categories } = useGetCategories()
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-10">
      {categories?.map(({ id, name, slug, image }) => (
        <Link viewTransition to={"/categorias/" + slug} key={id}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={image}
                alt={name}
                width={370}
                height={180}
                className="max-h-[180px] rounded-md object-cover transition hover:scale-110 hover:opacity-80"
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

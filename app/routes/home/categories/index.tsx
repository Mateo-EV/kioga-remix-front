import { H1 } from "@/components/home/typography"
import { BreadcrumbController } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Category } from "@/data/types"
import getEnv from "@/lib/env"
import { api } from "@/lib/ky"
import { MetaGenerator } from "@/lib/metadata"
import { Link, useLoaderData } from "react-router"

export async function loader() {
  const categories = await api<Category[]>("categories").json()
  return { categories }
}

export const meta = () => MetaGenerator({ title: "Categorías" })

const backendUrl = getEnv().BACKEND_URL

export default function CategoriesPage() {
  const { categories } = useLoaderData<typeof loader>()

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
      <CategoriesList categories={categories} />
    </section>
  )
}

const CategoriesList = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-10">
      {categories.map(({ id, name, slug, image }) => (
        <Link viewTransition to={"/productos?categoria=" + slug} key={id}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={backendUrl + image}
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

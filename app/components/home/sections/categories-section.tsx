import { H2 } from "@/components/home/typography"
import { Skeleton } from "@/components/ui/skeleton"
import GradientDecorator from "../gradient-decorator"
import useGetTopCategories from "@/hooks/categories/use-get-top-categories"
import { TopCategoriesTab } from "./top-categories-tab"

export default function CategoriesSection() {
  return (
    <section className="relative overflow-hidden py-12">
      <GradientDecorator className="left-1/2 size-[250px] -translate-x-1/2 -translate-y-[70%] md:left-2/3 md:top-1/2 md:block xl:size-[300px]" />
      <div className="container space-y-8">
        <H2 className="text-center md:text-left">Mejores Categorías</H2>
        <TopCategories />
      </div>
    </section>
  )
}

function TopCategoriesSkeleton() {
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

function TopCategories() {
  const { data: categories, isLoading } = useGetTopCategories()

  if (isLoading || !categories) return <TopCategoriesSkeleton />

  return <TopCategoriesTab categories={categories} />
}

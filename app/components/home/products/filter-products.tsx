import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { MultipleRangeSlider } from "@/components/ui/slider"
import {
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  SlidersHorizontalIcon
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { formatPrice } from "@/lib/utils"
import React, { useCallback, useMemo, useRef, useState } from "react"
import useMediaQuery from "@/hooks/use-media-query"
import type { Brand, Category, Subcategory } from "@/data/types"
import { useSearchParams } from "react-router"
import useGetCategories from "@/hooks/categories/use-get-categories"
import useGetBrands from "@/hooks/brands/use-get-brands"
import { Skeleton } from "@/components/ui/skeleton"

const AVAILIBILITY_FILTER = {
  id: "disponibilidad",
  name: "Disponibilidad",
  options: [
    {
      label: "Stock",
      value: "stock"
    },
    {
      label: "Acabado",
      value: "acabado"
    }
  ]
} as const

const PRICE_FILTER = {
  id: "precio",
  name: "Precio",
  default: [5, 4000],
  step: 0.01,
  diff: 10
} as const

const CATEGORY_FILTERS = {
  id: "categoria",
  name: "Categorías"
} as const

const SUBCATEGORY_FILTERS = {
  id: "tipo",
  name: "Tipos"
} as const

const BRAND_FILTERS = {
  id: "marca",
  name: "Marcas"
} as const

const FILTERS_IDS = [
  AVAILIBILITY_FILTER.id,
  PRICE_FILTER.id,
  CATEGORY_FILTERS.id,
  BRAND_FILTERS.id,
  SUBCATEGORY_FILTERS.id
] as const

const SORT_OPTIONS = [
  {
    label: "Mejor Vendido",
    value: "ventas"
  },
  {
    label: "A - Z",
    value: "name-asc"
  },
  {
    label: "Z - A",
    value: "name-desc"
  },
  {
    label: "Precio",
    icon: ArrowDownNarrowWideIcon,
    value: "price"
  },
  {
    label: "Precio",
    icon: ArrowUpNarrowWideIcon,
    value: "price-asc"
  }
]

type FilterProductsProps = {
  children: React.ReactNode
}
export const FilterProducts = ({ children }: FilterProductsProps) => {
  const isMobile = useMediaQuery("(max-width: 991px)")
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: categories } = useGetCategories()
  const { data: brands } = useGetBrands()

  const applyFilters = (
    filter_type: (typeof FILTERS_IDS)[number],
    value: string,
    type: "append" | "delete"
  ) => {
    setSearchParams(
      prevParams => {
        prevParams[type](filter_type, value)
        return prevParams
      },
      { preventScrollReset: true }
    )
  }

  const filterContent = useMemo(() => {
    return (
      <Accordion
        type="multiple"
        className="mt-4 lg:mt-0"
        defaultValue={FILTERS_IDS as unknown as string[]}
      >
        {/* Availability Filters */}
        <AccordionItem value={AVAILIBILITY_FILTER.id}>
          <AccordionTrigger>{AVAILIBILITY_FILTER.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {AVAILIBILITY_FILTER.options.map(({ label, value }) => (
                <Label key={value} className="flex items-center gap-2">
                  <Checkbox
                    id={value}
                    checked={searchParams
                      .getAll(AVAILIBILITY_FILTER.id)
                      ?.includes(value)}
                    onCheckedChange={v => {
                      applyFilters(
                        AVAILIBILITY_FILTER.id,
                        value,
                        v ? "append" : "delete"
                      )
                    }}
                    aria-label={label}
                  />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                    {label}
                  </span>
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value={PRICE_FILTER.id}>
          <AccordionTrigger>{PRICE_FILTER.name}</AccordionTrigger>
          <AccordionContent className="px-1">
            <PriceFilterSlider />
          </AccordionContent>
        </AccordionItem>

        {/* Categories + Subcategories Filters */}

        {categories ? (
          <AccordionItem value={CATEGORY_FILTERS.id}>
            <AccordionTrigger>{CATEGORY_FILTERS.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map(({ id, name, slug }) => (
                  <Label key={id} className="flex items-center gap-2">
                    <Checkbox
                      id={slug}
                      checked={searchParams
                        .getAll(CATEGORY_FILTERS.id)
                        ?.includes(slug)}
                      onCheckedChange={v => {
                        applyFilters(
                          CATEGORY_FILTERS.id,
                          slug,
                          v ? "append" : "delete"
                        )
                      }}
                      aria-label={name}
                    />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                      {name}
                    </span>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Skeleton containerClassName="size-full" className="h-48 mt-6" />
        )}

        {/* Brands Filters */}
        {brands && brands.length ? (
          <AccordionItem value={BRAND_FILTERS.id}>
            <AccordionTrigger>{BRAND_FILTERS.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.map(({ id, name, slug }) => (
                  <Label key={id} className="flex items-center gap-2">
                    <Checkbox
                      id={slug}
                      checked={searchParams
                        .getAll(BRAND_FILTERS.id)
                        ?.includes(slug)}
                      onCheckedChange={v => {
                        applyFilters(
                          BRAND_FILTERS.id,
                          slug,
                          v ? "append" : "delete"
                        )
                      }}
                      aria-label={name}
                    />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                      {name}
                    </span>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Skeleton containerClassName="size-full" className="h-48 mt-6" />
        )}
      </Accordion>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilters, searchParams])

  return (
    <>
      <div className="flex items-center gap-8">
        {isMobile ? (
          <Sheet>
            <SheetTrigger>
              <span className="sr-only">Abrir filtros</span>
              <SlidersHorizontalIcon className="size-4" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <ScrollArea className="h-full p-6">
                <SheetTitle>Filtros</SheetTitle>
                {filterContent}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <h3 className="hidden min-w-[220px] basis-1/5 text-lg font-semibold text-foreground lg:block">
              Filtros
            </h3>
            <Breadcrumb className="hidden lg:block">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink to="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Productos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          <p className="text-sm font-semibold">
            Ordenar<span className="hidden xs:inline"> Por</span>:
          </p>
          <Select
            defaultValue={
              searchParams.get("ordenarPor") ?? SORT_OPTIONS[0]!.value
            }
            onValueChange={value => {
              const sortKey = "ordenarPor"
              setSearchParams(
                prevParams => {
                  if (value === SORT_OPTIONS[0]!.value)
                    prevParams.delete(sortKey)
                  else prevParams.set(sortKey, value)
                  return prevParams
                },
                { preventScrollReset: true }
              )
            }}
          >
            <SelectTrigger
              className="w-[160px]"
              aria-label="Ordenamiento seleccionado"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(({ label, icon: Icon, value }) => (
                <SelectItem value={value} key={value}>
                  {label}{" "}
                  {Icon ? (
                    <Icon className="inline size-4 align-middle" />
                  ) : undefined}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-8">
        {!isMobile && (
          <div className="hidden min-w-[220px] basis-1/5 lg:block">
            {filterContent}
          </div>
        )}
        {children}
      </div>
    </>
  )
}

const PriceFilterSlider = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const minPriceParams = searchParams.get("min")
  const maxPriceParams = searchParams.get("max")
  const defaultPriceValues = [
    minPriceParams ? Number(minPriceParams) : PRICE_FILTER.default[0],
    maxPriceParams ? Number(maxPriceParams) : PRICE_FILTER.default[1]
  ]

  const [priceValues, setPriceValues] = useState(defaultPriceValues)

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  return (
    <>
      <MultipleRangeSlider
        defaultValue={defaultPriceValues}
        min={PRICE_FILTER.default[0]}
        max={PRICE_FILTER.default[1]}
        step={PRICE_FILTER.step}
        minStepsBetweenThumbs={PRICE_FILTER.diff}
        className="py-3"
        value={priceValues}
        onValueChange={range => {
          setPriceValues(range as [number, number])
          if (timeoutRef.current) clearTimeout(timeoutRef.current)

          timeoutRef.current = setTimeout(() => {
            const [newMin, newMax] = range
            // const params = new URLSearchParams(searchParams)
            // if (newMin === PRICE_FILTER.default[0]) params.delete("min")
            // else params.set("min", newMin!.toFixed(2))

            // if (newMax === PRICE_FILTER.default[1]) params.delete("max")
            // else params.set("max", newMax!.toFixed(2))

            // router.replace(pathname + "?" + params.toString(), {
            //   scroll: false
            // })
            setSearchParams(prevParams => {
              if (newMin === PRICE_FILTER.default[0]) prevParams.delete("min")
              else prevParams.set("min", newMin.toFixed(2))

              if (newMax === PRICE_FILTER.default[1]) prevParams.delete("max")
              else prevParams.set("max", newMax.toFixed(2))

              return prevParams
            })
          }, 400)
        }}
      />
      <div className="flex justify-between">
        <span>{formatPrice(priceValues[0]!)}</span>
        <span>{formatPrice(priceValues[1]!)}</span>
      </div>
    </>
  )
}

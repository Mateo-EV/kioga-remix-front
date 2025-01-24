import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { SearchIcon } from "lucide-react"
import { memo, useState } from "react"
import scrollbarStyle from "@/assets/css/scrollbar.module.css"
import useDebouncedState from "@/hooks/use-debounce-state"
import { api } from "@/lib/ky"
import type { Brand, Category, Product } from "@/data/types"
import { Link } from "react-router"

type SearchResult = {
  products: Product[]
  categories: Category[]
  brands: Brand[]
}

function NavbarSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useDebouncedState("", 250)

  const { data, isLoading } = useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      if (search === "") {
        return {
          products: [],
          categories: [],
          brands: []
        }
      }
      return await api<SearchResult>(`search/${search}`).json()
    }
  })

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-transparent"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Buscar Productos</span>
        <SearchIcon className="size-5" aria-hidden="true" />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center border-b px-3">
          <SearchIcon className="mr-2 size-4 shrink-0 opacity-50" />
          <input
            placeholder="Ingrese valor para buscar..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-xs outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <CommandContent
          isLoading={isLoading}
          data={data}
          closeCommandDialog={() => setIsOpen(false)}
        />
      </CommandDialog>
    </>
  )
}

const CommandContent = memo(
  ({
    isLoading,
    data,
    closeCommandDialog
  }: {
    isLoading: boolean
    data?: SearchResult
    closeCommandDialog: () => void
  }) => {
    if (isLoading)
      return (
        <CommandList>
          <CommandGroup heading="Productos">
            <Skeleton
              containerClassName="h-12 w-full block px-2 mb-4"
              className="block h-full"
            />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Categorías">
            <Skeleton
              containerClassName="h-12 w-full block px-2 mb-4"
              className="block h-full"
            />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Marcas">
            <Skeleton
              containerClassName="h-12 w-full block px-2 mb-4"
              className="block h-full"
            />
          </CommandGroup>
        </CommandList>
      )

    return (
      <CommandList className={scrollbarStyle.scrollbar}>
        <CommandGroup heading="Productos">
          {data?.products.map(object => (
            <CommandItem key={object.id} className="gap-2" asChild>
              <Link
                to={`/productos/${object.slug}`}
                viewTransition
                onClick={closeCommandDialog}
              >
                <div className="size-10 rounded-md bg-card/20 p-2">
                  <img
                    src={object.image}
                    alt={object.name}
                    width={32}
                    height={32}
                  />
                </div>
                <span>{object.name}</span>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Categorías">
          {data?.categories.map(object => (
            <CommandItem key={object.id} className="gap-2" asChild>
              <Link
                to={`/productos?categoria=${object.slug}`}
                onClick={closeCommandDialog}
                viewTransition
              >
                <div className="size-10 rounded-md bg-card/20 p-2">
                  <img
                    src={object.image}
                    alt={object.name}
                    width={32}
                    height={32}
                  />
                </div>
                <span>{object.name}</span>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Marcas">
          {data?.brands.map(object => (
            <CommandItem key={object.id} className="gap-2" asChild>
              <Link
                to={`/productos?marca=${object.slug}`}
                onClick={closeCommandDialog}
                viewTransition
              >
                <div className="size-10 rounded-md bg-card/20 p-2">
                  <img
                    src={object.image}
                    alt={object.name}
                    width={32}
                    height={32}
                  />
                </div>
                <span>{object.name}</span>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    )
  }
)

CommandContent.displayName = "CommandContent"

export default NavbarSearch

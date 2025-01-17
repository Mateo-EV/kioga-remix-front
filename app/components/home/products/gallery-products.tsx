"use client";

import axios from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GhostIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GalleryProductsSkeleton from "./gallery-products-skeleton";
import { ProductCard } from "./product-card";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

const LIMIT_REQUEST = 3;

type GalleryProductsProps = {
  url: string;
};

const GalleryProducts = ({ url }: GalleryProductsProps) => {
  const searchParams = useSearchParams();
  const { ref, entry } = useIntersection({
    threshold: 1,
  });
  const [limitterRequests, setLimitterRequests] = useState(0);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products", url, searchParams.toString()],
      queryFn: async ({ pageParam }) => {
        const params = new URLSearchParams(searchParams);
        params.set("cursor", pageParam);

        if (params.has("categoria")) {
          params
            .getAll("categoria")
            .forEach((value) => params.append("category[]", value));
          params.delete("categoria");
        }

        if (params.get("disponibilidad")) {
          params
            .getAll("disponibilidad")
            .forEach((value) => params.append("availability[]", value));
          params.delete("disponibilidad");
        }

        if (params.get("ordenarPor")) {
          params.set("orderBy", params.get("ordenarPor")!);
          params.delete("ordenarPor");
        }

        if (params.has("marca")) {
          params
            .getAll("marca")
            .forEach((value) => params.append("brand[]", value));
          params.delete("marca");
        }

        if (params.get("tipo")) {
          params
            .getAll("tipo")
            .forEach((value) => params.append("subcategory[]", value));
          params.delete("tipo");
        }

        const request = await axios.get<
          CursorPagination<Product & { category: Category; brand: Brand }>
        >(`${url}?${params.toString()}`);

        setLimitterRequests((prev) => prev + 1);

        return request.data;
      },
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.next_cursor,
    });

  useEffect(() => {
    if (entry?.isIntersecting && limitterRequests < LIMIT_REQUEST) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, limitterRequests]);

  const products = data?.pages.flatMap((response) => response.data);

  if (!products) return <GalleryProductsSkeleton />;

  if (products.length === 0)
    return (
      <div className="mt-16 flex flex-1 flex-col items-center gap-2">
        <GhostIcon className="size-16" />
        <h3 className="text-xl font-semibold">Bastante vacio por aquí</h3>
        <p>No hay más productos que ver aquí</p>
      </div>
    );

  return (
    <div className="grid flex-1 animate-opacity-in auto-rows-min grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {limitterRequests < LIMIT_REQUEST ? (
        <div ref={ref} />
      ) : (
        hasNextPage && (
          <Button
            className="col-span-full"
            variant="secondary"
            onClick={() => setLimitterRequests(0)}
          >
            Ver más
          </Button>
        )
      )}
      {isFetchingNextPage && (
        <div className="col-span-full mt-4 flex items-center justify-center">
          <LoadingSpinner className="size-6" />
        </div>
      )}
    </div>
  );
};

export default GalleryProducts;

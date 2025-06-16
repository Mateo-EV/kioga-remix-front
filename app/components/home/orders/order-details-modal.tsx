"use client"

import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  OrderStatusDataBar,
  OrderStatusFillColor,
  OrderStatusStrokeColor,
  OrderStatusTextColor,
  type OrderResponse
} from "@/data/types"
import { useModal } from "@/hooks/use-modal"
import getEnv from "@/lib/env"
import { cn, formatPrice } from "@/lib/utils"
import { InfoIcon, Package2Icon, TruckIcon } from "lucide-react"
import { memo, useEffect, useState } from "react"
import { Link } from "react-router"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

type ModalOrderDetails = {
  type: "order-details"
  data: OrderResponse
}

export default function OrderDetailsModal() {
  const { type, data, isOpen, close } = useModal()

  const isModalOpen = type === "order-details" && isOpen

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={v => {
        if (!v) close()
      }}
    >
      <OrderDetailsModalContent order={data} />
    </Dialog>
  )
}

const OrderDetailsModalContent = memo(
  ({ order }: { order: ModalOrderDetails["data"] | null }) => {
    if (order === null) return

    return (
      <DialogContent>
        <Tabs defaultValue="default">
          <DialogHeader>
            <TabsList className="my-2 grid w-full grid-cols-2">
              <TabsTrigger value="default">Detalle del Pedido</TabsTrigger>
              <TabsTrigger value="address">Datos de Contacto</TabsTrigger>
            </TabsList>
          </DialogHeader>
          <TabsContent value="default">
            <OrdersDetailsModalContentDefault order={order} />
          </TabsContent>
          <TabsContent value="address">
            <DialogDescription className="mb-4">
              Datos de Contacto:
            </DialogDescription>
            <div className="grid grid-cols-2 gap-4">
              <Input disabled value={order.address.firstName} />
              <Input disabled value={order.address.lastName} />
              <Input disabled value={order.address.dni} />
              <Input disabled value={order.address.phone} />
              {order.isDelivery && (
                <>
                  <Input disabled value={order.address.department} />
                  <Input disabled value={order.address.province} />
                  <Input disabled value={order.address.district} />
                  <Input disabled value={order.address.zipCode} />
                  <Input
                    disabled
                    value={order.address.streetAddress}
                    className="col-span-2"
                  />
                  {order.address.reference && (
                    <Textarea
                      value={order.address.reference}
                      disabled
                      className="col-span-2 resize-none"
                    />
                  )}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    )
  }
)
OrderDetailsModalContent.displayName = "OrderDetailsModalContent"

const backendUrl = getEnv().BACKEND_URL

const OrdersDetailsModalContentDefault = ({
  order
}: {
  order: ModalOrderDetails["data"]
}) => {
  const [isChartVisible, setIsChartVisible] = useState(false)
  useEffect(() => {
    setIsChartVisible(false)
    if (order) {
      const timeout = setTimeout(() => {
        setIsChartVisible(true)
      }, 150)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [order])

  const dataBar = OrderStatusDataBar[order.status]
  const fillColor = OrderStatusFillColor[order.status]
  const strokeColor = OrderStatusStrokeColor[order.status]
  const textColor = OrderStatusTextColor[order.status]

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-4">
      <Card className="row-span-3">
        <Carousel>
          <CarouselContent>
            {order.orderProducts.map(detail => (
              <CarouselItem key={detail.productId}>
                <div className="relative p-1">
                  <img
                    src={backendUrl + detail.product.image}
                    alt={detail.product.slug}
                    width={200}
                    height={200}
                    className="size-full"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="absolute right-1 top-1 p-1 opacity-80 hover:opacity-100">
                        <InfoIcon className="size-4" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <h4 className="font-medium leading-none">
                        {detail.product.name}
                      </h4>
                      <Link
                        to={`/productos/${detail.product.slug}`}
                        className={buttonVariants({
                          variant: "link",
                          size: "sm",
                          className: "pl-0"
                        })}
                      >
                        Ver Producto
                      </Link>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium leading-none">
                            Precio Unitario Actual
                          </span>
                          <span className="text-sm leading-none text-muted-foreground">
                            {formatPrice(
                              detail.product.price -
                                detail.product.price * detail.product.discount
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium leading-none">
                            Costo Unitario
                          </span>
                          <span className="text-sm leading-none text-muted-foreground">
                            {formatPrice(detail.unitAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium leading-none">
                            Cantidad
                          </span>
                          <span className="text-sm leading-none text-muted-foreground">
                            {detail.quantity}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium leading-none">
                            Costo Total
                          </span>
                          <span className="text-sm leading-none text-muted-foreground">
                            {formatPrice(detail.unitAmount * detail.quantity)}
                          </span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      </Card>
      <div className="relative row-span-2">
        {isChartVisible && (
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="pointer-events-none"
            key={order.id}
          >
            <PieChart>
              <Pie
                data={dataBar as unknown as any[]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={55}
                startAngle={90}
                endAngle={450}
                className={cn("pointer-events-none", strokeColor)}
              >
                <Cell
                  className={cn(fillColor, strokeColor)}
                  fill="currentColor"
                  stroke="currentColor"
                />
                <Cell fill="transparent" stroke="transparent" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}

        {order.isDelivery ? (
          <TruckIcon
            className={cn(
              "absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2",
              textColor
            )}
            strokeWidth={0.75}
          />
        ) : (
          <Package2Icon
            className={cn(
              "absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2",
              textColor
            )}
            strokeWidth={0.75}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className={cn("text-3xl font-semibold", textColor)}>
          {formatPrice(order.amount)}
        </p>
        <p className="text-xs text-muted-foreground">
          Envío: {formatPrice(order.shippingAmount)}
        </p>
      </div>
    </div>
  )
}

"use client"

import { type ColumnDef, type Row } from "@tanstack/react-table"
import { CopyIcon, EllipsisIcon, ReceiptTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps {
  row: Row<OrderResponse>
}

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/utils"
import { DataTableColumnHeader } from "../datatable/data-table-column-header"
import {
  OrderStatusVariants,
  OrderTraductorStatus,
  type OrderResponse,
  type OrderStatus
} from "@/data/types"
import { useModal } from "@/hooks/use-modal"
import { formatToDate, formatToTime } from "@/lib/date"

export const columns = [
  {
    id: "Code",
    accessorFn: ({ id }) => {
      return "P" + id.toString().padStart(8, "0")
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ getValue }) => (
      <div className="w-[80px]">{getValue<string>()}</div>
    ),
    enableHiding: false
  },
  {
    id: "productos",
    accessorFn: ({ orderProducts }) =>
      orderProducts.reduce((acc, curr) => acc + curr.quantity, 0),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Productos" />
    ),
    cell: ({ getValue }) => {
      return <div className="w-[40px]">{getValue<number>()}</div>
    }
  },
  {
    id: "importe",
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Importe" />
    ),
    cell: ({ getValue, row }) => (
      <>
        <span className="block">{formatPrice(getValue<number>())}</span>
        {row.original.isDelivery && (
          <span className="block text-sm text-muted-foreground">
            Envío: {formatPrice(row.original.shippingAmount)}
          </span>
        )}
      </>
    )
  },
  {
    id: "estado",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ getValue }) => (
      <Badge variant={OrderStatusVariants[getValue<OrderStatus>()]}>
        {OrderTraductorStatus[getValue<OrderStatus>()]}
      </Badge>
    )
  },
  {
    id: "fecha",
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => (
      <Input
        type="date"
        value={formatToDate(row.original.createdAt)}
        className="disabled:cursor-auto"
        disabled
      />
    )
  },
  {
    id: "hora",
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora" />
    ),
    cell: ({ row }) => (
      <Input
        type="time"
        value={formatToTime(row.original.createdAt)}
        className="disabled:cursor-auto"
        disabled
      />
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
] satisfies ColumnDef<OrderResponse>[]

function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { open } = useModal()
  const order = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          className="gap-2"
          onClick={() => navigator.clipboard.writeText(order.code)}
        >
          <CopyIcon className="size-4" />
          <span>Copiar</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => open({ type: "order-details", data: order })}
        >
          <ReceiptTextIcon className="size-4" />
          <span>Detalles</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

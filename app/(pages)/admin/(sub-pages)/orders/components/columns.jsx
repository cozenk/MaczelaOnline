"use client";

import { formatDate, formatPrice } from "@utils/formatters";
import { CellAction } from "./CellAction";
import Link from "next/link";
import { Badge } from "(pages)/admin/components/ui/badge";

export const columns = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      const getVariant = () => {
        if (status === "PLACED") return "destructive";
        if (status === "CONFIRMED") return "outline";
        if (status === "DELIVERED") return "success";
        return "secondary";
      };

      return (
        <Badge variant={getVariant()}>
          {status === "PLACED" ? "TO CONFIRM" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_completed",
    header: "Is Paid?",
    cell: ({ row }) => {
      const is_completed = row.getValue("is_completed");

      const getVariant = () => {
        if (is_completed) return "success";
        return "secondary";
      };

      return (
        <Badge variant={getVariant()}>{is_completed ? "YES" : "NO"}</Badge>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("customer");
      return (
        <Link
          href={`/admin/users/?highlight=${customer.id}`}
          className="cursor-pointer underline hover:text-gray-400"
        >
          {customer.full_name || customer.email}
        </Link>
      );
    },
  },
  {
    accessorKey: "shipping_address",
    header: "Shipping Address",
  },
  {
    accessorKey: "placed_date",
    header: "Placed at",
    cell: ({ row }) => {
      return formatDate(row.getValue("placed_date"));
    },
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => {
      return formatPrice(row.getValue("total_price"));
    },
  },
  {
    accessorKey: "total_items",
    header: "Total Items",
    cell: ({ row }) => {
      return row.getValue("total_items");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellAction row={row} />;
    },
  },
];

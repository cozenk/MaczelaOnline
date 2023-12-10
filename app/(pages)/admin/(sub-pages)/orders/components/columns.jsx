"use client";

import { formatDate } from "@utils/date";
import { CellAction } from "./cell-action";

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

      return status === "PLACED" ? "TO CONFIRM" : status;
    },
  },
  {
    accessorKey: "is_completed",
    header: "Is Paid?",
    cell: ({ row }) => {
      const is_completed = row.getValue("is_completed");

      return is_completed ? "YES" : "NO";
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("customer");
      return (
        <p className="cursor-pointer underline hover:text-gray-400">
          {customer.full_name || customer.email}
        </p>
      );
    },
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
      return `₱${parseFloat(row.getValue("total_price")).toLocaleString()}`;
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

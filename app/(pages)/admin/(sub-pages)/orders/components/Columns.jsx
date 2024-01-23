"use client";

import { formatDate, formatPrice } from "@utils/formatters";
import { CellAction } from "./CellAction";
import Link from "next/link";
import { Badge } from "(pages)/admin/components/ui/badge";
import UpdateOrder from "./modals/UpdateOrder";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "(pages)/admin/components/ui/hover-card";

export const columns = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false);

      const status = row.getValue("status");
      const order = row.original;

      const getVariant = () => {
        if (status === "PLACED") return "destructive";
        if (status === "PREPARING") return "secondary";
        if (status === "DELIVERED") return "success";
        return "outline";
      };

      return (
        <>
          <UpdateOrder
            show={showUpdateOrderModal}
            onClose={() => setShowUpdateOrderModal(false)}
            order={order}
          />

          <Badge
            onClick={() => setShowUpdateOrderModal(true)}
            className={"modal-trigger cursor-pointer text-center"}
            variant={getVariant()}
          >
            {status === "PLACED" ? "TO CONFIRM" : status}
          </Badge>
        </>
      );
    },
  },
  {
    accessorKey: "is_completed",
    header: "Is Paid?",
    cell: ({ row }) => {
      const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false);

      const order = row.original;

      const is_completed = row.getValue("is_completed");

      const getVariant = () => {
        if (is_completed) return "success";
        return "secondary";
      };

      return (
        <>
          <UpdateOrder
            show={showUpdateOrderModal}
            onClose={() => setShowUpdateOrderModal(false)}
            order={order}
          />
          <Badge
            className={"cursor-pointer"}
            onClick={() => setShowUpdateOrderModal(true)}
            variant={getVariant()}
          >
            {is_completed ? "YES" : "NO"}
          </Badge>
        </>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("customer");
      return (
        <HoverCard openDelay={200}>
          <HoverCardTrigger>
            <div
              // href={`/admin/users/?highlight=${customer.id}`}
              className="cursor-pointer underline hover:text-gray-400"
            >
              {customer.full_name}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="space-y-1 text-base">
            <div>
              Customer: <span>{customer.full_name}</span>
            </div>
            <div>
              Contact: <span>{customer.mobile_number}</span>
            </div>
            <div>
              Email: <span>{customer.email}</span>
            </div>
            <div>
              Orders count: <span>{customer.orders_count}</span>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "delivery_address",
    header: "Delivery Address",
  },
  {
    accessorKey: "notes",
    header: "ID Number",
    cell: ({ row }) => {
      return row.getValue("notes") ? (
        <span className="italic">"{row.getValue("notes")}"</span>
      ) : null;
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
    accessorKey: "completion_date",
    header: "Completed at",
    cell: ({ row }) => {
      return formatDate(row.getValue("completion_date"));
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

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "(pages)/admin/components/ui/dropdown-menu";
import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "(pages)/admin/components/ui/button";
import Modal from "@shared/Modal";
import Image from "next/image";
import { deleteOrderAction } from "../actions";

export const CellAction = ({ row = null }) => {
  const order = row.original;

  const [modals, setModals] = useState({
    showOrderItems: false,
    showEditOrder: false,
  });

  const showOrderItemsModal = () =>
    setModals((modals) => ({
      ...modals,
      showOrderItems: true,
    }));

  const closeOrderItemsModal = () =>
    setModals((modals) => ({
      ...modals,
      showOrderItems: false,
    }));

  return (
    <>
      <Modal show={modals.showOrderItems} onClose={closeOrderItemsModal}>
        <div className="flex w-full flex-col gap-y-6">
          <div>
            <div>
              Total price:{" "}
              <span>
                ₱{parseFloat(order.total_price).toLocaleString()} (+ Shipping
                fee)
              </span>
            </div>
            <div>
              Total items: <span>x{order.total_items}</span>
            </div>
          </div>

          {order.items.map((item) => (
            <div className="item flex items-end justify-between">
              <div className="flex flex-col ">
                <Image
                  src={item.image_url}
                  width={100}
                  height={100}
                  className="h-[5rem] w-[5rem] rounded-md object-cover"
                />
                <div className="flex gap-x-4">
                  <h2>{item.name}</h2>
                  <span>x{item.quantity}</span>
                </div>
              </div>
              <div>
                ₱{parseFloat(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="modal-trigger"
            onClick={showOrderItemsModal}
          >
            <Edit className="mr-2 h-4 w-4" />
            View Items
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              const ordersRows = document.getElementById("orders-rows");

              const currentRow = ordersRows.children[row.index];

              const pendingClasses = [
                "pointer-events-none",
                "bg-gray-500/30",
                "opacity-30",
                "backdrop-blur-2xl",
                "hover:!bg-gray-500/30",
              ];

              if (
                confirm(
                  `Are you sure you want to delete ${
                    order.customer.full_name || order.customer.email
                  }'s order?`,
                ) == true
              ) {
                pendingClasses.forEach(function (twClass) {
                  currentRow.classList.add(twClass);
                });
                await deleteOrderAction(order.id);
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

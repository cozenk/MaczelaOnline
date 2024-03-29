"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "(pages)/admin/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@shared/Button";
import Modal from "@shared/Modal";
import Image from "next/image";

import { deleteOrderAction } from "../actions";
import { formatPrice } from "@utils/formatters";
import UpdateOrder from "./modals/UpdateOrder";
import { useCurrentUser } from "@shared/hooks";

export const CellAction = ({ row = null }) => {
  const { isLoading, user } = useCurrentUser();

  const order = row.original;

  const [modals, setModals] = useState({
    showOrderItems: false,
    showUpdateOrder: false,
  });

  const showOrderItemsModal = () =>
    setModals((modals) => ({
      ...modals,
      showOrderItems: true,
    }));

  const showUpdateOrderModal = () =>
    setModals((modals) => ({
      ...modals,
      showUpdateOrder: true,
    }));

  const closeOrderItemsModal = () =>
    setModals((modals) => ({
      ...modals,
      showOrderItems: false,
    }));

  const closeUpdateOrderModal = () =>
    setModals((modals) => ({
      ...modals,
      showUpdateOrder: false,
    }));

  const calculatePriceWithAddOns = (item) => {
    const addonsString = item.add_ons;

    const regex = /\(\+₱(\d+)\)/g;
    const prices = [];
    let match;

    while ((match = regex.exec(addonsString)) !== null) {
      prices.push(parseInt(match[1], 10));
    }

    return (
      parseFloat(item.price) +
      prices.reduce((total, addon) => total + addon, 0) +
      50
    );
  };

  return (
    <>
      <Modal show={modals.showOrderItems} onClose={closeOrderItemsModal}>
        <div className="flex w-full flex-col gap-y-6">
          <div>
            <div>
              Total price:{" "}
              <span>{formatPrice(order.total_price)} (+ Delivery fee)</span>
            </div>
            <div>
              Total items: <span>x{order.total_items}</span>
            </div>
          </div>

          {order.items.map((item) => (
            <div
              key={Math.random()}
              className="item flex items-end justify-between"
            >
              <div className="flex flex-col ">
                <Image
                  src={item.image_url}
                  width={100}
                  height={100}
                  className="h-[5rem] w-[5rem] rounded-md object-cover"
                />
                <div className="flex gap-x-4 text-base">
                  <h2>
                    {item.name} ({item.size})
                  </h2>
                  <span>{formatPrice(item.price)}</span>
                  <span>x{item.quantity}</span>
                </div>
                {item.add_ons?.length > 0 ? (
                  <p className="whitespace-pre text-sm">{item.add_ons}</p>
                ) : null}
              </div>
              <div>
                {item.add_ons?.length
                  ? formatPrice(calculatePriceWithAddOns(item))
                  : formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <UpdateOrder
        show={modals.showUpdateOrder}
        onClose={closeUpdateOrderModal}
        order={order}
      />

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
            className="modal-trigger"
            onClick={showUpdateOrderModal}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update Order
          </DropdownMenuItem>

          {!isLoading && user?.role === "ADMIN" && (
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

                  setTimeout(() => {
                    pendingClasses.forEach(function (twClass) {
                      currentRow.classList.remove(twClass);
                    });
                  }, 500);
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4 " />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

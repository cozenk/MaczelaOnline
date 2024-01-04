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

import { Button } from "(pages)/admin/components/ui/button";
import Modal from "@shared/Modal";
import Image from "next/image";
import { useFormState } from "react-dom";

import { deleteOrderAction, updateOrderInfo } from "../actions";
import SubmitButton from "@shared/EditUserInfo/SubmitButton";
import { formatPrice } from "@utils/formatters";
import { useRouter } from "next/navigation";

export const CellAction = ({ row = null }) => {
  const order = row.original;

  const router = useRouter();

  const [state, formAction] = useFormState(updateOrderInfo, {
    infoSaved: false,
  });

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

  useEffect(() => {
    if (state.infoSaved) {
      closeUpdateOrderModal();
      router.refresh();

      state.infoSaved = false;
    }
  }, [state.infoSaved]);

  return (
    <>
      <Modal show={modals.showOrderItems} onClose={closeOrderItemsModal}>
        <div className="flex w-full flex-col gap-y-6">
          <div>
            <div>
              Total price:{" "}
              <span>{formatPrice(order.total_price)} (+ Shipping fee)</span>
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
                  <h2>
                    {item.name} ({item.size})
                  </h2>
                  <span>{formatPrice(item.price)}</span>
                  <span>x{item.quantity}</span>
                </div>
              </div>
              <div>{formatPrice(item.price * item.quantity)}</div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal show={modals.showUpdateOrder} onClose={closeUpdateOrderModal}>
        <header className="mb-10 text-xl font-bold uppercase">
          Edit Order
        </header>
        <form action={formAction} className="mx-auto ">
          <div className="mb-5 w-96 gap-x-6 gap-y-3 ">
            <input
              type="hidden"
              id="order_id"
              name="order_id"
              value={order.id}
            />

            <div>
              Status:{" "}
              <select
                name="order_status"
                id="order_status"
                className="w-28 dark:bg-black"
                defaultValue={order.status}
              >
                <option value={"PLACED"}>TO CONFIRM</option>
                <option value={"CONFIRMED"}>CONFIRMED</option>
                <option value={"PREPARING"}>PREPARING</option>
                <option value={"OTW"}>OTW</option>
                <option value={"DELIVERED"}>DELIVERED</option>
              </select>
            </div>

            <div>
              Is paid:{" "}
              <select
                name="is_completed"
                id="is_completed"
                className="w-28 dark:bg-black"
                defaultValue={order.is_completed}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <SubmitButton
            disabled={!state.infoSaved && !state.infoSaved === undefined}
          />
        </form>
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
            className="modal-trigger"
            onClick={showUpdateOrderModal}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update Order
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

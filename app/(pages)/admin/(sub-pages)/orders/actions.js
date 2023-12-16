"use server";

import { deleteOrder, updateOrder } from "@utils/orders";
import { revalidatePath } from "next/cache";

export async function updateOrderInfo(prevState, formData) {
  if (formData) {
    const orderId = formData.get("order_id");
    const order_status = formData.get("order_status");
    const is_completed = formData.get("is_completed");

    const newOrderInfo = {
      status: order_status,
      is_completed,
    };

    try {
      await updateOrder(orderId, newOrderInfo);

      revalidatePath("/");
      revalidatePath("/admin/orders");

      return {
        infoSaved: true,
        isError: false,
      };
    } catch (error) {
      console.error(error);

      return {
        infoSaved: false,
        isError: true,
      };
    }
  }

  return {
    infoSaved: false,
    isError: true,
  };
}

export async function deleteOrderAction(id) {
  try {
    await deleteOrder(id);

    revalidatePath("/admin/orders");

    return {
      orderDeleted: true,
      isError: false,
    };
  } catch (error) {
    return {
      orderDeleted: false,
      isError: true,
    };
  }
}

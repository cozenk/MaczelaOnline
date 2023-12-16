"use server";

import { deleteOrder } from "@utils/orders";
import { revalidatePath } from "next/cache";

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

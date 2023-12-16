"use server";

import { createOrder } from "@utils/orders";
import { revalidatePath } from "next/cache";

export async function submitOrder(cartItems = [], prevState, formData) {
  if (cartItems.length && formData) {
    const userId = formData.get("user_id");
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const mobileNumber = formData.get("mobile_number");
    const email = formData.get("email");

    const totalPrice = formData.get("total_price");
    const totalItems = formData.get("total-items");

    const contactInformation = {
      userId,
      firstName,
      lastName,
      mobileNumber,
      email,
    };

    const createdOrder = await createOrder(userId, {
      cartItems,
      totalPrice,
      totalItems,
    });

    revalidatePath("/my-orders");

    if (createdOrder)
      return {
        orderSubmitted: true,
        isError: false,
      };

    return {
      orderSubmitted: false,
      isError: true,
    };
  }

  return {
    orderSubmitted: false,
    isError: true,
  };
}

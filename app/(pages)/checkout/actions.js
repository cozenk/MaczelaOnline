"use server";

import { createOrder } from "@utils/orders";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitOrder(cartItems = [], prevState, formData) {
  if (cartItems.length && formData) {
    const userId = formData.get("user-id");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const mobileNumber = formData.get("mobile-number");
    const email = formData.get("email");

    const totalPrice = formData.get("total-price");
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

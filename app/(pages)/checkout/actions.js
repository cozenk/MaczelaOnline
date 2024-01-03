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

    const street_address = formData.get("street_address");
    const city = formData.get("city");
    const province = formData.get("province");
    const postal_code = formData.get("postal_code");

    const contactInformation = {
      userId,
      firstName,
      lastName,
      mobileNumber,
      email,
    };

    const shippingInformation = {
      street_address,
      city: "Marikina",
      province: "Rizal",
      postal_code: "1800",
    };

    const shippingAddress = `${shippingInformation.street_address}, ${shippingInformation.city}, ${shippingInformation.province}, ${shippingInformation.postal_code}`;

    const createdOrder = await createOrder(userId, {
      cartItems,
      totalPrice,
      totalItems,
      shippingAddress,
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

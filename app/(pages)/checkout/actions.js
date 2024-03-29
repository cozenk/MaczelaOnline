"use server";

import { createOrder } from "@utils/orders";
import { updateUserInfo } from "@utils/users";
import { revalidatePath } from "next/cache";

export async function submitOrder(cartItems = [], prevState, formData) {
  if (cartItems.length && formData) {
    const userId = formData.get("user_id");
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const mobileNumber = formData.get("mobile_number");
    const email = formData.get("email");

    const notes = formData.get("notes");
    const totalPrice = formData.get("total_price");
    const totalItems = formData.get("total-items");

    const complete_address = formData.get("complete_address");
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

    const deliveryInformation = {
      complete_address,
      city: "Marikina",
      province: "Rizal",
      postal_code: "1800",
    };

    const deliveryAddress = `${deliveryInformation.complete_address}, ${deliveryInformation.city}, ${deliveryInformation.province}, ${deliveryInformation.postal_code}`;

    const createdOrder = await createOrder(userId, {
      cartItems,
      totalPrice,
      totalItems,
      deliveryAddress,
      notes,
    });

    updateUserInfo(userId, {
      mobile_number: contactInformation.mobileNumber,
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

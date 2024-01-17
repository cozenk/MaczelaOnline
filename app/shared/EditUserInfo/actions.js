"use server";

import { updateUserInfo } from "@utils/users";
import { revalidatePath } from "next/cache";

export async function saveUserInfo(prevState, formData) {
  if (formData) {
    const user_id = formData.get("user_id");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const mobile_number = formData.get("mobile_number").replace(/\s/g, "");

    const email = formData.get("email");

    const complete_address = formData.get("complete_address");
    const city = formData.get("city");
    const province = formData.get("province");
    const postal_code = formData.get("postal_code");

    const newUserInfo = {
      first_name,
      last_name,
      mobile_number,
      email,
    };

    const newShippingAddress = {
      complete_address,
      city: "Marikina",
      province: "Rizal",
      postal_code: "1800",
    };

    try {
      await updateUserInfo(user_id, {
        ...newUserInfo,
        ...newShippingAddress,
      });

      revalidatePath("/");
      revalidatePath("/admin/users");

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

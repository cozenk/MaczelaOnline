"use server";
// TODO: Call SQL Queries from @utils

import { createPizza } from "@utils/pizza";
import { revalidatePath } from "next/cache";

export async function savePizzaInfo(prevState, formData) {
  if (formData) {
    const name = formData.get("name");
    const imageUrl = formData.get("image_url");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const size = formData.get("size");


    const newInfo = {
        name,
        imageUrl,
        category,
        description,
        price,
        size,
    };

    try {
      await createPizza(newInfo);

      revalidatePath("/");
      revalidatePath("/admin/products");

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

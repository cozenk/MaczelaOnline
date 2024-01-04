"use server";
// TODO: Call SQL Queries from @utils

import { createPizza, updatePizza, deletePizza } from "@utils/pizza";
import {
  createPizzaVariant,
  deleteAllPizzaVariants,
} from "@utils/pizza_variant";
import { revalidatePath } from "next/cache";

export async function addNewPizza(variants = [], prevState, formData) {
  if (formData) {
    const name = formData.get("name");
    const image_url = formData.get("image_url");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const size = formData.get("size");

    const newInfo = {
      name,
      image_url,
      category,
      description,
      price,
      size,
    };

    try {
      const { id } = await createPizza(newInfo);
      if (variants.length) {
        const createdPizzaVariants = Promise.all(
          variants.map(async (variant) => {
            createPizzaVariant({
              pizza_id: id,
              name: variant.name,
              price: variant.price,
            });
          }),
        );

        await createdPizzaVariants;
      }

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

export async function updatePizzaInfo(variants = [], prevState, formData) {
  if (formData) {
    const pizzaId = formData.get("pizza_id");
    const name = formData.get("name");
    const image_url = formData.get("image_url");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const size = formData.get("size");

    const newPizzaInfo = {
      name,
      image_url,
      category,
      description,
      price,
      size,
    };

    try {
      const { id } = await updatePizza(pizzaId, newPizzaInfo);
      if (variants.length) {
        await deleteAllPizzaVariants(id);

        const updatedPizzaVariants = Promise.all(
          variants.map(async (variant) => {
            createPizzaVariant({
              pizza_id: id,
              name: variant.name,
              price: variant.price,
            });
          }),
        );

        await updatedPizzaVariants;

        revalidatePath("/");
        revalidatePath(`/pizza/${id}`);
        revalidatePath("/admin/products");

        return {
          infoSaved: true,
          isError: false,
        };
      } else {
        await deleteAllPizzaVariants(id);

        revalidatePath("/");
        revalidatePath(`/pizza/${id}`);
        revalidatePath("/admin/products");

        return {
          infoSaved: true,
          isError: false,
        };
      }
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

export async function deletePizzaInfo(pizzaId, name) {
  try {
    await deletePizza(pizzaId);

    revalidatePath("/");
    revalidatePath("/admin/products");

    return {
      infoSaved: true,
      isError: false,
    };
  } catch (error) {
    return {
      infoSaved: false,
      isError: true,
    };
  }
}

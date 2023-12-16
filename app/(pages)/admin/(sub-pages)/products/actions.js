"use server";
// TODO: Call SQL Queries from @utils

import { createPizza, updatePizza, deletePizza } from "@utils/pizza";
import {
  createPizzaVariant,
  deletePizzaVariant,
  updatePizzaVariant,
} from "@utils/pizza_variant";
import { revalidatePath } from "next/cache";

export async function savePizzaInfo(prevState, formData) {
  if (formData) {
    const name = formData.get("name");
    const image_url = formData.get("image_url");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const size = formData.get("size");
    const variant = formData.get("variant");

    const newInfo = {
      name,
      image_url,
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

export async function updatePizzaInfo(prevState, formData) {
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
      await updatePizza(pizzaId, newPizzaInfo);

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

// Variants Actions

export async function saveVariantInfo(prevState, formData) {
  if (formData) {
    const name = formData.get("name");
    const price = formData.get("price");
    const pizza_id = formData.get("pizza_id");

    const newInfo = {
      name,
      price,
      pizza_id,
    };

    try {
      await createPizzaVariant(newInfo);

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

export async function updateVariantInfo(prevState, formData) {
  if (formData) {
    const name = formData.get("name");
    const price = formData.get("price");
    const pizza_id = formData.get("pizza_id");

    const newInfo = {
      name,
      price,
      pizza_id,
    };

    try {
      await updatePizzaVariant(pizzaId, newInfo);

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

export async function deleteVariantInfo(id, name) {
  try {
    await deletePizzaVariant(id);

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
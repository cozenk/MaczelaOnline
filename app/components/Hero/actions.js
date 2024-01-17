"use server";

import { updateMainText, updateSubText } from "@utils/hero_content";
import { revalidatePath } from "next/cache";

export const updateMainTextAction = async (newMainText = "") => {
  await updateMainText(newMainText);
  revalidatePath("/");
};

export const updateSubTextAction = async (newSubText = "") => {
  await updateSubText(newSubText);
  revalidatePath("/");
};

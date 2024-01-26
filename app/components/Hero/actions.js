"use server";

import {
  updateBrandIcon,
  updateHeroMainText,
  updateHeroSubText,
  updateHomeBgUrl,
} from "@utils/cms";
import { revalidatePath } from "next/cache";

export const updateHeroMainTextAction = async (newMainText = "") => {
  await updateHeroMainText(newMainText);
  revalidatePath("/");
};

export const updateHeroSubTextAction = async (newSubText = "") => {
  await updateHeroSubText(newSubText);
  revalidatePath("/");
};

export const updateBrandIconAction = async (newBrandIcon = "") => {
  await updateBrandIcon(newBrandIcon);
  revalidatePath("/");
};

export const updateHomeBgUrlAction = async (newHomeBgUrl = "") => {
  await updateHomeBgUrl(newHomeBgUrl);
  revalidatePath("/");
};

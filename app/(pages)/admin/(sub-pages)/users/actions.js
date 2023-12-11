"use server";

import { clerkClient } from "@clerk/nextjs";
import { makeUserAdmin } from "@utils/users";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(clerkId) {
  await clerkClient.users.deleteUser(clerkId);

  revalidatePath("/");
  revalidatePath("/admin/users");
}

export async function makeUserAdminAction(userId) {
  await makeUserAdmin(userId);

  revalidatePath("/admin/users");
}

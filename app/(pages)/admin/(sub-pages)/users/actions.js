"use server";

import { clerkClient } from "@clerk/nextjs";
import { makeUserAdmin, updateUserRole } from "@utils/users";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(clerkId) {
  await clerkClient.users.deleteUser(clerkId);

  revalidatePath("/");
  revalidatePath("/admin/users");
}

export async function updateUserRoleAction(prevState, formData) {
  const userId = formData.get("user_id");
  const role = formData.get("role");

  if (userId && role) {
    await updateUserRole(userId, role);

    revalidatePath("/");
    revalidatePath("/admin/users");

    return {
      infoSaved: true,
    };
  } else throw new Error("userId and role cannot be empty");
}

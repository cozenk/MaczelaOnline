import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllCustomers, getAllUsers, getCurrentUser } from "@utils/users";
import { UsersTable } from "./components/Table";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminUsers({ searchParams }) {
  const currentUser = await getCurrentUser();

  if (currentUser?.role === "DELIVERY_RIDER") redirect("/");

  const getData = async () => {
    if (currentUser?.role === "STAFF") return await getAllCustomers();

    return await getAllUsers(
      searchParams?.role
        ? {
            role: searchParams?.role,
          }
        : {},
    );
  };

  return (
    <TabsContent value="users" className="pt-8">
      <UsersTable data={await getData()} />
    </TabsContent>
  );
}

import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllCustomers, getAllUsers, getCurrentUser } from "@utils/users";
import { DataTable as UsersTable } from "(pages)/admin/components/ui/data-table";
import { columns } from "./components/Columns";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminUsers() {
  const currentUser = await getCurrentUser();

  if (currentUser.role === "DELIVERY_RIDER") redirect("/");

  const getData = async () => {
    if (currentUser.role === "STAFF") return await getAllCustomers();

    return await getAllUsers();
  };

  return (
    <TabsContent value="users" className="pt-8">
      <div className="space-y-8">
        <UsersTable columns={columns} data={await getData()} />
      </div>
    </TabsContent>
  );
}

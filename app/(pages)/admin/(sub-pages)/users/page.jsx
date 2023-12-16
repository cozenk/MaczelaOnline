import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllUsers } from "@utils/users";
import { DataTable as UsersTable } from "(pages)/admin/components/ui/data-table";
import { columns } from "./components/Columns";

export const dynamic = "force-dynamic";

export default async function AdminUsers() {
  const users = await getAllUsers();

  return (
    <TabsContent value="users" className="pt-8">
      <div className="space-y-8">
        <UsersTable columns={columns} data={users} />
      </div>
    </TabsContent>
  );
}

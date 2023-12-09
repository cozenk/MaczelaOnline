import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllUsers } from "@utils/users";
import UsersTable from "./components/table";

export default async function AdminUsers() {
  const users = await getAllUsers();

  return (
    <TabsContent value="users" className="pt-8">
      <div className="space-y-8">
        <UsersTable users={users} />
      </div>
    </TabsContent>
  );
}

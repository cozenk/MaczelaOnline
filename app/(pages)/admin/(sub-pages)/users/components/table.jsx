import { columns } from "./columns";
import { DataTable } from "(pages)/admin/components/ui/data-table";

export default function UsersTable({ users }) {
  return <DataTable columns={columns} data={users} />;
}

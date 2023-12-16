import { DataTable as OrdersTable } from "(pages)/admin/components/ui/data-table";
import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllOrders } from "@utils/orders";
import { columns } from "./components/Columns";

export default async function AdminOrders() {
  const orders = await getAllOrders();

  return (
    <TabsContent value="orders" className="pt-8">
      <div className="space-y-8">
        <OrdersTable tbodyId="orders-rows" columns={columns} data={orders} />
      </div>
    </TabsContent>
  );
}

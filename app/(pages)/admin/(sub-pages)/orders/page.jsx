import { OrdersTable } from "./components/Table";
import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllOrders } from "@utils/orders";

export const dynamic = "force-dynamic";

export default async function AdminOrders({ searchParams }) {
  const orders = await getAllOrders({
    status: searchParams?.orderStatus,
    payment_status: searchParams?.paymentStatus,
  });

  return (
    <TabsContent value="orders">
      <div className="space-y-6">
        <OrdersTable orders={orders} />
      </div>
    </TabsContent>
  );
}

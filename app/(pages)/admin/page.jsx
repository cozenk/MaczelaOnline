import { TabsContent } from "./components/ui/tabs";

import Overview from "./components/overview";
import { getCurrentUser } from "@utils/users";
import { redirect } from "next/navigation";
import { getMonthlySales } from "@utils/sales";

export default async function AdminOverview({ searchParams }) {
  const salesFilter = searchParams.salesFilter || "DAILY";

  const currentUser = await getCurrentUser();
  const monthlySales = await getMonthlySales();

  if (currentUser.role === "DELIVERY_RIDER") redirect("/");

  return (
    <TabsContent value="overview" className="space-y-4">
      <Overview salesFilter={salesFilter} monthlySales={monthlySales} />
    </TabsContent>
  );
}

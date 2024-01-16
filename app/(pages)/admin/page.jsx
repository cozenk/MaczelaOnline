import { TabsContent } from "./components/ui/tabs";

import Overview from "./components/overview";
import { getCurrentUser } from "@utils/users";
import { redirect } from "next/navigation";

export default async function AdminOverview() {
  const currentUser = await getCurrentUser();

  if (currentUser.role === "DELIVERY_RIDER") redirect("/");

  return (
    <TabsContent value="overview" className="space-y-4">
      <Overview />
    </TabsContent>
  );
}

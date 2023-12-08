import { TabsContent } from "./components/ui/tabs";

import Overview from "./components/overview";

export default function AdminOverview() {
  return (
    <TabsContent value="overview" className="space-y-4">
      <Overview />
    </TabsContent>
  );
}

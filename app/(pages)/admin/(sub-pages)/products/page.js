import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllPizzas } from "@utils/pizza";
import { ProductsClient } from "./components/client";

export default async function AdminProducts() {
  const pizzas = await getAllPizzas();

  return (
    <TabsContent value="products" className="space-y-4">
      <ProductsClient data={pizzas} />
    </TabsContent>
  );
}

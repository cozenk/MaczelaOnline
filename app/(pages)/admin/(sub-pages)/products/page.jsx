import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllPizzas } from "@utils/pizza";
import { ProductsTable } from "./components/Table";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  const pizzas = await getAllPizzas();
  const sortedPizzabyId = [...pizzas].sort((a, b) => b.id - a.id);

  return (
    <TabsContent value="products" className="space-y-4">
      <ProductsTable pizzas={sortedPizzabyId} />
    </TabsContent>
  );
}

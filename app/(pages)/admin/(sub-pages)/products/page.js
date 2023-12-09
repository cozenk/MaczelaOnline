import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllPizzas } from "@utils/pizza";
import { ProductsTable, VariantsTable } from "./components/table";
import { Separator } from "(pages)/admin/components/ui/separator";

export default async function AdminProducts() {
  const pizzas = await getAllPizzas();

  return (
    <TabsContent value="products" className="space-y-4">
      <ProductsTable data={pizzas} />
      <Separator />
      <VariantsTable data={[]} />
    </TabsContent>
  );
}

import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllPizzas } from "@utils/pizza";
import { ProductsTable, VariantsTable } from "./components/table";
import { Separator } from "(pages)/admin/components/ui/separator";
import { getAllPizzaVariant } from "@utils/pizza_variant";

export default async function AdminProducts() {
  const pizzas = await getAllPizzas();
  const variants = await getAllPizzaVariant();
  const sortedPizzabyId = pizzas.sort((a, b) => b.id - a.id); 
  // console.log(pizzas)

  return (
    <TabsContent value="products" className="space-y-4">
      <ProductsTable data={sortedPizzabyId} />
      <Separator />
      <VariantsTable data={variants} />
    </TabsContent>
  );
}

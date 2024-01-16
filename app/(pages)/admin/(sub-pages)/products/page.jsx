import { TabsContent } from "(pages)/admin/components/ui/tabs";
import { getAllPizzas } from "@utils/pizza";
import { ProductsTable } from "./components/table";

export const dynamic = "force-dynamic";

export default async function AdminProducts({ searchParams }) {
  const pizzas = await getAllPizzas(
    searchParams?.size
      ? {
          size: searchParams?.size,
        }
      : {},
  );
  const sortedPizzabyId = [...pizzas].sort((a, b) => b.id - a.id);

  return (
    <TabsContent value="products" className="space-y-4">
      <ProductsTable pizzas={sortedPizzabyId} />
    </TabsContent>
  );
}

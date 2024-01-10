import Hero from "components/Hero";
import ProductLists from "components/PizzaLists";
import Nav from "@shared/Navigation/Nav";
import OrderTracker from "components/OrderTracker";
import OperationInfoBanner from "@shared/OperationInfoBanner";
import { getPizzasByCategory } from "@utils/pizza";

export default async function Home() {
  const bestSellerPizzas = await getPizzasByCategory("Best sellers");

  return (
    <main className="overflow-x-hidden bg-[url('/pattern-light.png')] bg-[length:70rem_41rem] bg-center bg-repeat dark:bg-[url('/pattern-dark.png')]">
      <OperationInfoBanner className="translate-y-[calc(0%+83px)] " />
      <header className="absolute inset-x-0 top-0 z-50">
        <Nav />

        <OrderTracker />
      </header>

      <Hero />

      <div id="menu" className="menu">
        <ProductLists
          pizzas={bestSellerPizzas}
          label={{
            style: "text-red-600",
            content: "Best sellers 💯",
          }}
        />
      </div>
    </main>
  );
}

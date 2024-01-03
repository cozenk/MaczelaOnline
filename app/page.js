import Hero from "components/Hero";
import ProductLists from "components/PizzaLists";
import { pizzaMenuImages } from "@assets/pizza-menu";
import Nav from "@shared/Navigation/Nav";
import NavProvider from "@providers/NavProvider";
import OrderTracker from "components/OrderTracker";

const bestSellers = [
  //TODO: Pizza static data reference
  {
    id: 1,
    name: "All Veggies",
    href: "#",
    price: 200.0,
    sizeVariants: [
      {
        name: `Medium 10"`,
        price: 200.0,
      },
      {
        name: `Large 12"`,
        price: 280.0,
      },
      {
        name: `Super 20"`,
        price: 600.0,
      },
    ],
    imageSrc: "/pizza-menu/1.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Mac Special",
    href: "#",
    price: 210.0,
    sizeVariants: [
      {
        name: `Medium 10"`,
        price: 210.0,
      },
      {
        name: `Large 12"`,
        price: 298.0,
      },
      {
        name: `Super 20"`,
        price: 620.0,
      },
    ],
    imageSrc: pizzaMenuImages.pizzaCombo,
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Pepperoni",
    href: "#",
    price: 210.0,
    sizeVariants: [
      {
        name: `Medium 10"`,
        price: 210.0,
      },
      {
        name: `Large 12"`,
        price: 298.0,
      },
      {
        name: `Super 20"`,
        price: 620.0,
      },
    ],
    imageSrc: pizzaMenuImages.bakedPizza,
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Hawaiian",
    href: "#",
    price: 210.0,
    sizeVariants: [
      {
        name: `Medium 10"`,
        price: 210.0,
      },
      {
        name: `Large 12"`,
        price: 298.0,
      },
      {
        name: `Super 20"`,
        price: 620.0,
      },
    ],
    imageSrc: pizzaMenuImages.theCircleOfLife,
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "All Meat",
    href: "#",
    price: 210.0,
    sizeVariants: [
      {
        name: `Medium 10"`,
        price: 210.0,
      },
      {
        name: `Large 12"`,
        price: 298.0,
      },
      {
        name: `Super 20"`,
        price: 620.0,
      },
    ],
    imageSrc: pizzaMenuImages.allTimeFavorite,
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 6,
    name: "Mac Duo",
    href: "#",
    price: 298.5,
    sizeVariants: [
      {
        name: `Large 12"`,
        price: 298.0,
      },
      {
        name: `Super 20"`,
        price: 620.0,
      },
    ],
    imageSrc: pizzaMenuImages.macDuo,
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[url('/pattern-light.png')] bg-[length:70rem_41rem] bg-center bg-repeat dark:bg-[url('/pattern-dark.png')]">
      <header className="absolute inset-x-0 top-0 z-50">
        <Nav />

        <OrderTracker />
      </header>

      <Hero />

      <div id="menu" className="menu">
        <ProductLists
          label={{
            style: "text-red-600",
            content: "Best sellers 💯",
          }}
        />
      </div>
    </main>
  );
}

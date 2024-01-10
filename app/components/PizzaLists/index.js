import Pizza from "./Pizza";

export default async function PizzaLists({ pizzas = [], label = null }) {
  return (
    <div className="pb-24 pt-14">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white/30 px-6 py-10 backdrop-blur-sm dark:bg-black/30 md:px-8 lg:max-w-7xl">
        <h2 className="sr-only">Pizzas</h2>

        {label ? (
          <h2
            className={`label mb-10 text-3xl font-bold text-black dark:text-white ${label.style}`}
          >
            {label.content}
          </h2>
        ) : null}

        <div className="grid grid-cols-1 gap-x-6 gap-y-20 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {pizzas.length > 0 &&
            pizzas.map((pizza) => (
              <Pizza
                key={pizza.id}
                id={pizza.id}
                href={`/pizza/${pizza.id}`}
                name={pizza.name}
                price={pizza.price}
                imageSrc={pizza.image_url}
                imageAlt={pizza.description}
                size={pizza.size}
                variants={pizza.variants}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

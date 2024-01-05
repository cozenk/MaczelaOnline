import Nav from "@shared/Navigation/Nav";
import { getPizzaById } from "@utils/pizza";
import Image from "next/image";
import BackButton from "./components/BackButton";
import Info from "./components/Info";

export const dynamic = "force-dynamic";

export default async function PizzDetails({ params }) {
  const id = params.id;

  const pizza = await getPizzaById(id);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <Nav />
      </header>

      <section className="overflow-hidden pb-11 pt-24">
        <BackButton />

        <div className="mx-auto max-w-6xl px-4 py-4 md:px-6 lg:py-8">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 ">
              <PizzaImage url={pizza.image_url} />
            </div>
            <Info
              id={pizza.id}
              category={pizza.category}
              description={pizza.description}
              href={pizza.href}
              imageAlt={pizza.description}
              imageSrc={pizza.image_url}
              name={pizza.name}
              price={pizza.price}
              size={pizza.size}
              variants={pizza.variants}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function PizzaImage({ url = "" }) {
  return (
    <div className="sticky top-0 overflow-hidden ">
      <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
        <Image
          src={url}
          alt=""
          width={200}
          height={200}
          className="h-[30rem] w-[30rem] rounded-xl object-cover"
        />
      </div>
      {/* <div className="hidden flex-wrap md:flex">
      <div className="w-1/2 p-2 sm:w-1/4">
        <a
          href="#"
          className="block border border-teal-300 hover:border-teal-300 dark:border-transparent dark:hover:border-teal-300"
        >
          <Image src={url} alt="" className="w-full object-cover lg:h-20" />
        </a>
      </div>
      <div className="w-1/2 p-2 sm:w-1/4">
        <a
          href="#"
          className="block border border-transparent hover:border-teal-300 dark:border-transparent dark:hover:border-teal-300"
        >
          <img
            src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg"
            alt=""
            className="w-full object-cover lg:h-20"
          />
        </a>
      </div>
      <div className="w-1/2 p-2 sm:w-1/4">
        <a
          href="#"
          className="block border border-transparent hover:border-teal-300 dark:border-transparent dark:hover:border-teal-300"
        >
          <img
            src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg"
            alt=""
            className="w-full object-cover lg:h-20"
          />
        </a>
      </div>
      <div className="w-1/2 p-2 sm:w-1/4">
        <a
          href="#"
          className="block border border-transparent hover:border-teal-300 dark:border-transparent dark:hover:border-teal-300"
        >
          <img
            src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg"
            alt=""
            className="w-full object-cover lg:h-20"
          />
        </a>
      </div>
    </div> */}
    </div>
  );
}

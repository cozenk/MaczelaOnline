import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Nav from "@shared/Navigation/Nav";
import { getPizzaById } from "@utils/pizza";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "./components/BackButton";
import ActionButtons from "./components/ActionButtons";

function PizzaImage({ url = "" }) {
  return (
    <div class="sticky top-0 overflow-hidden ">
      <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
        <Image
          src={url}
          alt=""
          width={200}
          height={200}
          class="h-[30rem] w-[30rem] rounded-xl object-cover"
        />
      </div>
      {/* <div class="hidden flex-wrap md:flex">
      <div class="w-1/2 p-2 sm:w-1/4">
        <a
          href="#"
          class="block border border-teal-300 hover:border-teal-300 dark:border-transparent dark:hover:border-teal-300"
        >
          <Image src={url} alt="" class="w-full object-cover lg:h-20" />
        </a>
      </div>
      <div class="w-1/2 p-2 sm:w-1/4">
        <a
          href="#"
          class="block border border-transparent hover:border-teal-300 dark:border-transparent dark:hover:border-teal-300"
        >
          <img
            src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg"
            alt=""
            class="w-full object-cover lg:h-20"
          />
        </a>
      </div>
      <div class="w-1/2 p-2 sm:w-1/4">
        <a
          href="#"
          class="block border border-transparent hover:border-teal-300 dark:border-transparent dark:hover:border-teal-300"
        >
          <img
            src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg"
            alt=""
            class="w-full object-cover lg:h-20"
          />
        </a>
      </div>
      <div class="w-1/2 p-2 sm:w-1/4">
        <a
          href="#"
          class="block border border-transparent hover:border-teal-300 dark:border-transparent dark:hover:border-teal-300"
        >
          <img
            src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg"
            alt=""
            class="w-full object-cover lg:h-20"
          />
        </a>
      </div>
    </div> */}
    </div>
  );
}

export default async function PizzDetails({ params }) {
  const id = params.id;

  const pizza = await getPizzaById(id);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <Nav />
      </header>

      <section class="overflow-hidden pb-11 pt-24">
        <BackButton />

        <div class="mx-auto max-w-6xl px-4 py-4 md:px-6 lg:py-8">
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4 md:w-1/2 ">
              <PizzaImage url={pizza.image_url} />
            </div>
            <div class="w-full px-4 md:w-1/2 ">
              <div class="lg:pl-20">
                <div class="mb-8 ">
                  <span class="text-lg font-medium text-rose-500 dark:text-rose-200">
                    {pizza.category}
                  </span>
                  <h2 class="mb-6 mt-2 max-w-xl text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {pizza.name}
                  </h2>
                  <div class="mb-6 flex items-center">
                    <ul class="mr-2 flex">
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-star mr-1 w-4 text-red-500 dark:text-gray-400 "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-star mr-1 w-4 text-red-500 dark:text-gray-400 "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-star mr-1 w-4 text-red-500 dark:text-gray-400 "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-star mr-1 w-4 text-red-500 dark:text-gray-400 "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <p class="text-xs dark:text-gray-400 ">
                      (2 customer reviews)
                    </p>
                  </div>
                  <p class="mb-8 max-w-md text-gray-700 dark:text-gray-400">
                    {pizza.description}
                  </p>
                  <p class="mb-8 inline-block text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                    <span>₱{parseFloat(pizza.price).toLocaleString()}</span>
                    {/* <span class="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      $1500.99
                    </span> */}
                  </p>
                  {/* <p class="text-green-600 dark:text-green-300 ">7 in stock</p> */}
                </div>

                <ActionButtons pizza={pizza} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

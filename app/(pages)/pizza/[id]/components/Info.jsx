"use client";

import { formatPrice } from "@utils/formatters";
import ActionButtons from "./ActionButtons";
import { useState } from "react";

export default function Info({
  id,
  category,
  href,
  imageSrc,
  imageAlt,
  name,
  price,
  description,
  size,
  variants = [],
}) {
  const [selectedVariant, setSelectedVariant] = useState({
    name: "",
    price: "",
  });

  return (
    <div className="w-full px-4 md:w-1/2 ">
      <div className="lg:pl-20">
        <div className="mb-8 ">
          <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
            {category}
          </span>
          <h2 className="mb-6 mt-2 max-w-xl text-2xl font-bold dark:text-gray-400 md:text-4xl">
            {name}
          </h2>
          <div className="mb-6 flex items-center">
            <ul className="mr-2 flex">
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star mr-1 w-4 text-red-500 dark:text-gray-400 "
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
                    className="bi bi-star mr-1 w-4 text-red-500 dark:text-gray-400 "
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
                    className="bi bi-star mr-1 w-4 text-red-500 dark:text-gray-400 "
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
                    className="bi bi-star mr-1 w-4 text-red-500 dark:text-gray-400 "
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                  </svg>
                </a>
              </li>
            </ul>
            <p className="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
          </div>
          <p className="mb-8 max-w-md text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <p className="mb-8 inline-block text-4xl font-bold text-gray-700 dark:text-gray-400 ">
            <span>{formatPrice(selectedVariant.price || price)}</span>
            {/* <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      $1500.99
                    </span> */}
          </p>
          {/* <p className="text-green-600 dark:text-green-300 ">7 in stock</p> */}
        </div>

        <ActionButtons
          pizza={{ id, href, imageSrc, imageAlt, name, price, size, variants }}
          selectedVariant={selectedVariant}
          onSelectVariant={(selectedVariant) => {
            setSelectedVariant({
              name: selectedVariant.name,
              price: selectedVariant.price,
            });
          }}
        />
      </div>
    </div>
  );
}

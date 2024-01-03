"use client";

import { useState } from "react";
import ActionButtons from "./ActionButtons";
import { formatPrice } from "@utils/formatters";

export default function Info({
  id,
  href,
  imageSrc,
  imageAlt,
  name,
  price,
  size,
  variants = [],
}) {
  const [selectedVariant, setSelectedVariant] = useState({
    name: "",
    price: "",
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h3 className="mt-4 text-lg  text-gray-700 dark:text-gray-200">
          {name}
        </h3>
        <p className="mt-1 text-lg font-bold  dark:text-white">
          {formatPrice(selectedVariant.price || price)}
        </p>
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
  );
}

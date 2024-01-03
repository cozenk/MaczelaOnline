"use client";

import Image from "next/image";
import { CellAction } from "./CellAction";
import { ImageDown } from "lucide-react";
import { formatPrice } from "@utils/formatters";

export const columns = [
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const image_url = row.getValue("image_url");

      return image_url ? (
        <Image
          src={image_url}
          width={100}
          height={100}
          className="h-[6rem] w-[6rem] rounded-lg object-cover"
        />
      ) : (
        <ImageDown width={100} height={100} />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price");

      return <div>{formatPrice(price)}</div>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants").sort((a, b) => a.id - b.id);

      if (!variants.length) return <div>No Variants</div>;

      return (
        <ul className="list-disc">
          {variants.map((variant) => (
            <li key={variant.id}>
              {variant.name} | {formatPrice(variant.price)}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction pizza={row.original} />,
  },
];

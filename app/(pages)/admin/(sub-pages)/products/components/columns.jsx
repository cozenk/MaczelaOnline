"use client";

import Image from "next/image";
import { CellAction, VariantCellAction } from "./cell-action";
import { ImageDown } from "lucide-react";

export const productsColumns = [
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

      return <div>₱{price}</div>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "variants",
    header: "Variants",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction pizza={row.original} />,
  },
];

export const variantsColumns = [
  {
    accessorKey: "name",
    header: "Variant",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    cell: ({ row }) => <VariantCellAction pizza={row.original} />,
  },
];

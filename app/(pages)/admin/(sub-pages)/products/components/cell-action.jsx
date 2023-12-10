"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "(pages)/admin/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Edit, EyeIcon, MoreHorizontal, Trash } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "(pages)/admin/components/ui/button";
import UpdatePizzaModal from "../modal/product-update-modal";
import { deletePizzaInfo, deleteVariantInfo } from "../actions";
import UpdateVariantModal from "../modal/variant-update-modal";
import Link from "next/link";

export const CellAction = ({ pizza = null }) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <>
      <UpdatePizzaModal
        show={openUpdate}
        onClose={() => setOpenUpdate(false)}
        pizza={pizza}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/pizza/${pizza.id}`}>
            <DropdownMenuItem>
              <EyeIcon className="mr-2 h-4 w-4 " />
              View
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="modal-trigger"
            onClick={() => setOpenUpdate(true)}
          >
            <Edit className="mr-2 h-4 w-4 " />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              if (
                confirm(`Are you sure to delete this (${pizza.name}) pizza?`) ==
                true
              ) {
                deletePizzaInfo(pizza.id, pizza.name);
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const VariantCellAction = ({ pizza = null }) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <>
      <UpdateVariantModal
        show={openUpdate}
        onClose={() => setOpenUpdate(false)}
        pizza={pizza}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {}}>
            <EyeIcon className="mr-2 h-4 w-4 " />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            <Edit className="mr-2 h-4 w-4 " />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              if (
                confirm(
                  `Are you sure to delete this (${pizza.name}) variant?`,
                ) == true
              ) {
                deleteVariantInfo(pizza.id, pizza.name);
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

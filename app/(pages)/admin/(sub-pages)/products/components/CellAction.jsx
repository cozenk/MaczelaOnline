"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "(pages)/admin/components/ui/dropdown-menu";
import { useState } from "react";
import { Edit, EyeIcon, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@shared/Button";
import UpdatePizzaModal from "./modals/UpdatePizza";
import { deletePizzaInfo } from "../actions";
import Link from "next/link";

export const CellAction = ({ pizza = null }) => {
  const [showUpdatePizzaModal, setShowUpdatePizzaModal] = useState(false);

  const confirmDelete = () => {
    if (confirm(`Are you sure to delete this (${pizza.name}) pizza?`) == true) {
      deletePizzaInfo(pizza.id);
    }
  };

  return (
    <>
      <UpdatePizzaModal
        show={showUpdatePizzaModal}
        onClose={() => setShowUpdatePizzaModal(false)}
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
            onClick={() => setShowUpdatePizzaModal(true)}
          >
            <Edit className="mr-2 h-4 w-4 " />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={confirmDelete}>
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

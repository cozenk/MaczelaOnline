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
import { redirect, useParams, useRouter } from "next/navigation";

import { Button } from "(pages)/admin/components/ui/button";
import UpdatePizzaModal from "../modal/product-update-modal";
import { deletePizzaInfo, deleteVariantInfo } from "../actions";
import UpdateVariantModal from "../modal/variant-update-modal";

export const CellAction = ({ data }) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    console.log('Open Modal', openUpdate);
  }, [openUpdate])


  return (
    <>
      <UpdatePizzaModal show={openUpdate} onClose={() => setOpenUpdate(false)} initialData={data}/>
      
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
          <DropdownMenuItem onClick={() => {
            if(confirm(`Are you sure to delete this (${data.name}) pizza?`) == true){
              deletePizzaInfo(data.id, data.name)
            }
          }}>
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const VariantCellAction = ({ data }) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    console.log('Open Modal', openUpdate);
  }, [openUpdate])


  return (
    <>
      <UpdateVariantModal show={openUpdate} onClose={() => setOpenUpdate(false)} initialData={data}/>
      
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
          <DropdownMenuItem onClick={() => {
            if(confirm(`Are you sure to delete this (${data.name}) variant?`) == true){
              deleteVariantInfo(data.id, data.name)
            }
          }}>
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
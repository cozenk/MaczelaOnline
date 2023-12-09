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
import { Edit, KeyRound, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "(pages)/admin/components/ui/button";
import EditUserInfo from "@shared/EditUserInfo";

export const CellAction = ({ user = null }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      //const response = await axios.delete(`/api/${params.companyId}/accounts/${data.id}`);
    } catch (error) {
      console.log("FRONT_PIZZAS_DELETE", error);
    } finally {
      setLoading(false);
      setOpenDelete(false);
    }
  };

  return (
    <>
      <EditUserInfo
        show={showEditModal}
        user={user}
        onClose={() => setShowEditModal(false)}
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
          <DropdownMenuItem
            className="modal-trigger"
            onClick={() => setShowEditModal(true)}
          >
            <Edit className=" mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            <KeyRound className="mr-2 h-4 w-4 " />
            Reset Password
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

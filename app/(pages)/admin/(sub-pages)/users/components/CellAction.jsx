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
import { deleteUserAction, makeUserAdminAction } from "../actions";
import { useCurrentUser } from "@shared/hooks";

export const CellAction = ({ user = null }) => {
  const { user: currentUser, isLoading } = useCurrentUser();

  const [showEditUserInfoModal, setShowEditUserInfoModal] = useState(false);

  const confirmDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete User: ${user.full_name || user.email}`,
      ) == true
    ) {
      if (currentUser.clerk_id === user.clerk_id) {
        await deleteUserAction(user.clerk_id);
      } else {
        deleteUserAction(user.clerk_id);
      }
    }
  };

  return (
    <>
      <EditUserInfo
        show={showEditUserInfoModal}
        user={user}
        onClose={() => setShowEditUserInfoModal(false)}
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
            onClick={() => setShowEditUserInfoModal(true)}
          >
            <Edit className=" mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          {user.role === "CUSTOMER" ? (
            <DropdownMenuItem onClick={() => makeUserAdminAction(user.id)}>
              <KeyRound className="mr-2 h-4 w-4 " />
              Make ADMIN
            </DropdownMenuItem>
          ) : null}
          {!isLoading &&
            (currentUser.id === user.id || user.role === "CUSTOMER" ? (
              <DropdownMenuItem onClick={confirmDelete}>
                <Trash className="mr-2 h-4 w-4 " />
                Delete
              </DropdownMenuItem>
            ) : null)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

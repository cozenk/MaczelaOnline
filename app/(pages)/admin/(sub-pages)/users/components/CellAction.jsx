"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "(pages)/admin/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Edit, KeyRound, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@shared/Button";
import EditUserInfo from "@shared/EditUserInfo";
import { deleteUserAction, updateUserRoleAction } from "../actions";
import { useCurrentUser } from "@shared/hooks";
import Modal from "@shared/Modal";
import SubmitButton from "@shared/EditUserInfo/SubmitButton";
import { useFormState } from "react-dom";

export const CellAction = ({ user = null }) => {
  const { user: currentUser, isLoading } = useCurrentUser();

  const [state, formAction] = useFormState(updateUserRoleAction, {
    infoSaved: false,
  });

  const [showEditUserInfoModal, setShowEditUserInfoModal] = useState(false);
  const [showEditUserRoleModal, setShowEditUserRoleModal] = useState(false);

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

  useEffect(() => {
    if (state.infoSaved) setShowEditUserRoleModal(false);
  }, [state.infoSaved]);

  const rolesButton = {
    STAFF: (
      <DropdownMenuItem
        className="modal-trigger"
        onClick={() => setShowEditUserInfoModal(true)}
      >
        <Edit className=" mr-2 h-4 w-4" />
        Update info
      </DropdownMenuItem>
    ),
    DELIVERY_RIDER: null,
    ADMIN: (
      <>
        <DropdownMenuItem
          className="modal-trigger"
          onClick={() => setShowEditUserInfoModal(true)}
        >
          <Edit className=" mr-2 h-4 w-4" />
          Update info
        </DropdownMenuItem>
        <DropdownMenuItem
          className="modal-trigger"
          onClick={() => {
            setShowEditUserRoleModal(true);
          }}
        >
          <KeyRound className="mr-2 h-4 w-4 " />
          Change role
        </DropdownMenuItem>
        <DropdownMenuItem onClick={confirmDelete}>
          <Trash className="mr-2 h-4 w-4 " />
          Delete
        </DropdownMenuItem>
      </>
    ),
  };

  return (
    <>
      <EditUserInfo
        show={showEditUserInfoModal}
        user={user}
        onClose={() => setShowEditUserInfoModal(false)}
      />

      <Modal
        show={showEditUserRoleModal}
        onClose={() => setShowEditUserRoleModal(false)}
      >
        <header className="mb-10 text-xl font-bold">
          Edit <span className="text-red-500">{user.email}'s</span> role
        </header>

        <form action={formAction}>
          <input
            type="hidden"
            name="user_id"
            id="user_id"
            defaultValue={user.id}
          />
          <div className="mb-5 flex items-center gap-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 "
            >
              Role:
            </label>
            <select
              defaultValue={user?.role}
              name="role"
              id="role"
              className="dark:rign-gray-black block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black sm:text-sm sm:leading-6"
            >
              <option selected disabled>
                Select Size
              </option>
              <option value={"CUSTOMER"}>CUSTOMER</option>
              <option value={"STAFF"}>STAFF</option>
              <option value={"DELIVERY_RIDER"}>DELIVERY_RIDER</option>
              <option value={"ADMIN"}>ADMIN</option>
            </select>
          </div>
          <SubmitButton />
        </form>
      </Modal>

      {!isLoading ? (
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

            {rolesButton[currentUser?.role] || (
              <span className="p-2 text-sm">
                No available actions for your role
              </span>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
};

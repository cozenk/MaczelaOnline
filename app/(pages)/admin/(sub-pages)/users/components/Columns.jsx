"use client";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "(pages)/admin/components/ui/avatar";
import { CellAction } from "./CellAction";

export const columns = [
  {
    accessorKey: "image_url",
    header: "Avatar",
    cell: ({ row }) => {
      const image_url = row.getValue("image_url");
      const full_name = row.getValue("full_name");

      return (
        <div className="flex items-center text-sm font-medium leading-none">
          <Avatar className="h-9 w-9">
            <AvatarImage src={image_url} alt="user-avatar" />
            <AvatarFallback>{full_name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "full_name",
    header: "Full name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile_number",
    header: "Mobiler number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction user={row.original} />,
  },
];

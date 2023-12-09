"use client";

import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "(pages)/admin/components/ui/button";
import { useState } from "react";

import { columns } from "./columns";
import { DataTable } from "(pages)/admin/components/ui/data-table";

export const ProductsTable = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter">{`Pizzas (0)`}</h3>
          <p className="text-muted-foreground text-sm">List of your pizzas.</p>
        </div>

        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

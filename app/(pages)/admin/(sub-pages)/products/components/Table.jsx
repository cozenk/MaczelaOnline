"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "(pages)/admin/components/ui/button";
import { useState } from "react";

import { columns } from "./Columns";
import { DataTable } from "(pages)/admin/components/ui/data-table";
import AddPizzaModal from "./modals/AddPiza";

export function ProductsTable({ pizzas }) {
  const [showAddPizzaModal, setShowAddPizzaModal] = useState(false);

  return (
    <>
      <AddPizzaModal
        show={showAddPizzaModal}
        onClose={() => setShowAddPizzaModal(false)}
      />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter">{`Pizzas (${pizzas.length})`}</h3>
          <p className="text-muted-foreground text-sm">List of your pizzas.</p>
        </div>

        <Button onClick={() => setShowAddPizzaModal(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Pizza
        </Button>
      </div>

      <DataTable searchKey="name" columns={columns} data={pizzas} />
    </>
  );
}

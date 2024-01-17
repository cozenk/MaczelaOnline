"use client";

import { PlusCircle, Filter, FileDown } from "lucide-react";

import { Button } from "@shared/Button";
import { useState } from "react";

import { columns } from "./Columns";
import { DataTable } from "(pages)/admin/components/ui/data-table";
import AddPizzaModal from "./modals/AddPiza";
import FilterPizza from "./modals/FilterPizza";
import PDFreport from "./PDFReport";

export function ProductsTable({ pizzas }) {
  const [showAddPizzaModal, setShowAddPizzaModal] = useState(false);
  const [showFilterPizzaModa, setShowFilterPizzaModal] = useState(false);
  const [filter, setFilter] = useState({
    size: "",
  });

  const exportProductReportPDF = () => {
    PDFreport(pizzas);
  };

  return (
    <>
      <AddPizzaModal
        show={showAddPizzaModal}
        onClose={() => setShowAddPizzaModal(false)}
      />

      <FilterPizza
        show={showFilterPizzaModa}
        onClose={() => setShowFilterPizzaModal(false)}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter">{`Pizzas (${pizzas.length})`}</h3>
          <p className="text-muted-foreground text-sm">List of your pizzas.</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setShowFilterPizzaModal(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <Button onClick={exportProductReportPDF}>
            <FileDown className="mr-2 w-4" />
            Export Report
          </Button>

          <Button onClick={() => setShowAddPizzaModal(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Pizza
          </Button>
        </div>
      </div>

      <DataTable searchKey="name" columns={columns} data={pizzas} />
    </>
  );
}

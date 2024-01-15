"use client";

import { Filter, FileDown } from "lucide-react";

import { Button } from "@shared/Button";
import { useState } from "react";

import { columns } from "./columns";
import { DataTable } from "(pages)/admin/components/ui/data-table";
import FilterOrders from "./modals/FilterOrders";
import PDFreport from "./PDFReport";

export function OrdersTable({ orders }) {
  const [showOrderFilter, setShowOrderFilter] = useState(false);
  const [filter, setFilter] = useState({
    status: "PLACED",
    payment_status: "paid",
  });

  const exportReportPDF = () => {
    PDFreport(orders);
  };

  return (
    <>
      <FilterOrders
        show={showOrderFilter}
        onClose={() => setShowOrderFilter(false)}
        filter={filter}
        setFilter={setFilter}
      />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter">{`Orders (${orders.length})`}</h3>
          <p className="text-muted-foreground text-sm">List of orders</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setShowOrderFilter(true)}>
            <Filter className="mr-2 w-4" />
            Filter
          </Button>

          <Button onClick={exportReportPDF}>
            <FileDown className="mr-2 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <DataTable tbodyId="orders-rows" columns={columns} data={orders} />
    </>
  );
}

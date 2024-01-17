"use client";

import { Filter, FileDown } from "lucide-react";

import { Button } from "@shared/Button";
import { useState } from "react";

import { columns } from "./Columns";
import { DataTable } from "(pages)/admin/components/ui/data-table";
import FilterUsers from "./modals/FilterUsers";
import PDFreport from "./PDFReport";

export function UsersTable({ data }) {
  const [showFilterUsersModal, setShowFilterUsersModal] = useState(false);
  const [filter, setFilter] = useState({
    role: "ADMIN",
  });

  const exportUsersReportPDF = () => {
    PDFreport(data);
  };

  return (
    <>
      <FilterUsers
        show={showFilterUsersModal}
        onClose={() => setShowFilterUsersModal(false)}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter">{`Users (${data.length})`}</h3>
          <p className="text-muted-foreground text-sm">List of your users.</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setShowFilterUsersModal(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <Button onClick={exportUsersReportPDF}>
            <FileDown className="mr-2 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
}

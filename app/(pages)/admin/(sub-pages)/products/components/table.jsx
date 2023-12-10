"use client";

import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "(pages)/admin/components/ui/button";
import { useState } from "react";

import { productsColumns, variantsColumns } from "./columns";
import { DataTable } from "(pages)/admin/components/ui/data-table";
import AddPizzaModal from "../modal/product-add-modal";
import AddVariantModal from "../modal/variant-add-modal";


export const ProductsTable = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const [openPizzaModal, setOpenPizzaModal] = useState(false);
  

  return (
    <>
      <AddPizzaModal show={openPizzaModal} onClose={() => setOpenPizzaModal(false)} />
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter">{`Pizzas (${data.length})`}</h3>
          <p className="text-muted-foreground text-sm">List of your pizzas.</p>
        </div>

        <Button onClick={() => setOpenPizzaModal(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Pizza
        </Button>
      </div>

      <DataTable searchKey="name" columns={productsColumns} data={data} />
    </>
  );
};

export const VariantsTable = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const [openVariantModal, setOpenVariantModal] = useState(false);

  return (
    <>
      <AddVariantModal show={openVariantModal} onClose={() => setOpenVariantModal(false)} />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter">{`Variants (${data.length})`}</h3>
          <p className="text-muted-foreground text-sm">List of sizes of your pizzas.</p>
        </div>

        <Button onClick={() => setOpenVariantModal(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </div>

      <DataTable searchKey="name" columns={variantsColumns} data={data} />
    </>
  );
};

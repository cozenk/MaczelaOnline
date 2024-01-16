"use client";

import { Button } from "@shared/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Chart } from "./chart";
import SalesList from "../SalesList";
import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FileDown, Filter } from "lucide-react";
import PDFreport from "./PDFReport";
import { formatPrice } from "@utils/formatters";

const filters = [
  {
    id: 1,
    label: "Daily",
    value: "DAILY",
  },
  {
    id: 2,
    label: "Monthly",
    value: "MONTHLY",
  },
  {
    id: 3,
    label: "Yearly",
    value: "YEARLY",
  },
];

export default function FilteredSales({ sales = [] }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  const applyFilter = (value = "") => {
    if (value)
      startTransition(() =>
        replace(`${pathname}?${createQueryString("salesFilter", value)}`),
      );
  };

  const getDescription = () => {
    switch (searchParams.get("salesFilter")) {
      case "DAILY":
        return `You made ${sales.length} sales today`;

      case "MONTHLY":
        return `You made ${sales.length} sales this month`;

      case "YEARLY":
        return `You made ${sales.length} sales this year`;

      default:
        return "";
    }
  };

  const exportReportPDF = () => {
    PDFreport(sales);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Chart />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {
                filters.find(
                  (filter) => filter.value === searchParams.get("salesFilter"),
                ).label
              }{" "}
              sales (
              {formatPrice(
                sales.reduce(
                  (total, order) => total + parseFloat(order.total_price),
                  0,
                ),
              )}
              )
            </span>
            <div className="filters flex items-center gap-2">
              <label className="text-sm">Show:</label>
              <div className="buttons flex items-center gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    size="sm"
                    variant={
                      searchParams.get("salesFilter") === filter.value
                        ? "default"
                        : "outline"
                    }
                    disabled={
                      isPending &&
                      searchParams.get("salesFilter") === filter.value
                    }
                    className={
                      isPending &&
                      searchParams.get("salesFilter") === filter.value
                        ? "opacity-50"
                        : "opacity-100"
                    }
                    onClick={() => applyFilter(filter.value)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              {sales.length > 0 ? (
                <Button onClick={exportReportPDF}>
                  <FileDown className="mr-2 w-4" />
                  Export Report
                </Button>
              ) : null}
            </div>
          </CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          <SalesList sales={sales} />
        </CardContent>
      </Card>
    </div>
  );
}

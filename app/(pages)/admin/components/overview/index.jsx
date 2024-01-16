import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "(pages)/admin/components/ui/card";
import { ShoppingBagIcon } from "lucide-react";
import { getAllPendingOrders } from "@utils/orders";
import { getFilteredSales, getTotalSales } from "@utils/sales";
import { formatPrice } from "@utils/formatters";
import { getAllCustomers } from "@utils/users";
import FilteredSales from "./FilteredSales";

export default async function Overview({ salesFilter = "" }) {
  const pendingOrders = await getAllPendingOrders();
  const totalSales = await getTotalSales();
  const customers = await getAllCustomers();
  const filteredSales = await getFilteredSales({ time: salesFilter });

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BanknotesIcon width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(totalSals)}
            </div>
            <p className="text-muted-foreground text-xs">
              +20.1% from last month
            </p>
          </CardContent>
        </Card> 
*/}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="text-muted-foreground h-4 w-4"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalSales)}</div>
            {/* <p className="text-muted-foreground text-xs">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending orders
            </CardTitle>
            <ShoppingBagIcon width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
            {/* <p className="text-muted-foreground text-xs">
                      +201 since last hour
                    </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="text-muted-foreground h-4 w-4"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            {/* <p className="text-muted-foreground text-xs">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
      </div>
      <FilteredSales sales={filteredSales} />
    </>
  );
}

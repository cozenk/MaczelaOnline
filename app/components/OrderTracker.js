"use client";

import { Badge } from "(pages)/admin/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "(pages)/admin/components/ui/hover-card";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "@utils/formatters";
import Link from "next/link";

export default function OrderTracker() {
  const { data: recentOrder, isLoading } = useQuery({
    queryKey: ["my-recent-order"],
    queryFn: async () => {
      const fetchedRecentOrder = await (
        await fetch("/api/orders/my-recent", { cache: "no-store" })
      ).json();

      return fetchedRecentOrder;
    },
    refetchInterval: 3000,
    refetchOnWindowFocus: false,
  });

  const getVariant = () => {
    if (recentOrder.status === "PLACED") return "destructive";
    if (recentOrder.status === "CONFIRMED") return "outline";
    if (recentOrder.status === "DELIVERED") return "success";
    return "secondary";
  };

  if (!recentOrder) return null;

  return recentOrder.status === "DELIVERED" ? (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger className="order-tracker fixed right-0 top-0 z-40 w-fit translate-y-[calc(0%+107px)]">
        <Badge
          variant={"success"}
          className={"rounded-br-none rounded-tr-none text-sm"}
        >
          Your last order was successfuly delivered
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent>
        <Link href={"/my-orders"} className="underline">
          See all orders
        </Link>
      </HoverCardContent>
    </HoverCard>
  ) : (
    <div className="order-tracker fixed right-0 top-0 z-40 w-fit translate-y-[calc(0%+107px)] space-y-3 rounded-bl-xl rounded-tl-xl border-b-2 border-l-2 border-t-2 border-white bg-black/50 px-5 py-2 text-white">
      <div>
        Recent order:{" "}
        <Link
          href={`/my-orders?highlight=${recentOrder.id}`}
          className="underline"
        >
          {recentOrder.id}
        </Link>
        <ul className="items flex list-inside list-disc flex-col">
          {recentOrder.items.map((item) => (
            <li key={item.id} className="font-bold">
              {item.quantity}x {item.name} {item.size ? item.size : 'Large 10"'}
            </li>
          ))}
        </ul>
      </div>
      <div>
        Status:{" "}
        <span className="font-bold">
          <Badge variant={getVariant()} className={"text-sm"}>
            {recentOrder.status === "PLACED"
              ? "TO CONFIRM"
              : recentOrder.status}
          </Badge>
        </span>
      </div>
      <div>
        Total:{" "}
        <span className="font-bold">
          {formatPrice(recentOrder.total_price)} (
          {recentOrder.is_completed ? "Paid" : "To pay"})
        </span>
      </div>
    </div>
  );
}

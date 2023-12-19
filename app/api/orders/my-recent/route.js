import { getCurrentUserRecentOrder } from "@utils/orders";
import { NextResponse } from "next/server";

export async function GET() {
  const recentOrder = await getCurrentUserRecentOrder();

  if (recentOrder) return NextResponse.json(recentOrder);

  return NextResponse.json(null);
}

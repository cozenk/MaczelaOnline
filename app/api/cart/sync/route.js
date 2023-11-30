import { getCurrentUserCart, syncBackendCart } from "@utils/cart";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { cartId, cartItems } = await req.json();
  const syncedCartItems = await syncBackendCart(cartId, cartItems);
  if (syncedCartItems) return NextResponse.json(syncedCartItems);

  return new NextResponse("", { status: 500 });
}

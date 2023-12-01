import { updateBackendCart } from "@utils/cart";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { cartId, cartItems } = await req.json();
  const updatedCartItems = await updateBackendCart(cartId, cartItems);
  if (updatedCartItems) return NextResponse.json(updatedCartItems);

  return new NextResponse("", { status: 500 });
}

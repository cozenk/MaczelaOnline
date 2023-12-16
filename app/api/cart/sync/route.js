import { updateBackendCart } from "@utils/cart";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { cartId, cartItems } = await req.json();
  try {
    const updatedCartItems = await updateBackendCart(cartId, cartItems);
    return NextResponse.json(updatedCartItems);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

import { getCurrentUserCart } from "@utils/cart";
import { NextResponse } from "next/server";

export async function GET() {
  const cart = await getCurrentUserCart();

  const cartItems = cart.cartItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    pizzaId: item.pizza_id,
    imageSrc: item.image_url,
    price: Number(item.price),
    size: item.size,
  }));

  return NextResponse.json({ id: cart.id, cartItems });
}

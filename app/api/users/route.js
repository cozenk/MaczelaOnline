import { getAllUsers } from "@utils/users";
import { NextResponse } from "next/server";

export async function GET(req) {
  const users = await getAllUsers();

  return NextResponse.json(users);
}

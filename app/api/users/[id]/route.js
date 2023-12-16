import { getUserById, updateUserInfo } from "@utils/users";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const user = await getUserById(params.id);
  if (user) return NextResponse.json(user);

  return null;
}

export async function PATCH(req) {
  const formData = await req.formData();
  if (formData) {
    const user_id = formData.get("user_id");
    const email = formData.get("email");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const mobile_number = formData.get("mobile_number").replace(/\s/g, "");

    const street_address = formData.get("street_address");
    const city = formData.get("city");
    const province = formData.get("province");
    const postal_code = formData.get("postal_code");

    const newUserInfo = {
      first_name,
      last_name,
      mobile_number,
      email,
    };

    const newShippingAddress = {
      street_address,
      city,
      province,
      postal_code,
    };

    try {
      const user = await updateUserInfo(user_id, {
        ...newUserInfo,
        ...newShippingAddress,
      });
      return NextResponse.json(user);
    } catch (error) {
      throw error;
    }
  }
}

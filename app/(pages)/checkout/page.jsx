import FormAndSummary from "./components/FormAndSummary";
import { getCurrentUser } from "@utils/users";

export default async function Checkout() {
  const user = await getCurrentUser();

  return <FormAndSummary user={user} />;
}

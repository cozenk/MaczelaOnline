import OperationInfoBanner from "@shared/OperationInfoBanner";
import FormAndSummary from "./components/FormAndSummary";
import { getCurrentUser } from "@utils/users";

export default async function Checkout() {
  const user = await getCurrentUser();

  return (
    <div className="bg-[url('/pattern-light.png')] bg-[length:70rem_41rem] bg-center bg-repeat dark:bg-[url('/pattern-dark.png')]">
      <OperationInfoBanner />
      <FormAndSummary user={user} />
    </div>
  );
}

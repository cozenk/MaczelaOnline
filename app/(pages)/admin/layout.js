import UserAuth from "@shared/UserAuth";
import { getCurrentUser } from "@utils/users";
import Image from "next/image";
import Link from "next/link";
import { Tabs } from "./components/ui/tabs";

import icon from "@assets/icon.png";
import { MainNav } from "./components/main-nav";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const user = await getCurrentUser();

  return {
    title: `Admin Panel | ${user.first_name}`,
    description: "",
  };
}
export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image src={icon} width={35} height={35} alt="brand icon" />
            <span className="text-xl font-bold  dark:text-white">
              Maczela's <span className="text-red-600">Pizza</span>
            </span>
          </Link>

          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search />
              <UserNav /> */}

            <UserAuth hideCart />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin panel</h2>
        </div>
        <Tabs>{children}</Tabs>
      </div>
    </main>
  );
}

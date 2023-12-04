import MobileMenu from "./MobileMenu";
import Image from "next/image";
import UserAuth from "../UserAuth";
import icon from "@assets/icon.png";
import Bars from "./Bars";

const navigation = [
  { name: "Socials", href: "#" },
  { name: "Contact Us", href: "#" },
];

export default function Nav() {
  return (
    <>
      <nav
        className="navbar fixed flex w-full items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 flex items-center gap-2 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image src={icon} width={35} height={35} alt="brand icon" />
            <span className="text-xl font-bold  dark:text-white">
              Maczela's <span className="text-red-600">Pizza</span>
            </span>
          </a>
        </div>
        <Bars />
        <div className="hidden md:flex md:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6  dark:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>

        <UserAuth key={"nav"} />
      </nav>
      <MobileMenu navigation={navigation} />
    </>
  );
}

"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import UserAuth from "./UserAuth";
import icon from "@assets/icon.png";
import SlideMenu from "./SlideMenu";
import { useContext, useEffect } from "react";
import { NavContext } from "@providers/NavProvider";
import { CartContext } from "@providers/CartProvider";
import { Button } from "@shared/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/Popover";
import { MapPinnedIcon, PhoneIcon } from "lucide-react";

export default function MobileMenu({ socials = [], userAuth = null }) {
  const { cart } = useContext(CartContext);
  const { mobileMenuOpen, closeMobileMenu } = useContext(NavContext);

  useEffect(() => {
    if (cart.showMenu) closeMobileMenu();
  }, [cart.showMenu]);

  return (
    <SlideMenu
      isOpen={mobileMenuOpen}
      closeMenu={closeMobileMenu}
      menuStyles="overflow-x-visible"
    >
      <div className="flex items-center justify-between gap-x-20">
        <a href="#" className="-m-1.5 flex items-center gap-2 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image src={icon} width={35} height={35} alt="brand icon" />
          <span className="text-xl font-bold ">
            Maczela's <span className="text-red-600">Pizza</span>
          </span>
        </a>
        <Button className="-mr-2" variant="ghost" onClick={closeMobileMenu}>
          <span className="sr-only">Close menu</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="flex flex-col items-start gap-y-4 py-6 ">
            <Popover>
              <PopoverTrigger className="font-semibold leading-6  dark:text-white">
                Socials
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-4">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      className="flex gap-1 hover:underline hover:opacity-70"
                    >
                      <span>{social.name}:</span>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="font-semibold leading-6  dark:text-white">
                Contact us
              </PopoverTrigger>
              <PopoverContent className="w-fit p-10">
                <div className="flex flex-col gap-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5760735825843!2d121.0929421!3d14.623209000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b83ae53e87c1%3A0xfa890256365c04ea!2sMaczella&#39;s%20Pizza!5e0!3m2!1sen!2sph!4v1704819793145!5m2!1sen!2sph"
                    width="400"
                    height="300"
                    className="border-none"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>

                  <a
                    href={"https://maps.app.goo.gl/PAp2iRNLN3ZH2V4s7"}
                    target="_blank"
                    className="flex items-start gap-2 hover:underline hover:opacity-70"
                  >
                    <MapPinnedIcon size={16} className="mt-1" />
                    <p className="w-1/2">
                      <strong>Address:</strong> #20A J.P Rizal Street Barangay
                      Calumpang Marikina City
                    </p>
                  </a>

                  <ul className="flex flex-col">
                    <label className="flex items-center gap-1">
                      Contact number(s) <PhoneIcon size={16} />:
                    </label>
                    <li>
                      <strong>Smart: </strong>
                      <a href="tel:09997246572">0999 724 6572</a>
                    </li>
                    <li>
                      <strong>Globe: </strong>
                      <a href="tel:09668433672">0966 843 3672</a>
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
            {/* {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:text-gray-300"
              >
                {item.name}
              </a>
            ))} */}
          </div>
          {userAuth ? userAuth : null}
        </div>
      </div>
    </SlideMenu>
  );
}

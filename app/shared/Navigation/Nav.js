import MobileMenu from "./MobileMenu";
import Image from "next/image";
import UserAuth from "./UserAuth";
import icon from "@assets/icon.png";
import Bars from "./Bars";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "(pages)/admin/components/ui/popover";
import {
  FacebookIcon,
  InstagramIcon,
  MapIcon,
  MapPinnedIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import { MapPinIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Socials", href: "#" },
  { name: "Contact Us", href: "#" },
];

const socials = [
  {
    name: "Facebook",
    icon: <FacebookIcon />,
    href: "https://www.facebook.com/maczelaspizzacalumpangmarikina",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/maczelaspizza/",
  },
  {
    name: "Twitter",
    icon: <TwitterIcon />,
    href: "https://www.facebook.com/maczelaspizzacalumpangmarikina",
  },
];

export default async function Nav() {
  return (
    <>
      <nav
        className="navbar fixed z-50 flex w-full items-center justify-between p-6 lg:px-8"
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
          <Popover>
            <PopoverTrigger className="text-sm font-semibold leading-6  dark:text-white">
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
            <PopoverTrigger className="text-sm font-semibold leading-6  dark:text-white">
              Contact us
            </PopoverTrigger>
            <PopoverContent className="w-fit p-10">
              <div className="flex flex-col gap-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5760735825843!2d121.0929421!3d14.623209000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b83ae53e87c1%3A0xfa890256365c04ea!2sMaczella&#39;s%20Pizza!5e0!3m2!1sen!2sph!4v1704642184203!5m2!1sen!2sph"
                  width="600"
                  height="450"
                  className="border-none"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>

                <a
                  href={"https://maps.app.goo.gl/PAp2iRNLN3ZH2V4s7"}
                  target="_blank"
                  className="flex items-center gap-2 hover:underline hover:opacity-70"
                >
                  <MapPinnedIcon size={16} />
                  <p>
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
        </div>

        <div className={`mr-5 hidden gap-10 md:flex md:justify-end lg:flex-1`}>
          <Suspense fallback={<Skeleton width={200} height={30} />}>
            <UserAuth />
          </Suspense>
        </div>
      </nav>

      <MobileMenu
        navigation={navigation}
        userAuth={<UserAuth cartStyles="!mt-5" />}
      />
    </>
  );
}

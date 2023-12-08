import Image from "next/image";
import leaves from "@assets/leaves.png";
import tomatos from "@assets/tomatos.png";
import pizzaHero from "@assets/pizza-hero.png";
import ActionButtons from "./ActionButtons";

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="relative z-20 w-full px-10 py-24 md:py-32 lg:px-28">
        <div className="relative flex w-full flex-wrap items-center justify-center lg:justify-between">
          <div className="text max-w-lg">
            <h1 className="mb-10 text-center text-6xl font-bold tracking-tight  dark:text-white md:text-left">
              Garantisadong fresh na may{" "}
              <span className="text-red-500">pagmamahal ♥️</span>
            </h1>
            <p className="mt-6 hidden text-lg italic leading-8 text-black dark:text-white lg:block">
              One of the <span className="text-red-600">BEST PIZZA</span> in
              Marikina since 2010. <br />
              With all over 12 branches nationwide!
            </p>
            <ActionButtons className="hidden lg:flex" />
          </div>

          <Image
            src={pizzaHero}
            alt="hero image of a pizza"
            className="max-w-md object-contain"
          />
          <ActionButtons className="flex lg:hidden" />
        </div>
      </div>

      <div className="circle absolute right-0 top-[50%] z-0 hidden h-[40rem] w-[40rem] translate-x-[50%] translate-y-[-45%] rounded-full bg-yellow-400 lg:block"></div>

      <Image
        src={leaves}
        alt="hero image of a leaves"
        className="absolute left-0 top-0 z-30 w-36 translate-x-[-30%] translate-y-[30%] lg:translate-y-[50%]"
      />
      <Image
        src={tomatos}
        alt="hero image of a tomato"
        className="absolute right-0 top-0 w-28 translate-x-[30%] translate-y-[50%]"
      />
      <Image
        src={tomatos}
        alt="hero image of a tomato"
        className="absolute bottom-0 right-0 w-52 translate-x-[30%] translate-y-[30%]"
      />

      {/* <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}
    </div>
  );
}

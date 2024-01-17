export default function OperationInfoBanner({ className = "" }) {
  return (
    <div
      className={`fixed top-0 z-40 w-full bg-orange-600 text-white ${className}`}
    >
      <marquee className="text-center text-lg" scrollamount="10">
        !! Orders accepted are limited to Calumpang, Marikina branches only !!
      </marquee>
    </div>
  );
}

export default function OperationInfoBanner({ className = "" }) {
  return (
    <div
      className={`fixed top-0 z-40 w-full bg-orange-600 text-white ${className}`}
    >
      <h2 className="text-center">
        !! Orders accepted are limited to Calumpang, Marikina branches only !!
      </h2>
    </div>
  );
}

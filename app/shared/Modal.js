export default function Modal({ show = null, children, className = "" }) {
  if (show === false) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 h-screen bg-gray-500 bg-opacity-75 transition-opacity ${className}`}
    >
      <div className="overlay-content absolute left-1/2 top-1/2 flex max-h-[40rem] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between overflow-y-auto rounded-xl  bg-white p-14 dark:bg-black">
        {children}
      </div>
    </div>
  );
}

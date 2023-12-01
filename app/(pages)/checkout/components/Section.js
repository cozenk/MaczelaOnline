export default function Section({ title = "", titleColor = "", children }) {
  return (
    <section className="mb-5 border-b border-gray-900/10 pb-10">
      <h2
        className={`mb-5 text-xl font-semibold leading-7 ${
          titleColor || "text-black"
        }`}
      >
        {title || "Title"}
      </h2>

      {children}
    </section>
  );
}

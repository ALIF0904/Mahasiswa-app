export default function Card({ title, children, width = "530px", height = "460px" }) {
  return (
    <div
      className="bg-white border border-gray-300 shadow-lg rounded-none p-10"
      style={{ width, height }}
    >
      {title && (
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

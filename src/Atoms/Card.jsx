export default function Card({
  title,
  children,
  width = "530px",
  height = "460px",
}) {
  return (
    <div
      className="bg-white border border-gray-300 shadow-lg rounded-none p-10
                 flex flex-col justify-center"  
      style={{ width, height }}
    >
      {title && (
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {title}
        </h2>
      )}

      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

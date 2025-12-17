export default function DashboardCard({ icon: Icon, title, total }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
      <div className="bg-blue-600 text-white p-3 rounded-full">
        <Icon size={32} />
      </div>

      <div>
        <h3 className="text-gray-600 text-sm font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{total}</p>
      </div>
    </div>
  );
}

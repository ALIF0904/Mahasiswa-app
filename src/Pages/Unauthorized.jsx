export default function Unauthorized() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-500">403 - Forbidden</h1>
      <p className="mt-3">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
    </div>
  );
}

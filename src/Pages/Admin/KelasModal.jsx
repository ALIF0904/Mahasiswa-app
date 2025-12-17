import React, { useEffect, useState } from "react";
import { confirmAction } from "../../helpers/SwalHelper";

export default function KelasModal({
  selected,
  onClose,
  createMutation,
  updateMutation,
}) {
  const [form, setForm] = useState({ nama: "" });

  useEffect(() => {
    selected ? setForm(selected) : setForm({ nama: "" });
  }, [selected]);

  const submit = async () => {
    const ok = await confirmAction(
      "Simpan?",
      selected ? "Update" : "Tambah"
    );
    if (!ok) return;

    selected
      ? updateMutation.mutate({ id: selected.id, data: form })
      : createMutation.mutate(form);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-[360px]">
        <h3 className="font-bold mb-3">
          {selected ? "Edit" : "Tambah"} Kelas
        </h3>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Nama Kelas"
          value={form.nama}
          onChange={(e) =>
            setForm({ ...form, nama: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-400 px-3 py-1 rounded"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={submit}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

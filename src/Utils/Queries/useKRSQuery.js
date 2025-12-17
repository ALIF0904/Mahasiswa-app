import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllKRS, createKRS, updateKRS, deleteKRS } from "../../Api/KrsApi";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export function useKrsQuery() {
  const queryClient = useQueryClient();

  // ===========================
  // GET ALL KRS
  // ===========================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["krsData"],
    queryFn: getAllKRS,
  });

  // ===========================
  // CREATE KRS
  // ===========================
  const createMutation = useMutation({
    mutationFn: (payload) => createKRS(payload),
    onSuccess: () => {
      showSuccess("KRS berhasil ditambahkan");
      queryClient.invalidateQueries(["krsData"]);
    },
    onError: (err) => showError(err.message || "Gagal menambahkan KRS"),
  });

  // ===========================
  // UPDATE KRS
  // ===========================
  const updateMutation = useMutation({
    mutationFn: ({ id, ...payload }) => updateKRS(id, payload),
    onSuccess: () => {
      showSuccess("KRS berhasil diubah");
      queryClient.invalidateQueries(["krsData"]);
    },
    onError: (err) => showError(err.message || "Gagal mengubah KRS"),
  });

  // ===========================
  // DELETE KRS
  // ===========================
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteKRS(id),
    onSuccess: () => {
      showSuccess("KRS berhasil dihapus");
      queryClient.invalidateQueries(["krsData"]);
    },
    onError: (err) => showError(err.message || "Gagal menghapus KRS"),
  });

  return {
    data,
    isLoading,
    isError,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

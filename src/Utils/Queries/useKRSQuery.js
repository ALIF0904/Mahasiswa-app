import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllKRS, createKRS, deleteKRS } from "../../Api/KrsApi";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export function useKRSQuery() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({ queryKey: ["krsData"], queryFn: getAllKRS });

  const createMutation = useMutation({
    mutationFn: createKRS,
    onSuccess: () => queryClient.invalidateQueries(["krsData"]),
    onError: (err) => showError(err.message || "Gagal menambahkan KRS"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteKRS,
    onSuccess: () => queryClient.invalidateQueries(["krsData"]),
    onError: (err) => showError(err.message || "Gagal menghapus KRS"),
  });

  return { data, isLoading, isError, createMutation, deleteMutation };
}

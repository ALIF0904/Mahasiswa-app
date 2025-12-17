import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMataKuliah,
  createMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "../../Api/MatkulApi";

export function useMataKuliahQuery() {
  const queryClient = useQueryClient();

  const {
    data = [],              // 🔥 FIX UTAMA
    isLoading,
    isError,
  } = useQuery(["matakuliah"], getAllMataKuliah);

  const createMutation = useMutation(createMataKuliah, {
    onSuccess: () => queryClient.invalidateQueries(["matakuliah"]),
  });

  const updateMutation = useMutation(
    ({ id, data }) => updateMataKuliah(id, data),
    {
      onSuccess: () => queryClient.invalidateQueries(["matakuliah"]),
    }
  );

  const deleteMutation = useMutation(deleteMataKuliah, {
    onSuccess: () => queryClient.invalidateQueries(["matakuliah"]),
  });

  return {
    data,                   // 🔥 PASTI ARRAY
    isLoading,
    isError,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

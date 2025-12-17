import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "../../Api/MahasiswaApi";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export function useMahasiswaQuery() {
  const queryClient = useQueryClient();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: getAllMahasiswa,
  });

  const createMutation = useMutation({
    mutationFn: createMahasiswa,
    onSuccess: () => {
      showSuccess("Data mahasiswa berhasil ditambahkan");
      queryClient.invalidateQueries(["mahasiswa"]);
    },
    onError: () => showError("Gagal menambahkan data mahasiswa"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateMahasiswa(id, data),
    onSuccess: () => {
      showSuccess("Data mahasiswa berhasil diubah");
      queryClient.invalidateQueries(["mahasiswa"]);
    },
    onError: () => showError("Gagal mengubah data mahasiswa"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      showSuccess("Data mahasiswa berhasil dihapus");
      queryClient.invalidateQueries(["mahasiswa"]);
    },
    onError: () => showError("Gagal menghapus data mahasiswa"),
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

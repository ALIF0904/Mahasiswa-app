import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllKelas, createKelas, updateKelas, deleteKelas } from "../../Api/KelasApi";

export function useKelasQuery() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(["kelas"], getAllKelas);

  const createMutation = useMutation(createKelas, {
    onSuccess: () => queryClient.invalidateQueries(["kelas"]),
  });

  const updateMutation = useMutation(({ id, data }) => updateKelas(id, data), {
    onSuccess: () => queryClient.invalidateQueries(["kelas"]),
  });

  const deleteMutation = useMutation(deleteKelas, {
    onSuccess: () => queryClient.invalidateQueries(["kelas"]),
  });

  return { data, isLoading, isError, createMutation, updateMutation, deleteMutation };
}

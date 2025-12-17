import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllDosen, createDosen, updateDosen, deleteDosen } from "../../Api/DosenApi";

export function useDosenQuery() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(["dosen"], getAllDosen);

  const createMutation = useMutation((data) => createDosen(data), { onSuccess: () => queryClient.invalidateQueries(["dosen"]) });
  const updateMutation = useMutation(({ id, data }) => updateDosen(id, data), { onSuccess: () => queryClient.invalidateQueries(["dosen"]) });
  const deleteMutation = useMutation((id) => deleteDosen(id), { onSuccess: () => queryClient.invalidateQueries(["dosen"]) });

  return { data, isLoading, isError, createMutation, updateMutation, deleteMutation };
}

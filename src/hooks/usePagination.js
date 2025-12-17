import { useMemo, useState } from "react";

export default function usePagination(data = [], limit = 5) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / limit);

  const slice = useMemo(() => {
    const start = (page - 1) * limit;
    return data.slice(start, start + limit);
  }, [data, page, limit]);

  return { page, setPage, totalPages, slice };
}

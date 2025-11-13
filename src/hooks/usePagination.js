import { useState } from "react";

export default function usePagination(totalItems, perPage = 4) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const [page, setPage] = useState(1);

  const offset = (page - 1) * perPage;
  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  const next = () => setPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setPage((p) => Math.max(p - 1, 1));

  return { page, perPage, totalPages, offset, goTo, next, prev, setPage };
}

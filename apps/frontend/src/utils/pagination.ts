export const paginate = <T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    totalPages,
    paginatedData,
  };
};
export const paginate = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(query.pageSize, 10) || 20));
  return { offset: (page - 1) * pageSize, limit: pageSize, page, pageSize };
};

export const paginatedResponse = (rows, total, page, pageSize) => ({
  data: rows,
  total,
  page,
  pageSize,
  totalPages: Math.ceil(total / pageSize),
});

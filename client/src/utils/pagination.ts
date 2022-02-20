export const pagination = (totalCount: number, productLimit: number) => {
  const pageCount = Math.ceil(totalCount / productLimit);
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return pages;
};
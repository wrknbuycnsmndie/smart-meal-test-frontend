import type { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  isLoading,
  onPageChange,
}) => {
  if (totalPages <= 0) return null;

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        className="btn btn-sm btn-outline"
        disabled={currentPage === 1 || isLoading}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Предыдущая
      </button>
      <div className="text-sm text-gray-600">
        Страница {currentPage} из {totalPages} ({totalItems} товаров)
      </div>
      <button
        className="btn btn-sm btn-outline"
        disabled={currentPage === totalPages || isLoading}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Следующая
      </button>
    </div>
  );
};

export default Pagination;

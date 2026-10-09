import React from 'react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  totalItems = 100,
  pageSize = 10,
  itemLabel = 'items',
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with smart ellipsis when needed
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-2 text-xs text-slate-500">
      <div>
        Showing{' '}
        <span className="font-semibold text-slate-700">
          {totalItems === 0 ? 0 : startItem}-{endItem}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-slate-700">
          {totalItems.toLocaleString()}
        </span>{' '}
        {itemLabel}
        <span className="ml-2 text-slate-400 font-normal">
          (Page {currentPage} of {totalPages})
        </span>
      </div>

      <div className="flex items-center gap-1.5 font-medium">
        <button
          onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2.5 py-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:hover:text-slate-500 transition-colors cursor-pointer"
        >
          Prev
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-7 h-7 flex items-center justify-center text-slate-400 select-none"
              >
                ...
              </span>
            );
          }

          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange && onPageChange(page)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#ff2b75] text-white font-bold shadow-sm shadow-pink-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-2.5 py-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:hover:text-slate-500 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

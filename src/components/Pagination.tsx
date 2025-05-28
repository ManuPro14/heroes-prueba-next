'use client';

export const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8 px-4">
      {Array.from({ length: lastPage }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded text-sm sm:text-base ${
            currentPage === i + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-500 text-white'
          } cursor-pointer hover:bg-blue-600 transition-colors`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
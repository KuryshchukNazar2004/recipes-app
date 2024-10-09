import React from 'react';
import './styles/Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>«</button>
      )}
      {pages.slice(0, 7).map((page, index) => (
        <React.Fragment key={page}>
          {index === 6 && totalPages > 10 && currentPage <= 7 && <span className="dots">...</span>}
          <button
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
          {index === 6 && totalPages > 10 && currentPage > 7 && (
            <>
              <span className="dots">...</span>
              <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            </>
          )}
        </React.Fragment>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)}>»</button>
      )}
    </div>
  );
};

export default Pagination;

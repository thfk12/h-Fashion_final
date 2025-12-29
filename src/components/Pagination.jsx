import React from 'react';
import './sass/Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageGroupSize = 10;
  const startPageIndex = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize;

  const pageNumbers = [];
  const startPage = startPageIndex + 1;
  const endPage = Math.min(startPageIndex + pageGroupSize, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const disableFirstLast = totalPages <= 10;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || disableFirstLast}
        className="first-last-btn"
      >
        « 처음으로
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="prev-next-btn"
      >
        ‹ 이전
      </button>
      <div className="page-numbers">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="prev-next-btn"
      >
        다음 ›
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages || disableFirstLast}
        className="first-last-btn"
      >
        마지막으로 »
      </button>
    </div>
  );
};

export default Pagination;

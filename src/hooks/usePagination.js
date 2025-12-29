// src/hooks/usePagination.js

import { useState } from 'react';

/**
 * 페이지네이션 로직을 캡슐화한 커스텀 훅
 * @param {Array} items - 페이지네이션 할 전체 데이터 배열
 * @param {number} itemsPerPage - 페이지당 보여줄 항목 수 (기본값 10)
 * @returns {object} { currentItems, currentPage, totalPages, handlePageChange }
 */
const usePagination = (items, itemsPerPage = 10) => {
  // 1. 상태 정의
  const [currentPage, setCurrentPage] = useState(1);

  // 2. 전체 페이지 수 계산
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // 3. 현재 페이지에 해당하는 상품 목록 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // 4. 페이지 이동 핸들러 함수
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // 페이지 상단으로 스크롤하는 기능은 필요에 따라 여기에 포함합니다.
      window.scrollTo(0, 0);
    }
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;

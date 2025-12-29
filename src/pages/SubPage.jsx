import React from 'react';
import ProductListPage from './ProductListPage';

const SubPage = ({ category }) => {
  return (
    <div className="sub-page">
      <ProductListPage category={category} />
    </div>
  );
};

export default SubPage;

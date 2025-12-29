import React from 'react';
import BrandListPage from './BrandListPage';
import './sass/CategoryPage.scss';

const BrandSJYP = () => {
  return (
    <div className="sub-main">
      <h2 className="category-page-title">SJYP</h2>
      <BrandListPage brand="SJYP" />
    </div>
  );
};

export default BrandSJYP;

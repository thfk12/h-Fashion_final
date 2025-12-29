import React from 'react';
import BrandListPage from './BrandListPage';
import './sass/CategoryPage.scss';

const BrandRouge = () => {
  return (
    <div className="sub-main">
      <h2 className="category-page-title">ROUGE&LOUNGE</h2>
      <BrandListPage brand="ROUGELOUNGE" />
    </div>
  );
};

export default BrandRouge;

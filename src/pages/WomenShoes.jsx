import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const WomenShoes = () => {
  return (
    <main>
      <h2 className="category-page-title">여성 신발</h2>
      <SubPage category="women shoes" />
    </main>
  );
};

export default WomenShoes;

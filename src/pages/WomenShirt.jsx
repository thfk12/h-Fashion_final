import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const WomenShirt = () => {
  return (
    <main>
      <h2 className="category-page-title">여성 셔츠/블라우스</h2>
      <SubPage category="women blouse" />
    </main>
  );
};

export default WomenShirt;

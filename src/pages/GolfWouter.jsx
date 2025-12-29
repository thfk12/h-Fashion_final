import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const GolfWouter = () => {
  return (
    <main>
      <h2 className="category-page-title">골프 여성 아우터</h2>
      <SubPage category="golf women top" />
    </main>
  );
};

export default GolfWouter;

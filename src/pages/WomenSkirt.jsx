import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const WomenSkert = () => {
  return (
    <main>
      <h2 className="category-page-title">여성 스커트</h2>
      <SubPage category="women skirt" />
    </main>
  );
};

export default WomenSkert;

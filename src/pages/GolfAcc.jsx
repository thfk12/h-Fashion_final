import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const GolfAcc = () => {
  return (
    <main>
      <h2 className="category-page-title">골프 악세사리</h2>
      <SubPage category="golf etc" />
    </main>
  );
};

export default GolfAcc;

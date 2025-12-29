import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const GolfMouter = () => {
  return (
    <main>
      <h2 className="category-page-title">골프 남성 아우터</h2>
      <SubPage category="golf man top" />
    </main>
  );
};

export default GolfMouter;

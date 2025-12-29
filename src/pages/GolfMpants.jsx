import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const GolfMpants = () => {
  return (
    <main>
      <h2 className="category-page-title">골프 남성 팬츠</h2>
      <SubPage category="golf man pants" />
    </main>
  );
};

export default GolfMpants;

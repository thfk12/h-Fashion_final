import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const GolfWpants = () => {
  return (
    <main>
      <h2 className="category-page-title">골프 여성 팬츠</h2>
      <SubPage category="golf women pants" />
    </main>
  );
};

export default GolfWpants;

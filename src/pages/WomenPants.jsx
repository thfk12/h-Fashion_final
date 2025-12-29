import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const WomenPants = () => {
  return (
    <main>
      <h2 className="category-page-title">여성 팬츠</h2>
      <SubPage category="women pants" />
    </main>
  );
};

export default WomenPants;

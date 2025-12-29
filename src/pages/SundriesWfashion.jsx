import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const SundriesWfashion = () => {
  return (
    <main>
      <h2 className="category-page-title">여성 패션 잡화</h2>
      <SubPage category="sundries women etc" />
    </main>
  );
};

export default SundriesWfashion;

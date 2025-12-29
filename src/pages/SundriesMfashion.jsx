import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const SundriesMfashion = () => {
  return (
    <main>
      <h2 className="category-page-title">남성 패션 잡화</h2>
      <SubPage category="sundries man etc" />
    </main>
  );
};

export default SundriesMfashion;

import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const SundriesMbag = () => {
  return (
    <main>
      <h2 className="category-page-title">남자 가방</h2>
      <SubPage category="sundries man bag" />
    </main>
  );
};

export default SundriesMbag;

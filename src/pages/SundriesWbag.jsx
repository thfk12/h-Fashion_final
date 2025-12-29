import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const SundriesWbag = () => {
  return (
    <main>
      <h2 className="category-page-title">여성 가방</h2>
      <SubPage category="sundries women bag" />
    </main>
  );
};

export default SundriesWbag;

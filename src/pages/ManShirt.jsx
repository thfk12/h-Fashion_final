import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const ManShirt = () => {
  return (
    <main>
      <h2 className="category-page-title">남성 셔츠</h2>
      <SubPage category="man shirts" />
    </main>
  );
};

export default ManShirt;

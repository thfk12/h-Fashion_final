import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const ManShoes = () => {
  return (
    <main>
      <h2 className="category-page-title">남성 신발</h2>
      <SubPage category="man shoes" />
    </main>
  );
};

export default ManShoes;

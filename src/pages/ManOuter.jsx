import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const ManOuter = () => {
  return (
    <main>
      <h2 className="category-page-title">남성 아우터</h2>
      <SubPage category="man outer" />
    </main>
  );
};

export default ManOuter;

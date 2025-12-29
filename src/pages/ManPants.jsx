import React from 'react';
import SubPage from './SubPage';
import './sass/CategoryPage.scss';

const ManPants = () => {
  return (
    <main>
      <h2 className="category-page-title">남성 팬츠</h2>
      <SubPage category="man pants" />
    </main>
  );
};

export default ManPants;

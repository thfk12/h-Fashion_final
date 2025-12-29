import React from 'react';
import SubPage from './SubPage';
import SubMainBestSeller from '../components/SubMainBestSeller';

const Women = () => {
  return (
    <div className="sub-main">
      <h2 className="sub-main-title">WOMEN’S SHOP</h2>
      <h3>BEST SELLER</h3>
      <SubMainBestSeller category="Women" />
      <h3>WOMEN</h3>
      <SubPage category="catewomen" />
    </div>
  );
};

export default Women;

import React from 'react';
import SubPage from './SubPage';
import './sass/SubMain.scss';
import SubMainBestSeller from '../components/SubMainBestSeller';

const Sundries = () => {
  return (
    <div className="sub-main">
      <h2 className="sub-main-title">SUNDRIES’S SHOP</h2>
      <h3>BEST SELLER</h3>
      <SubMainBestSeller category="sundries" />
      <h3>SUNDRIES</h3>
      <SubPage category="sundries" />
    </div>
  );
};

export default Sundries;

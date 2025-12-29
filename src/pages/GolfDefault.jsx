import React from 'react';
import SubPage from './SubPage';
import './sass/SubMain.scss';
import SubMainBestSeller from '../components/SubMainBestSeller';

const Golf = () => {
  return (
    <div className="sub-main">
      <h2 className="sub-main-title">GOLF’S SHOP </h2>
      <h3>BEST SELLER</h3>
      <SubMainBestSeller category="golf" />
      <h3>GOLF</h3>
      <SubPage category="golf" />
    </div>
  );
};

export default Golf;

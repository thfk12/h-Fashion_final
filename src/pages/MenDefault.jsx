import React from 'react';
import SubPage from './SubPage';
import './sass/SubMain.scss';
import SubMainBestSeller from '../components/SubMainBestSeller';

const MenDefault = () => {
  return (
    <div className="sub-main">
      <h2 className="sub-main-title">MEN’S SHOP</h2>
      <h3>BEST SELLER</h3>
      <SubMainBestSeller category="man" />
      <h3>MEN</h3>
      <SubPage category="cateman" />
    </div>
  );
};

export default MenDefault;

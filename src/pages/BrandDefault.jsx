import React from 'react';
import BrandListPage from './BrandListPage';
import './sass/SubMain.scss';
import SubMainBrandBestSeller from '../components/SubMainBrandBestSeller';

const TargetBrands = [
  'TOMMY HILFIGER MEN',
  'TOMMY JEANS',
  'TOMMY HILFIGER WOMEN',
  'ROUGELOUNGE',
  'TOMMY Shoes',
  'SJYP',
];

const BrandDefault = () => {
  return (
    <div className="sub-main">
      <h2 className="sub-main-title">BRAND’S SHOP</h2>
      <h3>BEST SELLER</h3>
      <SubMainBrandBestSeller brand={TargetBrands} />
      <h3>BRAND</h3>
      <BrandListPage brand={TargetBrands} />
    </div>
  );
};

export default BrandDefault;

import React, { useState } from 'react';
import BrandLiveProducts from './BrandLiveProducts';
import './sass/brandlive.scss';

const brandData = [
  [
    {
      id: 1,
      thumbImg: '/images/products/RA2F9ABG136KBK/thumbnail.jpg',
      brand: 'brand-rouge',
      brandTitle: 'Rouge&Rounge',
    },
    {
      id: 2,
      code: 'RA2F7ABG024WDB',
      thumbImg: '/images/products/RA2F7ABG024WDB/thumbnail.jpg',
      title: '모데나 호보 스웨이드',
      price: 378000,
      originPrice: '',
      sale: '20%',
      brandTitle: 'Rouge&Rounge',
    },
    {
      id: 3,
      code: 'RA2F7ABG291WBK',
      thumbImg: 'images/products/RA2F7ABG291WBK/thumbnail.jpg',
      title: '레체 숄더 L',
      price: 328000,
      originPrice: '',
      sale: '20%',
      brandTitle: 'Rouge&Rounge',
    },
    {
      id: 4,
      code: 'RA2F7ABG292WBS',
      thumbImg: '/images/products/RA2F7ABG292WBS/thumbnail.jpg',
      title: '레체 버킷 M',
      price: 278000,
      originPrice: '',
      sale: '20%',
      brandTitle: 'Rouge&Rounge',
    },
  ],
  [
    {
      id: 1,
      thumbImg: '/images/products/T12F6WPC030MT1AEH/thumbnail.jpg',
      brand: 'brand-tommy',
      brandTitle: 'Tommy Jeans',
    },
    {
      id: 2,
      code: 'T12F7QOT723ML1AEG',
      thumbImg: '/images/products/T12F7QOT723ML1AEG/thumbnail.jpg',
      title: '퍼 칼라 머스코비 다운',
      price: 659000,
      originPrice: '',
      sale: ' 20%',
      brandTitle: 'Tommy Jeans',
    },
    {
      id: 3,

      thumbImg: '/images/products/T12F7QOT714ML1BDS/thumbnail.jpg',
      title: '나일론 라이트 다운',
      price: 399000,
      originPrice: '',
      sale: ' 20%',
      brandTitle: 'Tommy Jeans',
    },
    {
      id: 4,
      code: 'T12F7QOT714ML1BDS',
      thumbImg: '/images/products/T32F7TJC54TMT1GS7/thumbnail.jpg',
      title: '릴랙스 배지 테디 재킷',
      price: 229000,
      originPrice: '',
      sale: ' 20%',
      brandTitle: 'Tommy Jeans',
    },
  ],
  [
    {
      id: 1,
      thumbImg: '/images/products/PW2E9WPC802NBS/thumbnail.jpg',
      brand: 'brand-sjyp',
      brandTitle: 'SJYP',
    },
    {
      id: 2,
      code: 'PW2F3WPC804WOW',
      thumbImg: '/images/products/PW2F3WPC804WOW/thumbnail.jpg',
      title: '스팽글 쇼츠',
      price: 94000,
      originPrice: '',
      sale: ' 20%',
      brandTitle: 'SJYP',
    },
    {
      id: 3,
      code: 'PW2F3WPC802WLG',
      thumbImg: '/images/products/PW2F3WPC802WLG/thumbnail.jpg',
      title: '사이드 시어링 나일론 팬츠',
      price: 118000,
      originPrice: '',
      sale: ' 20%',
      brandTitle: 'SJYP',
    },
    {
      id: 4,
      code: 'PW2E9WPC802NDG',
      thumbImg: '/images/products/PW2E9WPC802NDG/thumbnail.jpg',
      title: '체크 울 팬츠s',
      price: 71700,
      originPrice: '',
      sale: ' 20%',
      brandTitle: 'SJYP',
    },
  ],
];

const MainBrandLive = () => {
  const brandCate = ['ROUGE&LOUNG', 'TOMMY JEANS', 'SJYP'];

  const [activeIndex, setActiveIndex] = useState(1);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const mainNew = brandData.map((group) => group.find((v) => v.id === 1).thumbImg);

  return (
    <section className="brand-live-section">
      <h2>BRAND LIVE</h2>
      <div className="container">
        <ul>
          {brandCate.map((bCate, id) => (
            <li
              key={id}
              onClick={() => handleClick(id - 1)}
              className={activeIndex === id - 1 ? 'active' : ''}
            >
              {bCate}
            </li>
          ))}
        </ul>
        <div
          className="live-section-wrap"
          style={{
            transform: `translateX(${1 - activeIndex * 33.3333333}%)`,
          }}
        >
          {brandData.map((bData, index) => (
            <BrandLiveProducts
              key={index}
              mainNew={bData.find((b) => b.id === 1).thumbImg}
              mainBrand={bData.find((b) => b.id === 1).brand}
              brand={bData}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainBrandLive;

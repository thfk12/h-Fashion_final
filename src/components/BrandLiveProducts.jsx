import React from 'react';
import BrandLiveProduct from './BrandLiveProduct';
import { useNavigate } from 'react-router-dom';

const BrandLiveProducts = ({ brand }) => {
  const sData = brand.filter((b) => b.id !== 1);
  const mData = brand.filter((b) => b.id === 1);
  const navigte = useNavigate();

  return (
    <div className="brand-live-wrap">
      <div className="brand-live-wrap-left">
        <p>New</p>
        <div className="brand-live-wrap-left-img">
          {sData.map((s) => (
            <BrandLiveProduct
              key={s.code || s.id}
              thumbImg={s.thumbImg}
              id={s.id}
              title={s.title}
              price={s.price}
              code={s.code}
              brand={s.brandTitle}
            />
          ))}
        </div>
      </div>
      {mData.map((m, id) => (
        <div className="main-new" key={id} onClick={() => navigte(`/brand/${m.brand}`)}>
          <img src={m.thumbImg} alt="메인new이미지" />
          <div className="text-overlay">
            <h3>{m.brandTitle}</h3>
            <p>브랜드 바로가기</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandLiveProducts;

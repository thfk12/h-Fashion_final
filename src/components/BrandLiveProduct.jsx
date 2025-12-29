import React from 'react';
import { Link } from 'react-router-dom';
import { usePickStore } from '../store/usePickStore';

const BrandLiveProduct = ({ thumbImg, id, title, price, code, brand }) => {
  const { pickLists, onAddWishList } = usePickStore();

  const isActive = pickLists.some((p) => p.code === code);

  return (
    <>
      <Link to={`/product-detail/${code}`} className="sub-new-wrap">
        <div className="sub-new">
          <div className="sub-new-img ">
            <img src={thumbImg} alt={id} />
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddWishList({ thumbImg, title, price, code });
              }}
              className={`heart ${isActive ? 'active' : ''}`}
            ></span>
          </div>
          <div className="sub-new-textbox">
            <div className="sub-new-brand">{brand}</div>
            <p className="sub-new-title">{title}</p>
            <div className="sub-new-text">
              <div className="sub-new-text-r">
                <span className="sub-new-price">{price.toLocaleString()}원</span>
                <span className="sub-new-saleprice">{(price * 0.8).toLocaleString()}원</span>
              </div>

              <span className="sub-new-sale">20%</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BrandLiveProduct;

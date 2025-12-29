import React from 'react';

const ProductNoticeInfo = ({ product }) => {
  return (
    <>
      <h3>상품고시정보</h3>
      <ul className="product-notice-info">
        <li>
          <strong>치수</strong>
          <span>실측정보 참조</span>
        </li>
        <li>
          <strong>제조자</strong>
          <span>{product.brand}</span>
        </li>
        <li>
          <strong>제조국</strong>
          <span>{product.made}</span>
        </li>
        <li>
          <strong>세탁방법 및 취급시 주의사항</strong>
          <span>세탁방법 및 취급시 주의사항</span>
        </li>
        <li>
          <strong>제품 주소재</strong>
          <span>본 제품은 석유계 드라이클리닝하십시오.</span>
        </li>
        <li>
          <strong>제조연월</strong>
          <span>{product.date}</span>
        </li>
        <li>
          <strong>품질보증기준</strong>
          <span>관련법 및 소비자분쟁해결 규정에 따름</span>
        </li>
        <li>
          <strong>A/S 책임자,전화번호</strong>
          <span>(주)한섬,18005700</span>
        </li>
      </ul>
    </>
  );
};

export default ProductNoticeInfo;

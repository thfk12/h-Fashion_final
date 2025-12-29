import React from 'react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const SubMainBestSeller = ({ category }) => {
  const { onFetchRatedItems } = useProductStore();
  const bestSellerItems = onFetchRatedItems(category, 5, 3, 5);

  return (
    <ul className="sub-goods-list">
      {bestSellerItems.length > 0 ? (
        bestSellerItems.map((item, idx) => (
          <li key={item.code}>
            <Link to={`/product-detail/${item.code}`}>
              <ProductCard sendItem={item} isBestSeller={true} rank={idx + 1} />
            </Link>
          </li>
        ))
      ) : (
        <p>평점 5점인 상품이 없습니다.</p>
      )}
    </ul>
  );
};

export default SubMainBestSeller;

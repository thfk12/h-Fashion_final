import React from 'react';
import './sass/CartNone.scss';

const CartNone = () => {
  return (
    <div className="cart-item-none-wrap">
      <div className="cart-none-icon">
        <img src="../../images/cart-none-icon.svg" alt="장바구니 없음 아이콘" />
      </div>
      <p>장바구니에 담긴 상품이 없습니다</p>
    </div>
  );
};

export default CartNone;

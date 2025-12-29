import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import './sass/CartItem.scss';
import { Link } from 'react-router-dom';

const CartItem = ({ onOpenPopup }) => {
  const { cartItems, onRemoveCart, onCheckCart, resetCart, onCheckAll, onRemoveChecked } =
    useCartStore();

  const [isActive, setIsActive] = useState(true);

  const handleToggle = (code) => {
    setIsActive(!isActive);
    onCheckCart(code);
  };

  const isAllChecked = cartItems.length > 0 && cartItems.every((item) => item.checked);

  const resetCartList = () => {
    resetCart();
  };

  return (
    <div className="cart-item-list-wrap">
      <div className="del-box">
        <label className="del-total">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={(e) => onCheckAll(e.target.checked)}
          />
          <span>전체</span>
        </label>
        <div className="del-button">
          <button
            onClick={(e) => {
              onRemoveChecked();
              e.preventDefault();
            }}
            className="btn grey xsmall"
          >
            선택 삭제
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              resetCartList();
            }}
            className="btn grey xsmall"
          >
            전체 삭제
          </button>
        </div>
      </div>
      <ul className="cart-item-list">
        {cartItems.map((item) => (
          <li key={item.code + item.size + item.color} className="cart-item">
            <div className="cart-item-inner">
              <div className="item-left">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => handleToggle(item.code)}
                />
                <div className="item-img-box">
                  <img src={item.thumbImg} alt={item.code} />
                </div>
                <div className="item-text-box">
                  <div className="item-desc">
                    <span className="item-brand">{item.brand}</span>
                    <span className="item-title">{item.title}</span>
                    <span className="item-op">
                      <span>색상 : {item.color}</span>
                      <span>사이즈 : {item.size}</span>
                      <span>수량 : {item.count}</span>
                    </span>
                  </div>
                </div>
              </div>
              <p>{(item.price * 0.8 * item.count).toLocaleString()}원</p>
              <div className="item-right">
                <span>
                  <button
                    className="btn xsmall secondary"
                    onClick={() => {
                      console.log('선택된아이템 : ', item);
                      onOpenPopup(item);
                    }}
                  >
                    옵션변경
                  </button>
                </span>
                <span>
                  <Link className="btn xsmall primary" to="/pay">
                    바로구매
                  </Link>
                </span>
              </div>

              <span
                className="del-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveCart(item.code, item.size, item.color);
                  alert('장바구니에서 제거되었습니다.');
                }}
              >
                <img src="../../images/close-icon-black.svg" alt="아이템 삭제" />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItem;

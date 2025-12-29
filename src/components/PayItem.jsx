import React from 'react';
import { useCartStore } from '../store/useCartStore';
import './sass/PayItem.scss';

const PayItem = () => {
  const { cartItems } = useCartStore();

  return (
    <div className="pay-item-list-wrap">
      <ul className="pay-item-list">
        {cartItems.map((item, id) => (
          <li key={id} className="pay-item">
            <div className="pay-item-inner">
              <div className="item-left">
                <div className="item-img-box">
                  <img src={item.thumbImg} alt={item.title} />
                </div>
                <div className="item-text-box">
                  <div className="text-box-top">
                    <span className="item-brand">{item.brand}</span>
                    <span className="item-title">{item.title}</span>
                  </div>
                  <div className="text-box-bottom">
                    <span className="item-op">
                      {item.color} / {item.size}
                    </span>
                  </div>
                </div>
              </div>

              <div className="item-right">
                <div className="item-count">
                  <span>수량 : {item.count}</span>
                </div>
                <div className="item-price">
                  <span className="price">{(item.price * 0.8 * item.count).toLocaleString()}</span>
                  <span>원</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PayItem;

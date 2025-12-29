import React from 'react';
import './sass/orderForm.scss';

const OrderForm = () => {
  return (
    <div className="total-amount-wrap">
      <div className="total-amount-top">
        <h3>결제 금액</h3>
        <div className="amount-wrap">
          <p>
            <span>상품금액</span>
            <span>상품금액변수</span>
          </p>
          <p>
            <span>할인금액</span>
            <span>- 상품금액 - 할인금액</span>
          </p>
          <p>
            <span>배송비</span>
            <span className="delivery-fee">무료배송</span>
          </p>
        </div>
        <hr />
        <div className="total-price">
          <p className="total-price-l">총 결제금액</p>
          <p className="total-price-r">
            <span className="discount-per">20%</span>
            <span className="final-price">상품금액 - 할인금액</span>
          </p>
        </div>
      </div>
      <div className="total-amount-bottom">
        <button>결제금액 구매하기(상품개수변수)</button>
      </div>
    </div>
  );
};

export default OrderForm;

import React from 'react';
import { Link } from 'react-router-dom';
import './sass/PayPo.scss';
import { useCartStore } from '../store/useCartStore';

const PayPo = ({ onOpenPopup }) => {
  const { checkedTotalPrice } = useCartStore();

  return (
    <div className="payPo-wrap">
      <div className="payPo-inner">
        <div className="payPo-inner-top">
          <p>결제 금액</p>

          <div className="payPo-pay-list">
            <div className="payPo-pay item">
              <span>상품금액</span>
              <span>{checkedTotalPrice.toLocaleString()}</span>
            </div>
            <div className="payPo-pay dis">
              <span>할인금액</span>
              <span>-{(checkedTotalPrice * 0.2).toLocaleString()}</span>
            </div>
            <div className="payPo-pay del">
              <span>배송비</span>
              <span>무료배송</span>
            </div>
          </div>
        </div>

        <hr />

        <div className="payPo-inner-bottom">
          <div className="payPo-pay-total">
            <span>총 결제금액</span>
            {(checkedTotalPrice * 0.8).toLocaleString()}
          </div>

          <div className="payPo-btn">
            <Link onClick={onOpenPopup}>
              {(checkedTotalPrice * 0.8).toLocaleString()}원 구매하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPo;

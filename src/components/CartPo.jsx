import React from "react";
import { useCartStore } from "../store/useCartStore";
import "./sass/CartPo.scss";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authstore";

const CartPo = () => {
  const { checkedTotalPrice } = useCartStore();
  const { user } = useAuthStore();

  return (
    <div className="cartPo-wrap">
      <div className="cartPo-inner">
        <div className="cartPo-inner-top">
          <p>결제 금액</p>

          <div className="cartPo-pay-list">
            <div className="cartPo-pay item">
              <span>상품금액</span>
              <span>{checkedTotalPrice.toLocaleString()}</span>
            </div>
            <div className="cartPo-pay dis">
              <span>할인금액</span>
              <span>-{(checkedTotalPrice * 0.2).toLocaleString()}</span>
            </div>
            <div className="cartPo-pay del">
              <span>배송비</span>
              <span>무료배송</span>
            </div>
          </div>
        </div>

        <hr />

        <div className="cartPo-inner-bottom">
          <div className="cartPo-pay-total">
            <span>총 결제금액</span>
            {(checkedTotalPrice * 0.8).toLocaleString()}
          </div>

          <div className="cartPo-btn">
            <Link to={user ? "/pay" : "/nonmember"}>
              {(checkedTotalPrice * 0.8).toLocaleString()}원 구매하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPo;

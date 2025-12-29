import React from "react";
import { useAuthStore } from "../store/authstore";
import UserInfoLeftMenu from "../components/UserInfoLeftMenu";
import BuyProductList from "../components/BuyProductList";
import "./sass/UserInfo.scss";
import { Navigate } from "react-router-dom";

const UserInfo = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="sub-page">
      <div className="content-inner userinfo">
        <div className="user-info-left">
          <UserInfoLeftMenu />
        </div>

        <div className="user-info-main-right">
          <div className="profile-section">
            <div className="username">
              {`${user.email}(${
                user.displayName || user.nickname
              })님, 환영합니다!`}
            </div>

            <div className="info-summary">
              <div className="summary-box">
                <span className="box-label">멤버십등급 &gt;</span>
                <span className="box-value">Friend</span>
              </div>

              <div className="summary-box">
                <span className="box-label">쿠폰 &gt;</span>
                <span className="box-value">15</span>
              </div>

              <div className="summary-box">
                <span className="box-label">상품리뷰 &gt;</span>
                <span className="box-value">21</span>
              </div>

              <div className="summary-box">
                <span className="box-label">적립금 &gt;</span>
                <span className="box-value">1500</span>
              </div>
            </div>
          </div>

          <div className="recent-orders-section">
            <div className="recent-orders-top">
              <h2 className="section-title">최근 주문</h2>

              <ul className="order-list">
                <BuyProductList />
              </ul>
            </div>

            <div className="order-button-box">
              <button>주문/배송 조회</button>
              <p>|</p>
              <button>취소/교환/반품 0건</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

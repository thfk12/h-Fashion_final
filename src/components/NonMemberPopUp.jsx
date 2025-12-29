import React, { useEffect, useState } from "react";
import "./sass/NonMemberPopUp.scss";

const STATUS = ["결제완료", "배송준비", "배송중", "배송완료"];

const NonMemberPopUp = ({ data, onClose }) => {
  const [items, setItems] = useState(
    data.items.map((item) => ({ ...item, status: 0 }))
  );
  const statusCounts = items.reduce(
    (acc, item) => {
      acc[item.status]++;
      return acc;
    },
    [0, 0, 0, 0]
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.status < 3 ? { ...item, status: item.status + 1 } : item
        )
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="non-popup-wrap">
      <div className="non-popup-inner">
        <div className="non-popup-title">
          <div className="non-popup-title-l">
            <h2>비회원 주문 / 배송조회</h2>
            <p>주문 내역을 확인하고 배송상태를 확인하세요!</p>
          </div>
          <p onClick={onClose}>
            <img src="/images/close-icon-black.svg" alt="X" />
          </p>
        </div>
        <div className="non-popup-delivery">
          <div className="delivery delivery1">
            <span className="delivery-box delivery1-box">
              <div className="icon-wrap">
                <span className="icon"></span>
              </div>
            </span>
            <span className="delivery-count">{statusCounts[0]}</span>
            <span className="delivery-status">결제완료</span>
          </div>
          <div className="delivery delivery2">
            <span className="delivery-box delivery2-box">
              <div className="icon-wrap">
                <span className="icon"></span>
              </div>
            </span>
            <span className="delivery-count">{statusCounts[1]}</span>
            <span className="delivery-status">배송준비</span>
          </div>
          <div className="delivery delivery3">
            <span className="delivery-box delivery3-box">
              <div className="icon-wrap">
                <span className="icon"></span>
              </div>
            </span>
            <span className="delivery-count">{statusCounts[2]}</span>
            <span className="delivery-status">배송중</span>
          </div>
          <div className="delivery delivery4">
            <span className="delivery-box delivery4-box">
              <div className="icon-wrap">
                <span className="icon"></span>
              </div>
            </span>
            <span className="delivery-count">{statusCounts[3]}</span>
            <span className="delivery-status">배송완료</span>
          </div>
        </div>
        <div className="non-popup-item-wrap">
          {items.map((d, index) => (
            <div className="non-popup-item" key={index}>
              <div className="non-popup-item-t">
                <span className="order-code">주문번호 : {d.code}</span>
                <span className="order-status">{STATUS[d.status]}</span>
              </div>
              <div className="non-popup-item-b">
                <div className="non-popup-item-b-r">
                  <img src={d.thumbImg} alt={d.title} />
                </div>
                <div className="non-popup-item-b-l">
                  <div className="popup-item-brand">{d.brand}</div>
                  <p className="popup-item-title">{d.title}</p>
                  <span className="popup-item-color">
                    <span>색상 : {d.color}</span>
                    <span>수량 : {d.count}</span>
                  </span>
                </div>
                <p className="popup-item-price">
                  {(d.price * 0.8).toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonMemberPopUp;

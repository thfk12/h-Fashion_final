import React from 'react';
import './sass/OrderDetailModal.scss';

const OrderDetailModal = ({ order, onClose }) => {
  // order 데이터가 없거나 모달이 닫혀야 할 경우 null 반환
  console.log('제품데이터정보', order);
  if (!order) return null;
  console.log(order);
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* 모달 내용 컨테이너 (이 영역 클릭 시 모달이 닫히지 않도록 이벤트 전파 중단) */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="h-totalPrice">
            <h2>주문 상세 내역</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="date">
            <p>주문번호 : ({order.code})</p>
            <p>날짜 : {order.date}</p>
          </div>
          <div className="total-price">
            <p>
              총 결제 금액 : <strong>{(order.price * 0.8).toLocaleString()}</strong>원
            </p>
          </div>
          <ul className="product-list">
            {order.products.map((product, index) => (
              <li key={index} className="product-item">
                <div className="product-details">
                  <div className="img-box">
                    <img src={product.thumbImg} alt={product.title} />
                  </div>
                  <div className="text-box">
                    <p className="product-brand">{product.brand}</p>
                    <p className="product-title">{product.title}</p>
                    <p className="product-option">
                      <span>색상 : {product.color}</span>
                      <span>사이즈 : {product.size}</span>
                      <span>수량 : {product.count}</span>
                    </p>
                  </div>
                </div>
                <div className="product-price-wrap">
                  <span className="product-price">{product.itemPrice.toLocaleString()}</span>
                  <span>원</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn primary middle">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;

import React, { useState } from 'react';
import { usePayStore } from '../store/usePayStore';
import { Link } from 'react-router-dom';
import './sass/MemberDelivery.scss';
import UserInfoLeftMenu from '../components/UserInfoLeftMenu';
// 새로 생성한 모달 컴포넌트 임포트
import OrderDetailModal from '../components/OrderDetailModal';

const delStatus = ['결제완료', '배송준비', '배송중', '배송완료'];

const MemberDelivery = () => {
  const { orders } = usePayStore();

  // 팝업 표시 상태: null이면 닫힌 상태, 주문 객체면 열린 상태
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 모달 열기 함수
  const openModal = (order) => {
    setSelectedOrder(order);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setSelectedOrder(null);
  };

  const truncateWords = (text, maxWords) => {
    if (!text) return '';

    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + ' ...' : text;
  };

  return (
    <div className="sub-page">
      <div className="content-inner delivery">
        <div className="memberDelivery-inner-left">
          <UserInfoLeftMenu />
        </div>

        <div className="memberDelivery-inner-right">
          <div className="member-delivery-wrap">
            <div className="member-delivery-inner-top">
              <span className="sub-page-title">주문 / 배송조회</span>
            </div>
            {orders.length === 0 ? (
              <div className="member-delivery-none">
                <span>주문하신 상품이 없습니다</span>
                <Link to="/">더 많은 상품 구경하러 가기</Link>
              </div>
            ) : (
              <>
                <div className="member-delivery-item-wrap">
                  <div className="member-delivery-status">
                    <div className="member-delivery-box-wrap">
                      <ul className="member-delivery-box-list">
                        {delStatus.map((s, id) => (
                          <li key={id} className="member-delivery-box">
                            <div className="del-icon-wrap">
                              <span className={`del-icon${id + 1}`}></span>
                            </div>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="member-delivery-text">
                      <span>주문 내역과 배송 상태를 확인하세요!</span>
                    </div>
                  </div>
                  <ul className="member-del-item-list">
                    {orders.map((order, id) => {
                      // const firstProductCode = orders[0];
                      const firstProduct = order.products[0];

                      return (
                        <li className="member-del-item" key={id}>
                          <div className="member-del-item-inner">
                            <div className="del-item-inner-top">
                              <div className="del-inner-top-left">
                                <span>{order.date}</span>
                                <span>{order.code}</span>
                              </div>
                              <div className="del-inner-top-right">
                                {/* 버튼 클릭 시 openModal 함수 호출, 현재 주문 객체 전달 */}
                                <button onClick={() => openModal(order)}>주문 상세</button>
                              </div>
                            </div>
                            <div className="del-item-inner-bottom">
                              <div className="del-inner-bottom-img-box">
                                <img src={firstProduct.thumbImg} alt="" />
                              </div>
                              <div className="del-inner-bottom-text-box">
                                <div className="del-item-info">
                                  <span className="item-title">
                                    {truncateWords(firstProduct.title, 5)}
                                    {order.products.length > 1
                                      ? ` 외 ${order.products.length - 1}건`
                                      : ''}
                                  </span>
                                </div>
                                <div className="del-item-price">
                                  <span className="item-price">
                                    {(order.price * 0.8).toLocaleString()}
                                    {/* {order.price.toLocaleString()} */}
                                  </span>
                                  <span>원</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* 주문 상세 모달 컴포넌트 추가 */}
      <OrderDetailModal order={selectedOrder} onClose={closeModal} />
    </div>
  );
};

export default MemberDelivery;

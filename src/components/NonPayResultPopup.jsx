import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { usePayStore } from '../store/usePayStore';
import './sass/PayResultPopup.scss';
import { useAuthStore } from '../store/authstore';

const NonPayResultPopup = ({ onClose }) => {
  const { checkedTotalPrice, cartItems, onRemoveChecked, resetCart } = useCartStore();
  const { today } = usePayStore();
  const { nonCart } = useAuthStore();
  const filteredCart = cartItems.filter((c) => c.checked);
  const itemFirstValue = filteredCart[0] || null;
  const truncateWords = (text, maxWords) => {
    if (!text) return '';

    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + ' ...' : text;
  };

  const handlePayFinish = () => {
    onRemoveChecked();
    resetCart();
  };
  return (
    <div className="pay-result-popup-wrap" onClick={onClose}>
      <div className="pay-result-popup">
        <div className="pay-result-top">
          <h4 className="hide">결제 완료</h4>
          <p>주문이 완료되었습니다.</p>
          <span>Thank you for purchasing our product.</span>
        </div>

        <div className="pay-result-bottom-wrap">
          <div className="pay-result-bottom">
            <div className="pay-result-bottom1-wrap">
              <div className="pay-result-bottom1 code">
                <span>주문번호</span>
                <span>{itemFirstValue?.code}</span>
              </div>

              <div className="pay-result-bottom1 date">
                <span>결제일자</span>
                <span>{today}</span>
              </div>

              <div className="pay-result-bottom1 item">
                <span>주문상품</span>
                <span>
                  {truncateWords(itemFirstValue?.title, 3)}
                  {nonCart.items.length > 1 ? ` 외 ${nonCart.items.length - 1}건` : ''}
                </span>
              </div>
            </div>

            <div className="pay-result-bottom2-wrap">
              <div className="pay-result-bottom2 total">
                <span>총 구매 금액</span>
                <span>{(checkedTotalPrice * 0.8).toLocaleString()}</span>
              </div>

              <div className="pay-result-bottom2 reward">
                <span>리워드</span>
                <span>{Math.floor(checkedTotalPrice * 0.8 * 0.01).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="pay-result-btn">
            <Link to={'/login'} className="pay-detail" onClick={handlePayFinish}>
              <button>주문 상세 보기</button>
            </Link>
            <Link to="/" className="to-main" onClick={handlePayFinish}>
              <button>메인 화면 가기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonPayResultPopup;

import React, { useEffect, useState } from 'react';
import './sass/Pay.scss';
import PayItem from '../components/PayItem';
import { paymethodsCard, paymethodsBank, paymethodsPay } from '../data/paymethod';
import { useAuthStore } from '../store/authstore';
import NonCartPo from '../components/NonCartPo';
import { useCartStore } from '../store/useCartStore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import NonPayResultPopup from '../components/NonPayResultPopup';

const NonPay = () => {
  const { checkedTotalPrice } = useCartStore();
  const { nuser, naddress, nonCart } = useAuthStore();
  const [selectPay, setSelectPay] = useState('card');
  const [selectValue, setSelectValue] = useState({
    card: [],
    pay: [],
    bank: [],
  });
  const [openDepth, setOpenDepth] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const saveNonpay = async () => {
    const ophone = nuser.ophone;
    await setDoc(doc(db, 'nonorders', ophone), {
      user: nuser,
      address: naddress,
      items: nonCart.items,
      totalPrice: nonCart.totalPrice,
      createdAt: new Date(),
    });
  };

  const handleSelect = (method, id, value) => {
    setSelectValue((v) => ({
      ...v,
      [method]: {
        ...v[method],
        [id]: value,
      },
    }));
    setOpenDepth(!openDepth);
  };

  useEffect(() => {
    setOpenDepth(null);
  }, [selectPay]);

  const renderDepth = () => {
    let list = [];
    if (selectPay === 'card') {
      list = paymethodsCard;
    } else if (selectPay === 'pay') {
      return paymethodsPay.map((item) => (
        <div key={item.id} className="radio-pay-item">
          <label className="radio-label">
            <input
              type="radio"
              name="simple-pay"
              value={item.label}
              checked={selectValue.pay?.selected === item.label}
              onChange={() =>
                setSelectValue((prev) => ({
                  ...prev,
                  pay: { selected: item.label },
                }))
              }
            />
            {item.label}
          </label>
        </div>
      ));
    } else if (selectPay === 'bank') {
      list = paymethodsBank;
    }

    return list.map((item) => (
      <div key={item.id} className="depth-item">
        {'payDepth' in item ? (
          <div className="dropdown-wrapper">
            <button
              className={`dropdown-btn ${openDepth === item.id ? 'active' : ''}`}
              onClick={() => setOpenDepth(openDepth === item.id ? null : item.id)}
            >
              <span>{selectValue[selectPay][item.id] || item.label || item.title}</span>
              <span className="button-icon">
                <img src="../images/arrow-down-white.svg" alt="" />
              </span>
            </button>

            {openDepth === item.id && (
              <ul className={`dropdown-list ${openDepth === item.id ? 'active' : ''}`}>
                {item.payDepth.map((depth) => (
                  <li
                    key={depth.id}
                    className="dropdown-option"
                    onClick={() => handleSelect(selectPay, item.id, depth.label)}
                  >
                    {depth.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="input-wrapper">
            <input
              id="select-bank"
              type="text"
              placeholder={item.label}
              className="input-box"
              onChange={(e) => handleSelect(selectPay, item.id, e.target.value)}
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="sub-page pay">
      <div className="inner pay">
        <div className="pay-inner-top">
          <h2 className="sub-page-title pay">주문서</h2>
        </div>
        <div className="pay-inner-bottom">
          <div className="pay-inner-left">
            <div className="user-info-wrap">
              <div className="user-info">
                <span>주문자 정보</span>
                <span>{nuser.oemail}</span>
              </div>
            </div>
            <div className="address-wrap">
              <div className="address-top">
                <span>주문정보</span>
              </div>
              <hr />
              <div className="address-bottom">
                <div className="address-input">
                  <span>주문자</span>
                  <span>{nuser.oname}</span>
                </div>
                <div className="address-input">
                  <span>주문자 전화번호</span>
                  <span>{nuser.ophone}</span>
                </div>
                <div className="address-input delivery">
                  <span>배송지 주소</span>
                  <span>
                    {naddress.naddress} {naddress.naddress2}
                  </span>
                </div>
                <div className="address-input">
                  <span>배송 요청사항</span>
                  <span>{naddress.nrequest}</span>
                </div>
              </div>
            </div>

            <div className="item-wrap">
              <div className="item-top">
                <span>주문상품</span>
              </div>
              <hr />
              <div className="item-bottom">
                <PayItem />
              </div>
            </div>
            <div className="payment-wrap">
              <div className="payment-top">
                <span>결제수단</span>
              </div>
              <hr />
              <div className="payment-bottom">
                <div className="pay-method-btns">
                  <button
                    className={selectPay === 'card' ? 'active' : ''}
                    onClick={() => setSelectPay('card')}
                  >
                    신용카드
                  </button>

                  <button
                    className={selectPay === 'pay' ? 'active' : ''}
                    onClick={() => setSelectPay('pay')}
                  >
                    간편결제
                  </button>

                  <button
                    className={selectPay === 'bank' ? 'active' : ''}
                    onClick={() => setSelectPay('bank')}
                  >
                    무통장입금
                  </button>
                </div>

                <div className="pay-method-depth">{renderDepth()}</div>
              </div>
            </div>
          </div>

          <div className="pay-inner-right">
            <NonCartPo
              onOpenPopup={handleOpenPopup}
              sendNonData={saveNonpay}
              pirce={checkedTotalPrice}
            />
          </div>

          {showPopup && <NonPayResultPopup onClose={() => setShowPopup(false)} />}
        </div>
      </div>
    </div>
  );
};

export default NonPay;

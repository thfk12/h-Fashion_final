import React, { useEffect, useState } from 'react';
import './sass/Pay.scss';
import PayItem from '../components/PayItem';
import { paymethodsCard, paymethodsBank, paymethodsPay } from '../data/paymethod';
import PayPo from '../components/PayPo';
import PayResultPopup from '../components/PayResultPopup';
import { useAuthStore } from '../store/authstore';
import { usePayStore } from '../store/usePayStore';
import { useCartStore } from '../store/useCartStore';
import DaumPostcode from 'react-daum-postcode';

const Pay = () => {
  const { user } = useAuthStore();
  const { receiverInfo, setReceiverInfo } = usePayStore();
  const { orders, addOrder, today } = usePayStore();
  const { cartItems, checkedTotalPrice } = useCartStore();
  const filteredCart = cartItems.filter((c) => c.checked);
  const itemFirstValue = filteredCart[0] || null;
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [rememberAddress, setRememberAddress] = useState('');
  const handleComplete = (data) => {
    const fullAddress = data.address;
    setReceiverInfo({ ...receiverInfo, address: fullAddress });
    setRememberAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  const handleUserInfo = () => {
    setReceiverInfo({
      displayName: user.displayName,
      phone: user.phone,
      address: user.address,
      address2: user.address2,
      request: '',
    });
  };

  console.log('뭐가 들어있는데?', filteredCart);

  const handlePaymentSuccess = () => {
    if (!itemFirstValue) return;

    const orderItem = {
      date: today,
      code: itemFirstValue.code,
      products: cartItems.map((item) => ({
        thumbImg: item.thumbImg,
        brand: item.brand,
        title: item.title,
        itemPrice: item.price * 0.8,
        color: item.color,
        size: item.size,
        count: item.count,
      })),
      reward: Math.floor(checkedTotalPrice * 0.8).toLocaleString(),
      price: checkedTotalPrice,
    };

    addOrder(orderItem);
    setShowPopup(true);
  };
  console.log('값좀 들어가라', orders);

  const [selectPay, setSelectPay] = useState('card');

  const [openDepth, setOpenDepth] = useState(null);

  const [selectValue, setSelectValue] = useState({
    card: [],
    pay: [],
    bank: [],
  });

  const [showPopup, setShowPopup] = useState(false);

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
                <span>{user?.displayName || null}</span>
              </div>
            </div>

            <div className="address-wrap">
              <div className="address-top">
                <span>배송지</span>
                <div className="address-btn">
                  <button className="btn xsmall grey" onClick={handleUserInfo}>
                    주문자와 동일
                  </button>
                  <button className="btn xsmall grey">배송지 선택</button>
                </div>
              </div>
              <hr />
              <div className="address-bottom">
                <div className="address-input">
                  <span>수신자명 (필수)</span>
                  <input
                    type="text"
                    name="displayName"
                    placeholder="상품을 받으실 분의 이름을 입력해주세요."
                    value={receiverInfo.displayName}
                    onChange={(e) =>
                      setReceiverInfo({
                        ...receiverInfo,
                        displayName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="address-input">
                  <span>휴대폰번호(필수)</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="휴대폰 번호를 입력해주세요."
                    required
                    value={receiverInfo.phone}
                    onChange={(e) =>
                      setReceiverInfo({
                        ...receiverInfo,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="address-input delivery">
                  <span>
                    <span>배송지 주소</span>
                    <button className="btn xsmall primary" onClick={() => setIsPostcodeOpen(true)}>
                      주소검색
                    </button>
                  </span>
                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="상품을 받으실 분의 주소를 입력해주세요."
                      required
                      value={receiverInfo.address || rememberAddress}
                      onChange={(e) =>
                        setReceiverInfo({
                          ...receiverInfo,
                          address: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      name="address2"
                      placeholder="상세주소를 입력해주세요"
                      required
                      value={receiverInfo.address2}
                      onChange={(e) =>
                        setReceiverInfo({
                          ...receiverInfo,
                          address2: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="address-input">
                  <span>배송 요청사항</span>
                  <input
                    type="text"
                    name="request"
                    placeholder="배송기사에게 전달되는 메시지입니다."
                  />
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
            <PayPo onOpenPopup={handlePaymentSuccess} />
          </div>

          {isPostcodeOpen && (
            <>
              <div className="postcode-overlay" onClick={() => setIsPostcodeOpen(false)} />
              <div className="postcode-modal">
                <DaumPostcode onComplete={handleComplete} autoClose={false} />
                <button
                  type="button"
                  className="btn middle primary wFull"
                  onClick={() => setIsPostcodeOpen(false)}
                >
                  닫기
                </button>
              </div>
            </>
          )}
          {showPopup && <PayResultPopup onClose={() => setShowPopup(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Pay;

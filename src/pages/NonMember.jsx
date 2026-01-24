import React, { useEffect, useRef, useState } from 'react';
import './sass/NonMember.scss';
import PayItem from '../components/PayItem';
import NonCartPo from '../components/NonCartPo';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authstore';
import DaumPostcode from 'react-daum-postcode';

const NonMember = () => {
  const { onNMember, onNAddress, setNoncart } = useAuthStore();

  const { checkedTotalPrice, cartItems } = useCartStore();

  const checkedList = cartItems.filter((c) => c.checked);
  const navigate = useNavigate();

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [rememberAddress, setRememberAddress] = useState('');

  const [setIsRequestOpen] = useState(false);
  const requestBoxRef = useRef(null);

  const handleComplete = (data) => {
    const fullAddress = data.address;
    setRememberAddress(fullAddress);
    console.log('주소데이터', fullAddress);
    setNonAddress((prev) => ({
      ...prev,
      naddress: fullAddress,
    }));

    setIsPostcodeOpen(false);
  };

  const [nonFormDat, setNonFormData] = useState({
    oname: '',
    ophone: '',
    oemail: '',
    opassword: '',
    opasswordcheck: '',
  });
  const [nonAddress, setNonAddress] = useState({
    nname: '',
    nphone: '',
    naddress: '',
    naddress2: '',
    nrequest: '',
  });
  const handleNonFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const updateNform = { ...nonFormDat, [name]: value };
    setNonFormData(updateNform);
  };
  const handleNonAddress = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const updateNaddress = { ...nonAddress, [name]: value };
    setNonAddress(updateNaddress);
  };
  const handelsubmit = async () => {
    if (!nonFormDat.oname.trim()) {
      return alert('주문자 이름이 없습니다.');
    } else if (!nonFormDat.ophone.trim()) {
      return alert('주문자 전화번호가 없습니다.');
    } else if (!nonFormDat.oemail.trim()) {
      return alert('주문자 이메일이 없습니다.');
    } else if (!nonFormDat.opassword.trim()) {
      return alert('주문 비밀번호가 없습니다.');
    } else if (!nonFormDat.opasswordcheck.trim()) {
      return alert('주문 비밀번호가 없습니다.');
    } else if (!nonAddress.nname.trim()) {
      return alert('수령자 이름이 없습니다.');
    } else if (!nonAddress.nphone.trim()) {
      return alert('수령자 전화번호가 없습니다.');
    } else if (!nonAddress.naddress.trim()) {
      return alert('발송 주소가 없습니다.');
    } else if (!nonAddress.naddress2.trim()) {
      return alert('발송 상세주소가 없습니다.');
    } else if (!nonAddress.nrequest.trim()) {
      return alert('발송 요청사항이 없습니다.');
    }
    await onNMember(nonFormDat);
    await onNAddress(nonAddress);
    setNoncart({
      items: checkedList,
      totalPrice: checkedTotalPrice,
    });
    navigate('/nonpay');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (requestBoxRef.current && !requestBoxRef.current.contains(e.target)) {
        setIsRequestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sub-page">
      <div className="nonmember-inner">
        <h2 className="sub-page-title">비회원 주문결제</h2>
        <div className="nonmember-wrap">
          <div className="sub-inner-left">
            <div className="sub-inner-left-top">
              <div className="sub-order-inf">
                <p>주문자 정보</p>
                <form>
                  <label>
                    <span>주문자</span>
                    <input
                      type="text"
                      name="oname"
                      placeholder="이름을 입력해주세요."
                      onChange={(e) => handleNonFormData(e)}
                    />
                  </label>

                  <label>
                    <span>연락처</span>
                    <input
                      type="tel"
                      name="ophone"
                      placeholder="전화번호를 입력해주세요."
                      onChange={(e) => handleNonFormData(e)}
                    />
                  </label>

                  <label>
                    <span>이메일</span>
                    <input
                      type="email"
                      name="oemail"
                      placeholder="이메일을 입력해주세요."
                      onChange={(e) => handleNonFormData(e)}
                    />
                  </label>

                  <label>
                    <span>주문비밀번호</span>
                    <input
                      type="password"
                      name="opassword"
                      placeholder="비밀번호를 입력해주세요."
                      onChange={(e) => handleNonFormData(e)}
                    />
                  </label>

                  <label>
                    <span>비밀번호 확인</span>
                    <input
                      type="password"
                      name="opasswordcheck"
                      placeholder="비밀번호 확인"
                      onChange={(e) => handleNonFormData(e)}
                    />
                  </label>

                  <div></div>
                </form>
              </div>
              <div className="sub-address-inf">
                <p>배송지 정보</p>
                <form>
                  <label>
                    <span>이름</span>
                    <input
                      type="text"
                      name="nname"
                      onChange={(e) => handleNonAddress(e)}
                      placeholder="이름을 입력해주세요."
                    />
                  </label>

                  <label>
                    <span>연락처</span>
                    <input
                      type="tel"
                      name="nphone"
                      onChange={(e) => handleNonAddress(e)}
                      placeholder="전화번호를 입력해주세요."
                    />
                  </label>

                  <label className="address-label">
                    <span>주소</span>
                    <div>
                      <div className="add-inf-inner-top">
                        <input
                          type="text"
                          name="naddress"
                          placeholder="주소를 입력해주세요."
                          onChange={(e) => handleNonAddress(e)}
                          value={rememberAddress}
                        />
                        <button
                          type="button"
                          className="btn middle outline"
                          onClick={(e) => {
                            handleNonAddress(e);
                            setIsPostcodeOpen(true);
                          }}
                        >
                          주소검색
                        </button>
                      </div>
                      <input
                        type="text"
                        name="naddress2"
                        onChange={(e) => handleNonAddress(e)}
                        placeholder="상세주소를 입력해주세요."
                      />
                    </div>
                  </label>

                  <label ref={requestBoxRef} className="request-label">
                    <span>요청사항</span>
                    <div className="request-input-wrap">
                      <input
                        type="text"
                        name="nrequest"
                        placeholder="배송시 요청사항을 선택해주세요."
                        onChange={(e) => handleNonAddress(e)}
                      />
                    </div>
                  </label>
                  <div></div>
                </form>
              </div>
            </div>
            <p>주문상품</p>
            <div className="sub-inner-left-bottom">
              <PayItem />
            </div>
          </div>
          <NonCartPo sendNonData={handelsubmit} pirce={checkedTotalPrice} />
        </div>
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
    </div>
  );
};

export default NonMember;

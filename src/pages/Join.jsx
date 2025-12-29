import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import './sass/join.scss';
import { useAuthStore } from '../store/authstore';

const Join = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    displayName: '',
    phone: '',
    email: '',
    address: '',
    address2: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const { onMember } = useAuthStore();
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [rememberAddress, setRememberAddress] = useState('');

  const [allAgree, setAllAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [serviceAgree, setServiceAgree] = useState(false);

  const handleAllAgree = () => {
    const newValue = !allAgree;
    setAllAgree(newValue);
    setPrivacyAgree(newValue);
    setServiceAgree(newValue);
  };

  const handlePrivacyAgree = () => {
    const newValue = !privacyAgree;
    setPrivacyAgree(newValue);

    if (!newValue || !serviceAgree) {
      setAllAgree(false);
    } else {
      setAllAgree(true);
    }
  };

  const handleServiceAgree = () => {
    const newValue = !serviceAgree;
    setServiceAgree(newValue);

    if (!newValue || !privacyAgree) {
      setAllAgree(false);
    } else {
      setAllAgree(true);
    }
  };

  const handleComplete = (data) => {
    const fullAddress = data.address;
    setFormData({ ...formData, address: fullAddress });
    setRememberAddress(fullAddress);
    setIsPostcodeOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onMember(formData);
    alert('회원가입을 성공적으로 완료했습니다');
    navigate('/');
  };
  const handleIdCheck = (e) => {
    alert('사용 가능한아아디입니다.');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    if (name === 'password' || name === 'passwordCheck') {
      setPasswordTouched(true);

      if (updatedForm.password && updatedForm.passwordCheck) {
        setPasswordMatch(updatedForm.password === updatedForm.passwordCheck);
      } else {
        setPasswordMatch(null);
      }
    }
  };
  return (
    <div className="sub-page">
      <div className="join-inner">
        <div className="join-wrap">
          <h2 className="section-title">회원가입</h2>
          <p>H.Point 통합회원 회원가입</p>
        </div>
        <form className="join-form" onSubmit={handleSubmit}>
          <label>
            <span className="label-tag">아이디</span>
            <span className="id-input-tag">
              <input
                type="text"
                name="id"
                placeholder="아이디를 입력해주세요"
                onChange={handleChange}
                required
              />
              <button className="btn middle outline" type="button" onClick={handleIdCheck}>
                중복확인
              </button>
            </span>
          </label>
          <label>
            <span className="label-tag">비밀번호</span>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span className="label-tag">비밀번호확인</span>
            <span className="pass-input-tag">
              <input
                type="password"
                name="passwordCheck"
                placeholder="비밀번호를 재입력해주세요"
                onChange={handleChange}
              />
              {passwordTouched && passwordMatch === false && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
              {passwordTouched && passwordMatch === true && (
                <span style={{ color: 'green', fontSize: '14px' }}> 비밀번호가 일치합니다! </span>
              )}
            </span>
          </label>
          <label>
            <span className="label-tag">이름</span>
            <input
              type="text"
              name="displayName"
              placeholder="이름를 입력해주세요"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span className="label-tag">전화번호</span>
            <input
              type="tel"
              name="phone"
              placeholder="전화번호를 입력해주세요"
              onChange={handleChange}
            />
          </label>
          <label>
            <span className="label-tag">이메일</span>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span className="label-tag">주소</span>
            <span className="address-input-tag">
              <span className="address-input-tag-top">
                <input
                  type="text"
                  name="address"
                  placeholder="주소를 검색해주세요"
                  onChange={handleChange}
                  value={rememberAddress}
                />
                <button
                  className="btn middle outline"
                  type="button"
                  onClick={() => setIsPostcodeOpen(true)}
                >
                  주소검색
                </button>
              </span>
              <span className="address-input-tag-bot">
                <input
                  type="text"
                  name="address2"
                  placeholder="상세주소를 입력해주세요"
                  onChange={handleChange}
                />
              </span>
            </span>
          </label>

          <div className="join-button-wrap">
            <div className="join-policy-wrap">
              <div className="join-all-agree-wrap">
                <input type="checkbox" checked={allAgree} onChange={handleAllAgree} />
                <span>전체동의</span>
              </div>
              <div className="privacy-agree">
                <label>
                  개인정보 수집 및 이용동의(필수)
                  <input type="checkbox" checked={privacyAgree} onChange={handlePrivacyAgree} />
                </label>
                <p>
                  <span>
                    [개인정보 수집 및 이용 동의] <br></br>1. 수집하는 개인정보 항목 - 필수: 이름,
                    이메일, 휴대폰 번호, 주소 - 선택: 생년월일, 성별 2. 수집 및 이용 목적 - 회원
                    관리 및 서비스 제공 - 주문/배송 처리 및 결제 확인 - 고객 문의 응대 및 불만 처리
                    - 마케팅 정보 제공(선택 동의 시) 3. 보유 및 이용 기간 - 회원 탈퇴 시까지 보유 및
                    이용 - 관련 법령에 의거 필요 시 일정 기간 보관 가능 4. 제3자 제공 - 이용자 동의
                    없이는 제3자 제공하지 않음 - 단, 배송업체 등 서비스 제공을 위해 필요한 경우
                    제한적 제공 [개인정보 수집 및 이용 동의] <br></br>1. 수집하는 개인정보 항목 -
                    필수: 이름, 이메일, 휴대폰 번호, 주소 - 선택: 생년월일, 성별 2. 수집 및 이용
                    목적 - 회원 관리 및 서비스 제공 - 주문/배송 처리 및 결제 확인 - 고객 문의 응대
                    및 불만 처리 - 마케팅 정보 제공(선택 동의 시) 3. 보유 및 이용 기간 - 회원 탈퇴
                    시까지 보유 및 이용 - 관련 법령에 의거 필요 시 일정 기간 보관 가능 4. 제3자 제공
                    - 이용자 동의 없이는 제3자 제공하지 않음 - 단, 배송업체 등 서비스 제공을 위해
                    필요한 경우 제한적 제공 [개인정보 수집 및 이용 동의] <br></br>1. 수집하는
                    개인정보 항목 - 필수: 이름, 이메일, 휴대폰 번호, 주소 - 선택: 생년월일, 성별 2.
                    수집 및 이용 목적 - 회원 관리 및 서비스 제공 - 주문/배송 처리 및 결제 확인 -
                    고객 문의 응대 및 불만 처리 - 마케팅 정보 제공(선택 동의 시) 3. 보유 및 이용
                    기간 - 회원 탈퇴 시까지 보유 및 이용 - 관련 법령에 의거 필요 시 일정 기간 보관
                    가능 4. 제3자 제공 - 이용자 동의 없이는 제3자 제공하지 않음 - 단, 배송업체 등
                    서비스 제공을 위해 필요한 경우 제한적 제공
                  </span>
                </p>
              </div>
              <div className="service-agree">
                <label>
                  서비스 이용약관 동의(필수)
                  <input type="checkbox" checked={serviceAgree} onChange={handleServiceAgree} />
                </label>
                <p>
                  <span>
                    [서비스 이용약관]<br></br> 1. 회원가입 및 계정 관리 - 회원가입 시 정확한 정보를
                    입력해야 합니다. - 계정 및 비밀번호 관리 책임은 회원에게 있습니다. 2. 서비스
                    제공 및 이용 - 쇼핑몰은 상품 판매 및 정보 제공을 위한 서비스를 제공합니다. -
                    상품 정보, 가격, 재고는 변동될 수 있으며 쇼핑몰은 이를 고지할 책임이 있습니다.
                    3. 결제, 환불 및 배송 - 결제는 안전하게 처리되며, 환불은 쇼핑몰 정책에 따릅니다.
                    - 배송은 등록된 주소를 기준으로 이루어지며 배송 지연 시 안내를 받습니다. 4. 금지
                    사항 - 타인의 개인정보 도용, 비정상적인 결제, 허위 게시글 작성 등을 금지합니다.
                    - 위반 시 서비스 이용이 제한될 수 있습니다. 5. 기타 - 쇼핑몰은 서비스 운영을
                    위해 약관을 수정할 수 있으며, 변경 시 회원에게 고지합니다. [서비스 이용약관]
                    <br></br> 1. 회원가입 및 계정 관리 - 회원가입 시 정확한 정보를 입력해야 합니다.
                    - 계정 및 비밀번호 관리 책임은 회원에게 있습니다. 2. 서비스 제공 및 이용 -
                    쇼핑몰은 상품 판매 및 정보 제공을 위한 서비스를 제공합니다. - 상품 정보, 가격,
                    재고는 변동될 수 있으며 쇼핑몰은 이를 고지할 책임이 있습니다. 3. 결제, 환불 및
                    배송 - 결제는 안전하게 처리되며, 환불은 쇼핑몰 정책에 따릅니다. - 배송은 등록된
                    주소를 기준으로 이루어지며 배송 지연 시 안내를 받습니다. 4. 금지 사항 - 타인의
                    개인정보 도용, 비정상적인 결제, 허위 게시글 작성 등을 금지합니다. - 위반 시
                    서비스 이용이 제한될 수 있습니다. 5. 기타 - 쇼핑몰은 서비스 운영을 위해 약관을
                    수정할 수 있으며, 변경 시 회원에게 고지합니다. [서비스 이용약관]<br></br> 1.
                    회원가입 및 계정 관리 - 회원가입 시 정확한 정보를 입력해야 합니다. - 계정 및
                    비밀번호 관리 책임은 회원에게 있습니다. 2. 서비스 제공 및 이용 - 쇼핑몰은 상품
                    판매 및 정보 제공을 위한 서비스를 제공합니다. - 상품 정보, 가격, 재고는 변동될
                    수 있으며 쇼핑몰은 이를 고지할 책임이 있습니다. 3. 결제, 환불 및 배송 - 결제는
                    안전하게 처리되며, 환불은 쇼핑몰 정책에 따릅니다. - 배송은 등록된 주소를
                    기준으로 이루어지며 배송 지연 시 안내를 받습니다. 4. 금지 사항 - 타인의 개인정보
                    도용, 비정상적인 결제, 허위 게시글 작성 등을 금지합니다. - 위반 시 서비스 이용이
                    제한될 수 있습니다. 5. 기타 - 쇼핑몰은 서비스 운영을 위해 약관을 수정할 수
                    있으며, 변경 시 회원에게 고지합니다.
                  </span>
                </p>
              </div>
            </div>
            <button className="btn middle primary" type="submit">
              회원가입
            </button>
          </div>
        </form>
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

export default Join;

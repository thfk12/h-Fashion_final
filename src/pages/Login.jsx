import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sass/Login.scss';
import NoMemberLogin from '../components/NoMemberLogin';
import MemberLogin from '../components/MemberLogin';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [noMember, setNoMember] = useState(false);
  const handleSelect = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setNoMember(!noMember);
  };
  return (
    <div className="sub-page">
      <div className="inner">
        <div className="login-wrap">
          <h2 className="section-title">로그인</h2>
          <ul className="tab-ver1">
            <li className={isLogin === true ? 'active' : ''}>
              <Link onClick={handleSelect}>회원</Link>
            </li>
            <li className={noMember === true ? 'active' : ''}>
              <Link onClick={handleSelect}>비회원</Link>
            </li>
          </ul>

          {isLogin ? <MemberLogin /> : <NoMemberLogin />}
          <div className="button-grid-wrap-half">
            <button
              type="button"
              className="btn middle outline"
              onClick={() => window.open('https://www.hfashionmall.com/public/member/login')}
            >
              H FASHION 회원
            </button>
            <Link className="btn middle outline" to="/join">
              지금 회원가입하러 가기
            </Link>
          </div>
          <div>
            <h1>이메일 : aaaa@gmail.com</h1>
            <h1>비밀번호 : zhddl0815</h1>
            <h1>이메일 : abc@naver.com</h1>
            <h1>비밀번호 : qwer1234</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

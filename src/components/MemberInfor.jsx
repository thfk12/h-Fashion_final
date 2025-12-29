import React, { useState } from 'react';
import { useAuthStore } from '../store/authstore';
import UserInfoLeftMenu from './UserInfoLeftMenu';
import './sass/MemberInfor.scss';
import './sass/button-normal.scss';
import { useNavigate } from 'react-router-dom';

const MemberInfor = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  if (!user) {
    return (
      <div className="sub-page">
        <div className="content-inner">
          <div className="go-login">
            <p>로그인이 필요한 서비스입니다</p>
            <button className="btn middle primary" onClick={() => navigate('/login')}>
              로그인 페이지로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  const maskdePassword = user.password
    ? "*".repeat(user.password.length)
    : "********";

  return (
    <div className="sub-page">
      <div className="channel-wrap">
        <div className="channel"></div>
      </div>
      <div className="content-inner memberinfo">
        <div className="user-info-left">
          <UserInfoLeftMenu />
        </div>

        <div className="user-info-right">
          <div className="section">
            <div className="section-title">{`${user.displayName}님의 회원 정보`}</div>
            <div className="user-information">
              <div className="information-box">
                <p className="info-th">아이디</p>
                <p className="info-td">{user.id}</p>
              </div>
              <div className="information-box">
                <p className="info-th">이름</p>
                <p className="info-td">{user.displayName}</p>
              </div>
              <div className="information-box">
                <p className="info-th">비밀번호</p>
                <div className="info-td">
                  <p className="password">
                    {showPassword ? user.password : maskdePassword}
                  </p>
                  <button
                    className="btn small outline"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '숨기기' : '비밀번호 확인'}
                  </button>
                </div>
              </div>
              <div className="information-box">
                <p className="info-th">휴대폰 번호</p>
                <p className="info-td">{user.phone}</p>
              </div>
              <div className="information-box">
                <p className="info-th">이메일</p>
                <p className="info-td">{user.email}</p>
              </div>
              <div className="information-box">
                <p className="info-th">주소</p>
                <p className="info-td">
                  {user.address}
                  {"  "}
                  {user.address2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfor;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authstore';
import './sass/MemberLogin.scss';

const MemberLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const { onLogin, onGoogleLogin } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberId(true);
    }
  }, []);
  const handleRememberIdChange = (e) => {
    const isChecked = e.target.checked;
    setRememberId(isChecked);

    if (!isChecked) {
      localStorage.removeItem('savedEmail');
    }
  };
  const { onKakaoLogin } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rememberId) {
      localStorage.setItem('savedEmail', email);
    }
    await onLogin(email, password);
    navigate('/');
  };
  const handleGoogleLogin = async (e) => {
    await onGoogleLogin();
    navigate('/');
  };
  const handleKakaoLogin = async () => {
    await onKakaoLogin(navigate);
  };

  return (
    <form className="login-wrap" onSubmit={handleSubmit}>
      <div className="input-wrap">
        <input
          type="email"
          value={email}
          required
          placeholder="아이디 또는 이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          required
          placeholder="비밀번호 입력 (8~15자리 영문+숫자+특수문자 조합)"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="idTag">
        <label className="rememberId">
          <input type="checkbox" checked={rememberId} onChange={handleRememberIdChange} />
          아이디 저장
        </label>
        <p className="findIdPw">
          <span className="findId">
            <Link>아이디 찾기</Link>
          </span>
          <span className="findPw">
            <Link>비밀번호 찾기</Link>
          </span>
        </p>
      </div>
      <div className="button-grid-wrap">
        <button type="submit" className="btn middle primary" onSubmit={onLogin}>
          로그인하기
        </button>
        <button type="button" className="btn middle outline" onClick={handleGoogleLogin}>
          구글 로그인
        </button>
        <button type="button" className="btn middle outline kakao" onClick={handleKakaoLogin}>
          Kakao 로그인
        </button>
      </div>
    </form>
  );
};

export default MemberLogin;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authstore';
import './sass/Footer.scss';

const Footer = () => {
  const { user } = useAuthStore();

  return (
    <footer>
      <div className="inner">
        <div className="footer-inner-left">
          <h1 className="footer-logo">
            <img src="/images/logo-footer-white.png" alt="푸터로고" />
          </h1>
          <div className="footer-address">
            <div className="address-top">
              <div className="address-top1">
                <address>
                  <span>(주)한섬</span>
                  <span>|</span>
                  <span>대표이사:김민덕</span>
                  <span>|</span>
                  <span>사업자등록번호:120-81-26337</span>
                  <span>|</span>
                  <span>통신판매업신고 : 제 2009-서울강남-00826 호</span>
                  <span>|</span>
                  <span>개인정보보호책임자 : 윤인수 </span>
                </address>
              </div>
              <div className="address-top2">
                <div className="contact">
                  <span>전화 1800-5700(유료)</span>
                  <span>팩스 02-476-8169</span>
                  <span>이메일 hfashionmall@hyundaihmall.com</span>
                </div>
                <div className="copy">
                  <span>COPYRIGHT 2023 HANDSOME CO.LTD.ALL RIGHTS RESERVED </span>
                </div>
              </div>
            </div>
            <div className="address-bottom">
              <span>호스팅서비스 : (주)한섬</span>
              <span>사업자정보확인</span>
              <span>채무지급보증안내</span>
            </div>
          </div>
        </div>
        <div className="footer-inner-right">
          <div className="footer-inner-right-top">
            <div className="sns-list">
              <ul>
                <li>
                  <Link
                    to="https://www.facebook.com/Hfashionmall"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/sns-facebook-icon.svg" alt="facebook" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.instagram.com/hfashion_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/sns-insta-icon.svg" alt="insta" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://blog.naver.com/h_edit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/sns-naver-icon.svg" alt="naver" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-login">
              {user ? (
                <>
                  <div className="login-btn hide">
                    <button></button>
                  </div>
                </>
              ) : (
                <>
                  <button className="login-btn">
                    <Link to="/login">로그인/회원가입</Link>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="footer-inner-right-bottom"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

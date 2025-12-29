import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sass/Error404.scss';

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="Error404">
      <p className="error-num">404 error</p>
      <p className="main-post">
        <span>죄송합니다.</span>
        <span>요청하신 스토어를 찾을 수 없습니다.</span>
      </p>
      <p className="sub-post">
        <span>불편을 드려 죄송합니다. </span>
        <span>해당 페이지는 이동되었거나 삭제되었거나,</span>
        <span>존재하지 않는 주소일 수 있습니다. </span>
        <span>쇼핑몰 홈으로 돌아가 더 많은 상품과 콘텐츠를 만나보세요.</span>
      </p>
      <div className="btn-box">
        <Link to="/" className="btn middle primary">
          메인 페이지
        </Link>
        <button onClick={goBack} className="btn middle secondary">
          이전 페이지
        </button>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useState } from 'react';
import './sass/ProductQNA.scss';

const ProductQNA = () => {
  const [toggle, setToggle] = useState(null);

  const handleToggle = (index) => {
    setToggle(toggle === index ? null : index);
  };

  return (
    <>
      <div className="qna-header">
        <h3>상품 Q&A</h3>
        <p className="header-text">
          상품에 대한 배송, 교환, 취소등의 자세한 문의 사항은 고객센터 1:1문의를 이용하여 주시기
          바랍니다.
        </p>
      </div>

      <div className="qna-list-wrap">
        <div className="qna-list-box">
          <div className="qna-list">
            <div className="number-list">2</div>
            <div className="list-item">
              <div className="top-item">
                <p className="user-id">lalala*****</p>
                <p className="split">|</p>
                <p className="upload-date">2025.11.02</p>
                <p className="split">|</p>
                <p className="answer-complete">답변완료</p>
              </div>
              <div className="item-qna-title">
                <p className="qna-title">상품 관련 문의입니다.</p>
              </div>
            </div>
            <button className="qna-list-door" type="button" onClick={() => handleToggle(0)}>
              <img
                src="/images/arrow-down-icon.svg"
                alt="door"
                className={toggle === 0 ? 'arrow up' : 'arrow'}
              />
            </button>
          </div>
        </div>

        <div className={`answer-list-box ${toggle === 0 ? 'open' : ''}`}>
          <p className="answer-qnaTitle">품절된 제품 언제쯤 입고되는지 알고 싶습니다.</p>
          <div className="customer-service">
            <img src="/images/icon-reply-solid.svg" alt="answerImg" />
            <p className="service-center">[고객센터 답변]</p>
            <p className="answer-date">2025.11.11</p>
          </div>
          <div className="answer-customer">
            <p className="answer-customer-text">
              안녕하세요, 고객님 <br />
              현대패션몰을 이용해 주셔서 감사합니다. <br />
              사용기한 1년 이상 남은 제품으로 순차적으로 발송합니다. <br />
              감사합니다.
            </p>
          </div>
        </div>

        <div className="qna-list-box">
          <div className="qna-list">
            <div className="number-list">1</div>
            <div className="list-item">
              <div className="top-item">
                <p className="user-id">ezen*****</p>
                <p className="split">|</p>
                <p className="upload-date">2025.10.01</p>
                <p className="split">|</p>
                <p className="answer-wait">답변대기</p>
              </div>
              <div className="item-qna-title">
                <img src="/images/icon-lock.svg" alt="lock" className="lock-img" />
                <p className="qna-title">상품 관련 문의입니다.</p>
              </div>
            </div>
            <button className="qna-list-door">
              <img src="/images/arrow-down-icon.svg" alt="door" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductQNA;

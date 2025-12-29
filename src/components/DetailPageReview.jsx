import React from 'react';
import ReviewCard from './ReviewCard';
import './sass/DetailPageReview.scss';

const DetailPageReview = ({ product }) => {
  const reviewCount = 2;

  return (
    <section>
      <div className="section-title">
        <h3>리뷰</h3>
        <p className="best-review">
          포토/동영상 리뷰 1,000M, 텍스트 리뷰 300M, 첫리뷰 2,000M를 드립니다.
        </p>
      </div>
      <dl className="best-review like-btn">
        <dt>아주 좋아요</dt>
        <dd>29</dd>
        <dt>마음에 들어요</dt>
        <dd>1</dd>
        <dt>보통이예요</dt>
        <dd>3</dd>
        <dt>그냥 그래요</dt>
        <dd>0</dd>
        <dt>별로예요</dt>
        <dd>0</dd>
      </dl>
      <ul className="review-box-list">
        {Array.from({ length: reviewCount }).map((_, index) => (
          <li key={index}>
            <ReviewCard item={product} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DetailPageReview;

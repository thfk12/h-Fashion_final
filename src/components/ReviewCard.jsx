import React from 'react';
import './sass/ReviewCard.scss';

const ReviewCard = ({ item, index = 0 }) => {
  const imageList = item.slide && item.slide.length > 0 ? item.slide : [item.thumbImg];
  const imgSrc = imageList[index % imageList.length];

  return (
    <div className="review-card">
      <div className="img-box">
        <img src={imgSrc} alt={item.title} />
      </div>

      <div className="review-item-box">
        <div className="item-top">
          <p className="brand-name">{item.brand}</p>
          <p className="review-text">
            넉넉하게 잘 맞아요~소매가 리뷰에서 듣던 대로 길어요부드럽고 깔끔해서 마음에 들어요
          </p>
        </div>
        <div className="item-bottom">
          <p className="product-name">{item.title}</p>
          <div className="rating-box">
            <span>평점</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((num) => (
                <img
                  key={num}
                  src={
                    num <= item.rating
                      ? '/images/icon-star-black.svg'
                      : '/images/icon-star-white.svg'
                  }
                  alt="star"
                  className="star-icon"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

import React from 'react';
import './sass/MainBestReview.scss';
import { useProductStore } from '../store/useProductStore.js';
import ReviewCard from './ReviewCard.jsx';

const MainBestReview = () => {
  const { items } = useProductStore();
  const targetCategories = ['cateman pants', 'catewomen skirt', 'sundries man etc'];
  const filtered = items.filter((p) => targetCategories.includes(p.category) && p.rating === 5);

  const result = targetCategories
    .map((cat) => filtered.find((p) => p.category === cat))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section>
      <h2>BEST REVIEW</h2>
      <div className="container">
        <div className="review-box-list">
          <ul className="review-box-list">
            {result.map((p) => {
              const thumbImgOnlyItem = {
                ...p,
                detail: [],
                slide: [],
              };

              return (
                <li key={p.code}>
                  <ReviewCard item={thumbImgOnlyItem} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MainBestReview;

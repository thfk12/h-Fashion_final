import React, { useEffect, useMemo, useState } from 'react';
import { useProductStore } from '../store/useProductStore';
import { usePickStore } from '../store/usePickStore';
import './sass/MainCategoryNew.scss';
import { Link } from 'react-router-dom';

const VISIBLE_COUNT = 4;

const MainCategoryNew = () => {
  const { items, onFetchItem } = useProductStore();
  const [activeTab, setActiveTab] = useState('WOMEN');
  const { pickLists, onAddWishList } = usePickStore();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    onFetchItem();
  }, [onFetchItem]);

  const filteredItems = useMemo(() => {
    switch (activeTab) {
      case 'WOMEN':
        return items.filter((item) => item.category.includes('women skirt'));

      case 'MEN':
        return items.filter((item) => item.category.includes('man outer'));

      case 'BAG_ACC':
        return items.filter((item) => item.category.includes('sundries women bag'));

      case 'GOLF':
        return items.filter((item) => item.category.includes('golf etc'));

      default:
        return items;
    }
  }, [items, activeTab]);

  const maxIndex = Math.max(0, filteredItems.length - VISIBLE_COUNT);
  const visibleItems = filteredItems.slice(startIndex, startIndex + VISIBLE_COUNT);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
    setStartIndex(0);
  };

  const handleAddToWishlist = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    const isAlreadyPicked = pickLists.some((p) => p.code === item.code);
    if (isAlreadyPicked) {
      alert('이미 찜목록에 추가된 상품입니다.');
      return;
    }

    onAddWishList(item);
  };

  const categoryPaths = {
    WOMEN: '/women/women-skirt',
    MEN: '/men/man-outer',
    BAG_ACC: '/sundries/sundries-women-bag',
    GOLF: '/golf/golf-acc',
  };

  return (
    <section>
      <h2>CATEGORY NEW</h2>
      <div className="container">
        <div className="categorynew-tabs">
          <button
            className={activeTab === 'WOMEN' ? 'active' : ''}
            onClick={() => handleChangeTab('WOMEN')}
          >
            WOMEN
          </button>
          <button
            className={activeTab === 'MEN' ? 'active' : ''}
            onClick={() => handleChangeTab('MEN')}
          >
            MEN
          </button>
          <button
            className={activeTab === 'BAG_ACC' ? 'active' : ''}
            onClick={() => handleChangeTab('BAG_ACC')}
          >
            BAG & ACC
          </button>

          <button
            className={activeTab === 'GOLF' ? 'active' : ''}
            onClick={() => handleChangeTab('GOLF')}
          >
            GOLF
          </button>

          <Link to={categoryPaths[activeTab]} className="categorynew-tab-all">
            전체보기 <img src="/images/all-view-right-arrow.png" alt="전체보기" />
          </Link>
        </div>

        <div className="categorynew-slider-wrapper">
          <button className="arrow-btn left" onClick={handlePrev} disabled={startIndex === 0}>
            <img src="/images/button/btn-slide-prev.svg" alt="이전" />
          </button>

          <div className="categorynew-product-list">
            {visibleItems.map((item) => (
              <Link key={item.code} to={`/product-detail/${item.code}`} className="product-card">
                <button
                  type="button"
                  className="categorynew-likebtn"
                  onClick={(e) => handleAddToWishlist(e, item)}
                >
                  <img src="/images/plusLike.svg" alt="찜하기" />
                </button>

                <div className="categorynew-product-img">
                  <img src={item.thumbImg} alt={item.title} />
                </div>

                <div className="categorynew-overlay-info">
                  <p className="categorynew-name">{item.title}</p>
                  <p className="categorynew-price">
                    <span className="categorynew-sale-price">{item.price.toLocaleString()}원</span>

                    <del className="categorynew-original-price">
                      {Math.round(item.price * 1.25).toLocaleString()}원
                    </del>

                    <span className="categorynew-discount">20%</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            className="arrow-btn right"
            onClick={handleNext}
            disabled={startIndex === maxIndex}
          >
            <img src="/images/button/btn-slide-next.svg" alt="다음" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainCategoryNew;

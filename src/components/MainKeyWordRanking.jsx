import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sass/MainKeyWordRanking.scss";
import { menuRankProduct } from "../data/menuRankProduct.js";

const MainKeyWordRanking = () => {
  const [liMenu, setLiMenu] = useState(0);
  const navigate = useNavigate();

  const handleHover = (index) => {
    if (liMenu === index) return;
    setLiMenu(index);
  };
  const handleClick = (index) => {
    const link = menuRankProduct[index].link;
    if (link) navigate(link);
  };
  const handleMainImageClick = () => {
    const imgItem = menuRankProduct[liMenu].rightMainData[0];
    navigate(`/product-detail/${imgItem.code}`);
  };
  const handleRankClick = (code) => {
    navigate(`/product-detail/${code}`);
  };

  const originalPriceMain = Number(
    menuRankProduct[liMenu].rightMainData[0].price
  );
  const salePriceMain = Math.round(originalPriceMain * 0.8);

  return (
    <section className="KWR-wrap">
      <div className="main-sec-inner">
        <div className="sec-inner-left">
          <h2 className="section-title">
            KEYWORD
            <br />
            RANKING
          </h2>

          <div className="ranking-item-wrap">
            {menuRankProduct.map((item, index) => (
              <div key={index} className="ranking-item">
                <button
                  type="button"
                  onMouseEnter={() => handleHover(index)}
                  onClick={() => handleClick(index)}
                  className="accord-btn"
                >
                  <span className="accord-num">{item.id}</span>
                  {item.title}
                </button>
                <ul className={`rank-list ${liMenu === index ? "active" : ""}`}>
                  {item.rank.map((it, id) => (
                    <li
                      key={id}
                      style={{ backgroundImage: `url(${it.img})` }}
                      onClick={() => handleRankClick(it.code)}
                      className="rank-item"
                    >
                      <p className="brand-title">{it.brand}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {liMenu !== null && (
          <div className="sec-inner-right">
            <div
              className="kwr-main-img"
              style={{
                backgroundImage: `url(${menuRankProduct[liMenu].rightMainData[0].img})`,
              }}
              onClick={handleMainImageClick}
            >
              <div className="kwr-main-text-wrap">
                <div className="kwr-main-text">
                  <p className="item-title">
                    {menuRankProduct[liMenu].rightMainData[0].title}
                  </p>
                  <div className="price-item">
                    <p className="sale-price">
                      {salePriceMain.toLocaleString()}원
                    </p>
                    <p className="original-price">
                      {originalPriceMain.toLocaleString()}원
                    </p>
                    <p className="sale-num">20%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="kwr-sub-img-wrap">
              <div className="showing-khsn">
                <div className="top-item">
                  <p className="khsn-title">{menuRankProduct[liMenu].title}</p>
                  <p className="khsn-item">옷장의 계절을 바꿀 타이밍</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleClick(liMenu)}
                  className="more-btn"
                >
                  더보기
                </button>
              </div>
              {menuRankProduct[liMenu].rank.map((it) => {
                const originalPrice = Number(it.price);
                const salePrice = Math.round(originalPrice * 0.8);

                return (
                  <div
                    className="kwr-sub-img"
                    key={it.id}
                    style={{ backgroundImage: `url(${it.img})` }}
                    onClick={() => handleRankClick(it.code)}
                  >
                    <div className="kwr-sub-text-wrap">
                      <div className="kwr-sub-text">
                        <p className="title">{it.title}</p>
                        <div className="price-item">
                          <p className="sale-price">
                            {salePrice.toLocaleString()}원
                          </p>
                          <p className="original-price">
                            {originalPrice.toLocaleString()}원
                          </p>
                          <p className="sale-num">20%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainKeyWordRanking;

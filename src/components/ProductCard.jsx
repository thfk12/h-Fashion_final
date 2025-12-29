import React, { useState } from "react";
import "./sass/ProductCard.scss";
import { usePickStore } from "../store/usePickStore";

const ProductCard = ({ sendItem, isBestSeller = false, rank }) => {
  const [isActive, setIsActive] = useState(null);
  const { onAddWishList, pickLists } = usePickStore();
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(!isActive);
    onAddWishList(sendItem);
  };

  //
  const isPick = pickLists.some((pick) => pick.code === sendItem.code);
  const price = sendItem?.price ?? 0;

  return (
    <>
      <div className="img-box">
        <img src={sendItem.thumbImg} alt={sendItem.title} />

        {isBestSeller ? (
          <span className="best-rank">{rank}</span>
        ) : (
          <span
            className={`favorite ${isPick ? "active" : ""}`}
            onClick={handleFavoriteClick}
          ></span>
        )}
      </div>
      <div className="text-box">
        <p className="brand">{sendItem.brand}</p>
        <p className="title">
          <strong>{sendItem.title}</strong>
        </p>
        <p className="price">
          <span>
            <span className="sale-price">
              {(price * 0.8).toLocaleString()}원
            </span>
            <del>{price.toLocaleString()}</del>
          </span>
          <span className="sale">20%</span>
        </p>
      </div>
    </>
  );
};

export default ProductCard;

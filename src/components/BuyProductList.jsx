import React from "react";
import "./sass/BuyProductList.scss";
import { usePayStore } from "../store/usePayStore";
import { Link } from "react-router-dom";

const BuyProductList = () => {
  const orders = usePayStore((state) => state.orders);

  const truncateWords = (text, maxWords) => {
    if (!text) return "";

    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + " ..."
      : text;
  };

  return (
    <li className="buy-product-wrap">
      {orders.map((order, id) => {
        const firstProduct = order.products[0];

        return (
          <div className="send-product-box" key={id}>
            <div className="date-code-box">
              <p className="date">{order.date}</p>
              <p className="code">{order.code}</p>
            </div>

            <p className="gap-box">|</p>

            <div className="brand-name-box">
              <div className="img-box">
                <img src={firstProduct.thumbImg} alt="" />
              </div>
              <div className="product-item">
                <p className="brand-name">{firstProduct.brand}</p>
                <p className="product-name">
                  {truncateWords(firstProduct.title, 5)}
                  {order.products.length > 1 &&
                    ` 외 ${order.products.length - 1}건`}
                </p>

                <Link to="/userinfo/memberdelivery">
                  <button>상세정보</button>
                </Link>
              </div>
            </div>

            <p className="gap-box">|</p>

            <div className="product-price-box">
              <p className="product-price">
                {(order.price * 0.8).toLocaleString()}
              </p>
              <p className="unit">원</p>
            </div>
          </div>
        );
      })}
    </li>
  );
};

export default BuyProductList;

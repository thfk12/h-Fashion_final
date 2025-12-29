import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import './sass/CartOpChangePopup.scss';

// 상품 카테고리에 따른 사이즈 목록 생성
const getSizesByCategory = (category) => {
  // 카테고리 문자열이 유효하지 않으면 기본값 반환
  if (!category || typeof category !== "string") {
    return ["XS", "S", "M", "L", "XL"];
  }

  // category를 소문자로 변환하여 비교 (대소문자 무시)
  const lowerCaseCategory = category.toLowerCase();

  // 신발 (예: 'catewomen shoes'에 'shoes'가 포함)
  if (lowerCaseCategory.includes("shoes")) {
    const shoeSizes = [];
    for (let i = 230; i <= 280; i += 10) {
      shoeSizes.push(String(i));
    }
    return shoeSizes;
  }

  // 가방 (예: 'cate acc bag'에 'bag'이 포함)
  if (lowerCaseCategory.includes("bag")) {
    return ["FREE"];
  }

  // --- 하의 로직 수정 ---
  // 남자 팬츠 (예: 'cate man pants'에 'man'과 'pants'가 모두 포함)
  if (
    lowerCaseCategory.includes("man") &&
    lowerCaseCategory.includes("pants")
  ) {
    const manPantsSizes = [];
    // 요청하신 28부터 34까지 사이즈 생성
    for (let i = 28; i <= 34; i++) {
      manPantsSizes.push(String(i));
    }
    return manPantsSizes;
  }
  // 기타 하의 (여자 팬츠, 스커트 등. 'pants' 또는 'skirt' 포함)
  if (
    lowerCaseCategory.includes("pants") ||
    lowerCaseCategory.includes("skirt")
  ) {
    // 기존 24부터 30까지 사이즈 유지
    const bottomSizes = [];
    for (let i = 24; i <= 30; i++) {
      bottomSizes.push(String(i));
    }
    return bottomSizes;
  }
  // -----------------------

  // 상의 및 기타 (기본값)
  return ["XS", "S", "M", "L", "XL"];
};

const CartOpChangePopup = ({ product, onClose, item }) => {
  // const sizes = ["XS", "S", "M", "L", "XL"];
  // 현재 상품 카테고리에 해당하는 사이즈 목록을 계산
  // item이 로드된 후 product.category를 사용하거나, prop으로 받은 product.category를 사용
  const availableSizes = getSizesByCategory(
    item?.category || product?.category
  );

  const colors = ["pink", "sky", "white", "black"];

  const [selectSize, setSelectSize] = useState(item.size);
  const [selectColor, setSelectColor] = useState(item.color);
  const [count, setCount] = useState(item.count);
  const [price] = useState(item.price);

  const { updateCartOptions } = useCartStore();

  const handleItemSize = (size) => {
    setSelectSize(size);
  };

  const handleUpdate = () => {
    updateCartOptions(item.code, selectSize, selectColor, count);
    onClose();
  };

  return (
    <div className="cart-op-change-wrap">
      <div className="cart-op-popup" onClick={(e) => e.preventDefault()}>
        <div className="op-popup-title">
          <h2>옵션변경</h2>
        </div>

        <div className="op-popup-inner">
          <div className="op-popup-content">
            <div className="op-popup-middle">
              <div className="op-color-change">
                <p>색상 선택</p>
                <div className="color-option">
                  {colors.map((color, id) => (
                    <button
                      key={id}
                      className={`${color} ${
                        selectColor === color ? "active" : ""
                      }`}
                      onClick={() => setSelectColor(color)}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="op-size-change">
                <p>사이즈 선택 </p>
                <ul>
                  {availableSizes.map((size, id) => (
                    <li key={id}>
                      <button
                        className={selectSize === size ? "active" : ""}
                        onClick={() => setSelectSize(size)}
                      >
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="op-color-change">
                {colors.map((color, id) => (
                  <button
                    key={id}
                    className={`${color} ${selectColor === color ? 'active' : ''}`}
                    onClick={() => setSelectColor(color)}
                  ></button>
                ))}
              </div>
            </div>

            <div className="op-popup-bottom">
              <div className="op-count-change">
                <button
                  className="minus"
                  onClick={() => setCount((c) => Math.max(1, c - 1))}
                ></button>
                <span>{count}</span>
                <button className="plus" onClick={() => setCount((c) => c + 1)}></button>
              </div>

              <div className="op-change-price">
                <span>가격 : </span>
                <span className="price">
                  {(price * 0.8 * count).toLocaleString()}원{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="op-popup-button-wrap">
            <button
              className="btn middle secondary"
              type="button"
              onClick={onClose}
            >
              취소
            </button>
            <button className="btn middle primary " type="button" onClick={handleUpdate}>
              변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOpChangePopup;

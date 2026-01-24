import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import "./sass/ProductDetailRightInfo.scss";
import { useNavigate, useParams } from "react-router-dom";
import { usePickStore } from "../store/usePickStore";
import "./sass/button-normal.scss";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/authstore";

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
const colors = ["pink", "sky", "white", "black"];

const ProductDetailRightInfo = ({ product, onOpenPopup, onOpenPay }) => {
  const { code } = useParams();
  const nav = useNavigate("");
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("현재 페이지 주소가 복사되었습니다.");
    } catch (err) {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        alert("현재 페이지 주소가 복사되었습니다.");
      } catch (err) {
        alert("URL 복사에 실패했습니다. 직접 복사해 주세요.");
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };
  const { items, onFetchItem } = useProductStore();
  const { onAddWishList, pickLists } = usePickStore();
  const { onAddToCart, cartItems } = useCartStore();
  const { user } = useAuthStore();
  const [item, setItem] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [count, setCount] = useState(1);
  const [likeCount, setLikeCount] = useState(11);
  const availableSizes = getSizesByCategory(
    item?.category || product?.category
  );

  useEffect(() => {
    if (items.length === 0) {
      onFetchItem();
    }
    setSelectSize("");
    setSelectColor("");
    setCount(1);
  }, [code]);

  useEffect(() => {
    if (!code || items.length === 0) return;
    const findItem = items.find((it) => it.code === code);
    setItem(findItem);
  }, [code, items]);
  const handleAddToCart = () => {
    if (!selectColor) {
      alert("색상을 선택해주세요");
      return;
    } else if (!selectSize) {
      alert("사이즈를 선택해주세요");
      return;
    }
    const productCart = {
      ...item,
      size: selectSize,
      count: count,
      color: selectColor,
      checked: false,
    };

    let aa = cartItems.find(
      (c) =>
        c.code === productCart.code &&
        c.size === productCart.size &&
        c.color === productCart.color
    );
    if (!aa) {
      onAddToCart(productCart);
      onOpenPopup();
    } else {
      onAddToCart(productCart);
    }
    console.log("장바구니 데이터", cartItems);
  };
  const handlePay = () => {
    if (!selectColor) {
      alert("색상을 선택해주세요");
      return;
    } else if (!selectSize) {
      alert("사이즈를 선택해주세요");
      return;
    }
    const productCart = {
      ...item,
      size: selectSize,
      count: count,
      color: selectColor,
      checked: false,
    };
    const bb = cartItems.find(
      (b) =>
        b.code === productCart.code &&
        b.size === productCart.size &&
        b.color === productCart.color
    );
    if (!bb) {
      setTimeout(() => {
        nav(user ? "/pay" : "/nonmember");
      }, 500);
      onAddToCart(productCart);
      onOpenPay();
    } else {
      setTimeout(() => {
        nav(user ? "/pay" : "/nonmember");
      }, 500);
      onAddToCart(productCart);
      onOpenPay();
      alert("이미 장바구니에있는 상품입니다.");
    }
    console.log("색상,사이즈 저장", productCart);
  };
  const handleAddToPick = () => {
    onAddWishList(item);
    if (isPicked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
  };
  const currentProductCode = item?.code || product?.code;
  const isPicked = pickLists.some((pick) => pick.code === currentProductCode);
  return (
    <>
      <div className="detail-info">
        <div className="item-box">
          <div className="item-brand-favorite">
            <p className="brand">{product.brand}</p>
            <p className="favorite">
              <span className="favo">
                <i>{likeCount}</i>
                <span
                  className={isPicked ? "active" : ""}
                  onClick={handleAddToPick}
                ></span>
              </span>
              <span className="share" onClick={handleShare} role="button">
                <img src="/images/icon/icon-share.svg" alt="공유하기" />
              </span>
            </p>
          </div>

          <div className="item-code">{product.code}</div>
          <div className="item-title">{product.title}</div>
          <div className="item-price">
            <strong>{(product.price * 0.8).toLocaleString()}원</strong>
            <del>{product.price.toLocaleString()}</del>
            <span>20%</span>
          </div>
        </div>

        <div className="item-box">
          <div className="item-color">
            {colors.map((color, id) => (
              <button
                key={id}
                className={`${color} ${selectColor === color ? "active" : ""}`}
                onClick={() => setSelectColor(color)}
              ></button>
            ))}
          </div>

          <div className="item-size">
            <p>사이즈 선택 </p>
            <ul>
              {/* availableSizes를 사용 */}
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
        </div>

        <div className="item-info">
          <p>
            색상 : {selectColor} <span className="division">|</span> 사이즈 :{" "}
            {selectSize}
          </p>
          <p className="btn-count">
            <button
              className="minus"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
            ></button>
            <span>{count}</span>
            <button
              className="plus"
              onClick={() => setCount((c) => c + 1)}
            ></button>
          </p>
        </div>

        <div className="item-total">
          <span className="text">합계</span>
          <span className="num">
            {(product.price * 0.8 * `${count}`).toLocaleString()}
          </span>
        </div>

        <div className="cart-btn">
          <button className="btn middle primary" onClick={handleAddToCart}>
            장바구니
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handlePay();
            }}
            className="btn middle secondary"
          >
            바로구매
          </button>
        </div>

        <div className="item-box">
          <div className="rating">
            <p>
              {Array.from({ length: product.rating }, (_, index) => (
                <img
                  key={index}
                  src="/images/icon-star-black.svg"
                  alt="star-filled"
                />
              ))}
              {Array.from({ length: 5 - product.rating }, (_, index) => (
                <img
                  key={product.rating + index}
                  src="/images/icon-star-white.svg"
                  alt="star-empty"
                />
              ))}
            </p>
            <p>57 Reviews</p>
          </div>
          <ul className="etc-info">
            <li>
              <strong>배송비</strong>
              <span>30,000 이상 구매시 무료(도서산간추가 3000원)</span>
            </li>
            <li>
              <strong>한섬마일리지</strong>
              <span>최대 1% 적립</span>
            </li>
            <li>
              <strong>H포인트</strong>
              <span>0.1% 적립</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductDetailRightInfo;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../pages/sass/Breadcrumbs.scss";

const breadcrumbNameMap = {
  "/": "HOME",

  "/women": "여성",
  "/women/women-shirt": "상의",
  "/women/women-pants": "바지",
  "/women/women-skirt": "스커트",
  "/women/women-shoes": "슈즈",

  "/men": "남성",
  "/men/man-shirt": "상의",
  "/men/man-pants": "바지",
  "/men/man-outer": "아우터",
  "/men/man-shoes": "슈즈",

  "/sundries": "잡화",
  "/sundries/sundries-women-fashion": "여성 패션잡화",
  "/sundries/sundries-man-fashion": "남성 패션잡화",
  "/sundries/sundries-women-bag": "여성 가방",
  "/sundries/sundries-man-bag": "남성 가방",

  "/golf": "골프",
  "/golf/golf-women-outer": "여성 아우터",
  "/golf/golf-man-outer": "남성 아우터",
  "/golf/golf-women-pants": "여성 팬츠",
  "/golf/golf-man-pants": "남성 팬츠",
  "/golf/golf-acc": "ACC",

  "/brand": "브랜드관",
  "/brand/brand-rouge": "루즈앤라운지",
  "/brand/brand-sjyp": "SJYP",
  "/brand/brand-tommy": "타미힐피거",

  "/cart": "장바구니",
  "/userinfo": "마이페이지",
  "/picklist": "찜 리스트",
  "/pay": "주문서",
  "/login": "로그인",
  "/join": "회원가입",
  "/userinfo/memberdelivery": "주문 / 배송조회",
  "/userinfo/memberinfor": "회원 정보",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const pathnames = pathname.split("/").filter((x) => x);

  if (pathname === "/" || pathname.startsWith("/product-detail")) {
    return null;
  }

  const crumbs = pathnames.map((value, index) => {
    const to = "/" + pathnames.slice(0, index + 1).join("/");
    const baseTo =
      index === 0 && value === "product-detail" ? "/product-detail" : to;

    return {
      to,
      label: breadcrumbNameMap[baseTo] || value,
      isLast: index === pathnames.length - 1,
    };
  });

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <span className="current-home">HOME </span>
      {crumbs.map((crumb) => (
        <span key={crumb.to}>
          <span className="separator">{">"}</span>
          {crumb.isLast ? (
            <span className="current">{crumb.label}</span>
          ) : (
            <Link to={crumb.to}> {crumb.label} </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

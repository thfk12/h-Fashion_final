import React, { useEffect, useMemo, useRef, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import "./sass/ProductListPage.scss";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

const BrandListPage = ({ brand }) => {
  const { onItemsBrand, onFetchItem } = useProductStore();
  const allItems = useMemo(() => {
    return onItemsBrand(brand);
  }, [brand, onItemsBrand]);
  const [items, setItems] = useState(allItems);
  const [activeFilter, setActiveFilter] = useState(0);
  const [rightFilter, setRightFilter] = useState(false);
  const [filterName, setFilterName] = useState("신 상품순");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterPrice2, setFilterPrice2] = useState("");
  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination(items, 30, brand);
  const itemMades = allItems
    .map((item) => item.made)
    .filter((m, id, all) => all.indexOf(m) === id);
  const priceRange = [
    { name: "10만원 이하", value: 99999 },
    { name: "10만원 - 20만원", value: 100000 },
    { name: "20만원 - 30만원", value: 200000 },
    { name: "30만원이상", value: 300000 },
  ];
  const filterRef = useRef(null);
  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setRightFilter(false);
    }
  };
  useEffect(() => {
    onFetchItem();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onFetchItem]);
  const handlePrice = (pi) => {
    const match = allItems.filter((item) => item.price * 0.8 < pi);
    const match2 = allItems.filter(
      (item) => item.price * 0.8 >= pi && item.price * 0.8 < pi + 100000
    );
    const match3 = allItems.filter((item) => item.price * 0.8 > pi);
    if (pi === 99999) {
      setItems(match);
    } else if (pi === 300000) {
      setItems(match3);
    } else {
      setItems(match2);
    }
  };
  const handleBrand = (brand) => {
    const match = allItems.filter((item) => item.brand === brand);
    setItems(match);
  };
  const handleCountry = (made) => {
    const match = allItems.filter((item) => item.made === made);
    setItems(match);
  };
  const rememberP = (e) => {
    setFilterPrice(Number(e.target.value));
  };
  const rememberP2 = (e) => {
    setFilterPrice2(Number(e.target.value));
  };
  const sortByPriceAsc = () => {
    const sortedItems = [...items].sort(
      (a, b) => a.price * 0.8 - b.price * 0.8
    );
    setFilterName("낮은가격순");
    setItems(sortedItems);
  };
  const sortByPriceDesc = () => {
    const sortedItems = [...items].sort(
      (a, b) => b.price * 0.8 - a.price * 0.8
    );
    setFilterName("높은가격순");
    setItems(sortedItems);
  };
  const sortByNewest = () => {
    const sortedItems = [...items].sort((a, b) => {
      const dateA = Number(a.date.replace(".", ""));
      const dateB = Number(b.date.replace(".", ""));
      return dateB - dateA;
    });
    setFilterName("신상품순");
    setItems(sortedItems);
  };
  const sortOptions = [
    { name: "신상품순", handler: sortByNewest },
    { name: "낮은가격순", handler: sortByPriceAsc },
    { name: "높은가격순", handler: sortByPriceDesc },
  ];
  const itemBrands = allItems
    .map((item) => item.brand)
    .filter((brand, index, self) => self.indexOf(brand) === index);
  const checkPrice = () => {
    const prcieFinalItem = allItems.filter(
      (i) => filterPrice <= i.price * 0.8 && filterPrice2 >= i.price * 0.8
    );
    setItems(prcieFinalItem);
  };
  return (
    <>
      <div className="product-list-wrap">
        <div>
          <div className="product-filter-top">
            <p className="product-filter-top-l">Filter</p>
            <div
              className={`product-filter-top-filter ${
                rightFilter ? "active" : ""
              }`}
              onClick={() => setRightFilter(!rightFilter)}
              ref={filterRef}
            >
              {filterName}
              <div className="product-filter-top-r ">
                <ul className={rightFilter === true ? "active" : " "}>
                  {sortOptions.map((sortOption, idx) => (
                    <li key={idx} onClick={sortOption.handler}>
                      {sortOption.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="product-filter-bot">
            <ul className="product-filter-bot-t">
              <li
                className={activeFilter === 0 ? "active" : ""}
                onClick={() => setActiveFilter(0)}
              >
                브랜드
              </li>
              <li
                className={activeFilter === 1 ? "active" : ""}
                onClick={() => setActiveFilter(1)}
              >
                제조국
              </li>
              <li
                className={activeFilter === 2 ? "active" : ""}
                onClick={() => setActiveFilter(2)}
              >
                가격
              </li>
            </ul>
            <ul className="product-filter-bot-b">
              <li
                className="brand-label"
                style={{ display: activeFilter === 0 ? "flex" : "none" }}
              >
                {itemBrands.map((brand) => (
                  <label onClick={() => handleBrand(brand)} key={brand}>
                    {brand}
                    <input type="radio" name="brand" />
                  </label>
                ))}
              </li>
              <li
                className="country-label"
                style={{ display: activeFilter === 1 ? "flex" : "none" }}
              >
                {itemMades.map((i) => (
                  <label onClick={() => handleCountry(i)} key={i}>
                    {i}
                    <input type="radio" name="product-detail-country" />
                  </label>
                ))}
              </li>
              <li
                className="price-label"
                style={{ display: activeFilter === 2 ? "flex" : "none" }}
              >
                <div className="price-tag-t">
                  {priceRange.map((p, id) => (
                    <p key={p.value}>
                      <label onClick={() => handlePrice(p.value)} key={id}>
                        {p.name}
                        <input
                          type="radio"
                          className="product-detail-price"
                          name="list-price"
                        />
                      </label>
                    </p>
                  ))}
                </div>
                <div className="price-tag-b">
                  직접입력
                  <input
                    className="xsmall"
                    type="text"
                    value={filterPrice || ""}
                    onChange={rememberP}
                  />
                  -
                  <input
                    className="xsmall"
                    type="text"
                    value={filterPrice2 || ""}
                    onChange={rememberP2}
                  />
                  <button
                    className="btn xsmall primary"
                    type="button"
                    onClick={checkPrice}
                  >
                    적용
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sub-page">
        <div className="product-list-wrap">
          <ul className="sub-goods-list">
            {currentItems.map((item) => (
              <li key={item.code}>
                <Link to={`/product-detail/${item.code}`}>
                  <ProductCard sendItem={item} />
                </Link>
              </li>
            ))}
            {currentItems.length === 0 && (
              <li className="no-items">해당 브랜드의 상품이 없습니다.</li>
            )}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default BrandListPage;

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import './sass/Search.scss';
import '../pages/sass/ProductListPage.scss';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const { items, onFetchItem } = useProductStore();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    onFetchItem();
  }, [onFetchItem]);

  useEffect(() => {
    const k = keyword.toLowerCase();
    setResults(
      items.filter(
        (item) =>
          item.title?.toLowerCase().includes(k) ||
          item.name?.toLowerCase().includes(k) ||
          item.brand?.toLowerCase().includes(k)
      )
    );
  }, [keyword, items]);

  return (
    <div className="sub-main">
      <div className="search-page">
        <h2 className="search-title">"{keyword}" 검색 결과</h2>

        {results.length > 0 ? (
          <div className="product-list-wrap">
            <ul className="sub-goods-list">
              {results.map((item) => {
                return (
                  <li key={item.code}>
                    <Link to={`/product-detail/${item.code}`}>
                      <ProductCard sendItem={item} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="no-result">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Search;

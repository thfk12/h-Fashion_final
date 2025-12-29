import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './sass/SearchOverlay.scss';
import { useProductStore } from '../store/useProductStore.js';

const popularKeywords = [
  '가디건',
  '점퍼',
  '백팩',
  '스니커즈',
  '스커트',
  '티셔츠',
  '로퍼',
  '셔츠',
  '모자',
];

const SearchOverlay = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const store = useProductStore();
  const products = store.items || [];

  const [keyword, setKeyword] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (store.items.length === 0) {
      store.onFetchItem();
    }
  }, [store]);

  useEffect(() => {
    if (keyword.trim() && products.length > 0) {
      const filtered = products
        .filter((item) => (item.title || '').toLowerCase().includes(keyword.toLowerCase()))
        .slice(0, 12);
      setFilteredItems(filtered);
      setActiveIndex(-1);
    } else {
      setFilteredItems([]);
      setActiveIndex(-1);
    }
  }, [keyword, products]);

  if (!isOpen) return null;

  const handleInputChange = (e) => setKeyword(e.target.value);
  const handleClear = () => setKeyword('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;

    addRecentKeyword(trimmed);
    setKeyword('');
    navigate(`/search?q=${trimmed}`);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (!filteredItems.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const item = filteredItems[activeIndex];
      if (!item) return;

      addRecentKeyword(item.title || item.name);
      navigate(`/product-detail/${item.code}`);
      setKeyword('');
      onClose();
    }
  };

  const addRecentKeyword = (item) => {
    const fullText = typeof item === 'string' ? item : item.title || item.name;
    const keywordText = fullText.length > 15 ? fullText.slice(0, 15) + '...' : fullText;

    if (!recentKeywords.includes(keywordText)) {
      setRecentKeywords([keywordText, ...recentKeywords].slice(0, 10));
    }
  };

  const handlePopularKeywordClick = (kw) => {
    addRecentKeyword(kw);
    navigate(`/search?q=${kw}`);
    onClose();
  };

  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} style={{ color: '#EEBE81' }}>
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="search-overlay">
      <button className="close-btn" onClick={onClose}>
        <img src="/images/close-icon-white.svg" alt="닫기" />
      </button>

      <div className="search-input-box">
        <form onSubmit={handleSubmit} className="search-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="search-input"
          />

          {keyword && filteredItems.length > 0 && (
            <ul className="search-preview">
              {filteredItems.map((item, index) => (
                <li
                  key={item.id}
                  className={index === activeIndex ? 'active' : ''}
                  onClick={() => {
                    addRecentKeyword(item.title || item.name);
                    navigate(`/product-detail/${item.code}`);
                    setKeyword('');
                    onClose();
                  }}
                >
                  {highlightText(item.title || item.name, keyword)}
                </li>
              ))}
            </ul>
          )}

          {keyword && (
            <button type="button" className="clear-btn" onClick={handleClear}>
              <img src="/images/close-icon-white.svg" alt="지우기" />
            </button>
          )}

          <button className="search-icon" type="submit">
            <img src="/images/search-icon-white.svg" alt="검색" />
          </button>

          {!keyword && (
            <div className="search-suggestions">
              <div className="recent-keywords">
                <div className="recent-keywords-del">
                  <p>최근 검색어</p>
                  <button
                    type="button"
                    className="all-clear-btn"
                    onClick={() => setRecentKeywords([])}
                  >
                    전체삭제
                  </button>
                </div>

                <ul>
                  {recentKeywords.length === 0 ? (
                    <li className="no-recent">최근 검색어가 없습니다.</li>
                  ) : (
                    recentKeywords.map((kw) => (
                      <li key={kw}>
                        <button
                          type="button"
                          className="keyword-button"
                          onClick={() => {
                            navigate(`/search?q=${kw}`);
                            onClose();
                          }}
                        >
                          {kw}
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => setRecentKeywords(recentKeywords.filter((r) => r !== kw))}
                        >
                          <img src="/images/close-icon-white.svg" alt="삭제" />
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="popular-keywords">
                <p>인기 검색어</p>
                <ul>
                  {popularKeywords.map((kw, i) => (
                    <li key={kw}>
                      <button
                        type="button"
                        className="popular"
                        onClick={() => handlePopularKeywordClick(kw)}
                      >
                        <span className="rank">{i + 1}</span>
                        {kw}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchOverlay;

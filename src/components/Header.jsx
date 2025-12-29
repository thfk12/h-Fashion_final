import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authstore';
import './sass/Header.scss';
import { usePickStore } from '../store/usePickStore';
import SearchOverlay from './SearchOverlay';
import { useCartStore } from '../store/useCartStore';
import { usePayStore } from '../store/usePayStore';

const menus = [
  {
    key: 'brand',
    label: '브랜드',
    submenu: [
      { key: 'brand-tommy', label: '타미힐피거' },
      { key: 'brand-rouge', label: '루즈앤라운지' },
      { key: 'brand-sjyp', label: 'SJYP' },
    ],
  },
  {
    key: 'women',
    label: '여성',
    submenu: [
      { key: 'women-shirt', label: '셔츠/블라우스' },
      { key: 'women-pants', label: '팬츠' },
      { key: 'women-skirt', label: '스커트' },
      { key: 'women-shoes', label: '슈즈' },
    ],
  },
  {
    key: 'men',
    label: '남성',
    submenu: [
      { key: 'man-pants', label: '팬츠' },
      { key: 'man-shirt', label: '셔츠' },
      { key: 'man-outer', label: '아우터' },
      { key: 'man-shoes', label: '슈즈' },
    ],
  },
  {
    key: 'sundries',
    label: '잡화',
    submenu: [
      { key: 'sundries-women-fashion', label: '여성패션잡화' },
      { key: 'sundries-man-fashion', label: '남성패션잡화' },
      { key: 'sundries-women-bag', label: '여성가방' },
      { key: 'sundries-man-bag', label: '남성가방' },
    ],
  },
  {
    key: 'golf',
    label: '골프',
    submenu: [
      { key: 'golf-women-outer', label: '여성아우터' },
      { key: 'golf-man-outer', label: '남성아우터' },
      { key: 'golf-women-pants', label: '여성팬츠/스커트' },
      { key: 'golf-man-pants', label: '남성팬츠' },
      { key: 'golf-acc', label: '골프악세사리' },
    ],
  },
];

const Header = () => {
  const { user, onLogout } = useAuthStore();
  const { resetPcikList } = usePickStore();
  const { resetCart, cartItems } = useCartStore();
  const { resetOrder } = usePayStore();

  const navigate = useNavigate('');
  const location = useLocation();
  const currentPath = location.pathname;

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    resetPcikList();
    resetCart();
    resetOrder();
    alert('로그아웃 되었습니다');
    onLogout();
    navigate('/');
  };
  const isMainMenuActive = (menuKey) => {
    const menuPath = `/${menuKey}`;

    return currentPath === menuPath || currentPath.startsWith(`${menuPath}/`);
  };
  const isSubMenuActive = (menuKey, subKey) => {
    const subPath = `/${menuKey}/${subKey}`;
    return currentPath === subPath;
  };

  return (
    <>
      <header>
        <div className="header-inner">
          <div className="inner-left">
            <h1 className="logo">
              <Link to="/">
                <img src="/images/header_logo.svg" alt="" />
              </Link>
            </h1>
            <nav>
              <ul className="main-menu">
                {menus.map((menu) => (
                  <li key={menu.key} className={isMainMenuActive(menu.key) ? 'active' : ''}>
                    <Link to={`/${menu.key}`}>{menu.label}</Link>
                    {menu.submenu && menu.submenu.length > 0 && (
                      <ul className="sub-menu">
                        {menu.submenu.map((sub, index) => (
                          <li
                            key={`${sub.key}-${sub.key || index}`}
                            className={isSubMenuActive(menu.key, sub.key) ? 'active' : ''}
                          >
                            <Link to={`/${menu.key}/${sub.key || ''}`}>{sub.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="inner-right">
            <ul className="gnb-list">
              <li>
                <button onClick={() => setIsSearchOpen(true)} className="search-button">
                  <img src="/images/search-icon-white.svg" alt="검색아이콘" />
                </button>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/userinfo">
                      <img src="/images/my-icon-white.svg" alt="마이페이지" />
                    </Link>
                  </li>
                  <li>
                    <Link onClick={((e) => e.preventDefault(), handleLogout)}>
                      <img src="/images/logout-icon-white.svg" alt="로그아웃" />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <img src="/images/my-icon-white.svg" alt="마이페이지" />
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/cart" className="cart-count-icon">
                  <img src="/images/cart-icon2-white.svg" alt="장바구니아이콘" />
                  <span className="cart-count">{cartItems.length}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;

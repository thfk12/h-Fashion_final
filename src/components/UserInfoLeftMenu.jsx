import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sass/UserInfoLeftMenu.scss";

const UserInfoLeftMenu = () => {
  const navigate = useNavigate();

  const menuList = [
    {
      title: "쇼핑 정보",
      link: "",
      list: [
        { name: "주문/배송", link: "/userinfo/memberdelivery" },
        { name: "찜 리스트", link: "/picklist" },
      ],
    },
    {
      title: "회원정보",
      link: "/userinfo/memberinfor",
      list: [],
    },
  ];
  const handleNavigate = (index) => {
    const pathname = menuList[index].link;
    if (pathname) navigate(pathname);
  };
  return (
    <div className="menu-list-wrap">
      <h2>MYPAGE</h2>
      {menuList.map((item, index) => (
        <div key={index} className="menu-list">
          <button onClick={() => handleNavigate(index)}>{item.title}</button>
          <ul>
            {item.list.map((one, id) => (
              <li key={id}>
                <Link to={one.link}>{one.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserInfoLeftMenu;

import React, { useState } from "react";
import "./sass/NoMemberLogin.scss";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import NonMemberPopUp from "./NonMemberPopUp";

const NoMemberLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      alert("휴대폰번호와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const docRef = doc(db, "nuser", phone);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = docSnap.data();
        if (user.opassword === password) {
          const orderRef = doc(db, "nonorders", phone);
          const orderSnap = await getDoc(orderRef);
          if (orderSnap.exists()) {
            setOrderData(orderSnap.data());
            setShowPopup(true);
          } else {
            alert("주문 데이터가 존재하지 않습니다.");
          }
        } else {
          alert("비밀번호가 틀립니다.");
        }
      } else {
        alert("등록된 휴대폰 번호가 없습니다.");
      }
    } catch (err) {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="no-member-wrap">
      <form className="noMember-login" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="주문시 입력하신 휴대폰번호를 입력해주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="주문시 설정하신 비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn primary middle">
          상품조회하기
        </button>
        <p>
          주문번호를 모르신다면, 고객센터 1800-5700로 문의해주시기 바랍니다.
        </p>
      </form>

      {showPopup && orderData && (
        <NonMemberPopUp data={orderData} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default NoMemberLogin;

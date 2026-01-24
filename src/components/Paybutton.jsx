import React from 'react';

const Paybutton = ({ onClick, price }) => {
  return (
    <>
      <button className=" btn large primary wFull" type="button" onClick={onClick}>
        {price.toLocaleString()}원 구매하기
      </button>
    </>
  );
};

export default Paybutton;

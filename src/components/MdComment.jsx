import React from 'react';

const MdComment = () => {
  const mdBox = {
    display: 'flex',
    padding: '20px 40px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    alignSelf: 'stretch',
    background: ' #F2F2F2',
  };
  const mds = {
    padding: '8px 10px',
    fontFamily: 'Times New Roman',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#838383',
    border: '0.4px solid #838383',
  };
  const comment = {
    color: '#000',
    fontSize: '1.6rem',
    fontWeight: '400',
    letterSpacing: '-0.32px',
  };
  return (
    <dl style={mdBox}>
      <dt style={mds}>MD'S COMMENT'</dt>
      <dd style={comment}>
        본 상품에 등록되어 있는 정보는 판매자가 직접 등록한 것으로, 등록된 정보에 대한 책임은
        판매자에게 있습니다'
      </dd>
    </dl>
  );
};

export default MdComment;

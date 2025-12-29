import React from 'react';
import UserInfoLeftMenu from '../components/UserInfoLeftMenu';
import { usePickStore } from '../store/usePickStore';
import { useNavigate } from 'react-router-dom';
import './sass/picklist.scss';

const Picklist = () => {
  const navigte = useNavigate();
  const { pickLists, onRemoveList } = usePickStore();
  const handleMoveDetail = (code) => {
    navigte(`/product-detail/${code}`);
  };

  return (
    <div className="sub-page">
      <div className="channel-wrap">
        <div className="channel"></div>
      </div>
      <div className="content-inner-picklist">
        <div className="user-info-left">
          <UserInfoLeftMenu />
        </div>
        <div className="user-info-right user-pick-wrap">
          <div className="user-info-right-inner">
            <div className="user-info-right-title">
              <h3>찜 리스트</h3>
              <p>전체 {pickLists.length}</p>
            </div>
            <div className="user-picklist-card-wrap">
              {pickLists.map((p) => (
                <ul key={p.code} className="user-picklist-card" onClick={() => handleMoveDetail(p.code)}>
                  <li>
                    <div className="user-picklist-card-img">
                      <img src={p.thumbImg} alt="픽이미지" />
                    </div>
                    <div className="user-picklist-card-text">
                      <p className="card-text1">
                        <span className="picklist-brand">{p.brand}</span>
                        <span
                          className="picklist-heart"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveList(p.code);
                            alert('찜목록에서 제거되었습니다.');
                          }}
                        ></span>
                      </p>
                      <p className="picklist-name">{p.title}</p>
                      <div className="card-text3">
                        <div>
                          <span className="picklist-price">
                            {(p.price * 0.8).toLocaleString()}원
                          </span>
                          <span className="picklist-originPrice">{p.price.toLocaleString()}원</span>
                        </div>

                        <span className="picklist-sale">20%</span>
                      </div>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Picklist;

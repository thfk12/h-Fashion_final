import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import './sass/ProductDetail.scss';
import ProductDetailRightInfo from '../components/ProductDetailRightInfo';
import DetailPageSwiper from '../components/DetailPageSwiper';
import DetailSimilarSwiper from '../components/DetailSimilarSwiper';
import DetailImgUrl from '../components/DetailImgUrl';
import MdComment from '../components/MdComment';
import ProdctActualSize from '../components/ProdctActualSize';
import ProductNoticeInfo from '../components/ProductNoticeInfo';
import Tab from '../components/Tab';
import Delivery from '../components/Delivery';
import DetailPageReview from '../components/DetailPageReview';
import ProductQNA from '../components/ProductQNA';
import CartPopup from '../components/CartPopup';

const ProductDetail = () => {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('detail');
  const [isPayClicked, setIsPayClicked] = useState(false);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  useEffect(() => {
    if (!code) {
      setProduct(null);
      return;
    }
    const findItem = products.find((item) => item.code === code);
    setProduct(findItem || null);
  }, [code]);
  if (!product) {
    return null;
  }

  return (
    <div className="sub-page">
      <div className="product-detail-wrap">
        <div className="detail-left">
          <div className="product-detail-slide">
            <DetailPageSwiper product={product} />
          </div>
          <section>
            <h3>이 상품과 비슷한 상품</h3>
            <DetailSimilarSwiper product={product} />
          </section>
          <Tab activeTab={activeTab} handleTabClick={handleTabClick} />
          {activeTab === 'detail' && (
            <section>
              <MdComment />
              <DetailImgUrl product={product} />
              <ProductNoticeInfo product={product} />
              <ProdctActualSize />
            </section>
          )}
          {activeTab === 'review' && <DetailPageReview product={product} />}
          {activeTab === 'qna' && (
            <section>
              <ProductQNA />
              <Delivery />
            </section>
          )}
        </div>
        <div className="detail-right" style={{ backgroundImage: 'url(``)' }}>
          <ProductDetailRightInfo
            product={product}
            onOpenPay={() => setIsPayClicked(true)}
            onOpenPopup={() => setShowPopup(true)}
          />
        </div>
      </div>
      {isPayClicked && (
        <>
          <div className="back-overlay"></div>
          <div className="overlay-text-wrap">
            <p className="over-title">주문서로 이동중</p>
            <p className="over-middle"> 고객님을 위한 주문서양식을 받아오는중입니다.</p>
            <p className="over-box"></p>
          </div>
        </>
      )}
      {showPopup && <CartPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ProductDetail;

import React from 'react';
import MainSwiper from '../components/MainSwiper';
import MainKeyWordRanking from '../components/MainKeyWordRanking';
import MainCategoryNew from '../components/MainCategoryNew';
import MainBrandLive from '../components/MainBrandLive';
import MainBestReview from '../components/MainBestReview';
import './sass/Main.scss';
import Magazine from '../components/Magazine';

const Main = () => {
  return (
    <>
      <div className="main-slider-wrap">
        <MainSwiper />
      </div>
      <div className="main-content inner">
        <MainKeyWordRanking />
        <MainCategoryNew />
        <Magazine />
        <MainBrandLive />
        <MainBestReview />
      </div>
    </>
  );
};

export default Main;

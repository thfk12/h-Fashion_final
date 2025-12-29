import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './sass/MainSwiper.scss';

const MainSwiper = () => {
  const slides = [
    {
      src: './images/main-banner1.jpg',
      alt: 'slider1',
      desc: ['TOMMY JEANS', '겨울을 채우는 새로운 선택', '아우터 전 상품 무료교환 혜택'],
    },
    {
      src: './images/main-banner2.jpg',
      alt: 'slider2',
      desc: ['Calvin Klein', '장바구니를 비우는 블프 혜택', '블프 최대 할인, 15% 쿠폰'],
    },
    {
      src: './images/main-banner3.jpg',
      alt: 'slider3',
      desc: [
        'TOMMY HILFIGER MEN',
        '취향따라 골라입는 스웨터 셔츠 ',
        '크루넥부터 후디, 하프 집업까지',
      ],
    },
    {
      src: './images/main-banner4.jpg',
      alt: 'slider4',
      desc: [],
    },
    {
      src: './images/main-banner5.jpg',
      alt: 'slider5',
      desc: ['ROUGE&LOUNGE', '꾸준히 사랑받는 리오더 백', '더블 7% + 무료교환 혜택'],
    },
    {
      src: './images/main-banner6.jpg',
      alt: 'slider6',
      desc: ['TOMMY HILFIGER WOMEN', '포근함을 품은 윈터 스웨터', '에센셜 아이템 보러가기'],
    },
    {
      src: './images/main-banner7.jpg',
      alt: 'slider7',
      desc: ['TOMMY JEANS', '겨울을 채우는 새로운 선택', '아우터 전 상품 무료교환 혜택'],
    },
    {
      src: './images/main-banner8.jpg',
      alt: 'slider8',
      desc: ['TOMMY HILFIGER', '드디어 다가온 타미 블랙 세일', '25FW UP TO 41% OFF'],
    },
    {
      src: './images/main-banner9.jpg',
      alt: 'slider9',
      desc: ['TOMMY SHOES', '스타일의 완성은 슈즈로부터', '25FW COLLECTION'],
    },
  ];
  return (
    <div className="main-sliders">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        navigation
        pagination
        loop={true}
        centeredSlides={true}
        slidesPerView={1.8}
        spaceBetween={20}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          '--swiper-pagination-bullet-inactive-color': '#fff',
          '--swiper-pagination-bottom': '28px',
          '--swiper-pagination-bullet-size': '12px',
        }}
      >
        {slides.map((slide, id) => (
          <SwiperSlide key={id}>
            <div className="img-box">
              <img src={slide.src} alt={slide.alt} />
            </div>
            <div className="text-box">
              <p>{slide.desc[0]}</p>
              <p>{slide.desc[1]}</p>
              <p>{slide.desc[2]}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSwiper;

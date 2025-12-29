import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DetailPageSwiper = ({ product }) => {
  const slides = product?.slide || [];
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 3000 }}
      navigation
      pagination
      loop={true}
      slidesPerView={2}
      spaceBetween={0}
      style={{
        '--swiper-navigation-color': '#000',
        '--swiper-pagination-color': '#000',
        '--swiper-pagination-bottom': '40px',
        '--swiper-pagination-bullet-size': '12px',
      }}
    >
      {slides.map((imgUrl, idx) => (
        <SwiperSlide key={idx}>
          <img src={imgUrl} alt={imgUrl.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DetailPageSwiper;

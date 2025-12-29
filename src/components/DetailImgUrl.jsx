import React from 'react';
import './sass/DetailImgUrl.scss';
const DetailImgUrl = ({ product }) => {
  const ditailImgUrls = product?.detail || [];
  // console.log(ditailImgUrls);

  return (
    <ul className="detail-img">
      {ditailImgUrls.map((url, id) => (
        <li key={id}>
          <img src={url} alt={url} />
        </li>
      ))}
    </ul>
  );
};

export default DetailImgUrl;

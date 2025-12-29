import React, { useState } from 'react';
import CartPo from '../components/CartPo';
import CartItem from '../components/CartItem';
import './sass/Cart.scss';
import { useCartStore } from '../store/useCartStore';
import CartNone from '../components/CartNone';
import CartOpChangePopup from '../components/CartOpChangePopup';

const Cart = () => {
  const { cartItems } = useCartStore();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenPopup = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  return (
    <div className="sub-page">
      <div className="inner cart">
        <div className="cart-inner-top">
          <div className="cart-inner-title">
            <h2 className="sub-page-title cart">장바구니</h2>
          </div>
          <div className="cart-inner-content">
            <div className="cart-inner-left">
              {cartItems.length === 0 ? <CartNone /> : <CartItem onOpenPopup={handleOpenPopup} />}
            </div>

            <div className="cart-inner-right">
              <CartPo />
            </div>
          </div>

          <div className="cart-inner-bottom">
            <div className="other-item-wrap"></div>
          </div>

          {showPopup && (
            <CartOpChangePopup item={selectedItem} onClose={() => setShowPopup(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

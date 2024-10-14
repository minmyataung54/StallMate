import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const CartItem = ({ cartItems, onContinueShopping }) => {
  const dispatch = useDispatch();
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity; 
    }, 0);
  };

  const handleIncrement = (item) => {
    console.log("Incrementing:", item);
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  
  const handleDecrement = (item) => {
    console.log("Decrementing:", item);
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };
  

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  if (!cartItems.length) {
    return <h3 className='display-1 text-white d-flex justify-content-center align-items-center'>Your cart is empty!</h3>;
  }

  return (
    <div className="cart-container text-white">
      <h2>Total Cart Amount: ${calculateTotalAmount(cartItems).toFixed(2)}</h2>
      <div>
        {cartItems.map((item) => (
          <div className="cart-item text-white" key={item.id}>
            <div className="cart-item-details text-white">
              <div className="cart-item-name text-white">{item.item}</div>
              <div className="cart-item-cost text-white">${item.price}</div>
              <div className="cart-item-quantity text-white">
                <button className='text-white' onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button className='text-white' onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button className='text-white' onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className='text-white' onClick={onContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default CartItem;

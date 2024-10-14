import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import CartItem from '../components/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { addItem } from '../components/CartSlice';

const ResNMenu = () => {
  const navigate = useNavigate();
  const { restaurantName } = useParams();
  const dispatch = useDispatch(); 
  const cartItems = useSelector((state) => state.cart.items); 
  const amount = useSelector(state => state.cart.amount);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  

  useEffect(() => {
    const fetchData = () => {
      const data = [
        {
          pic: "src/assets/ejapic.png",
          name: "อีจาหมาลำ สุกี้ 1",
          res_type: "à la carte",
          rating: 4.7,
          menu: {
            Soup: [
              { item: "Chicken Suki", price: 80 },
              { item: "Spicy Soup", price: 70 },
              { item: "Tom Yum Suki", price: 85 },
            ],
            Rice: [
              { item: "Vegetable Suki", price: 75 },
            ],
            Snack: [
              { item: "Pork Suki", price: 80 },
            ],
          },
        },
        {
          pic: "src/assets/ejapic.png",
          name: "อีจาหมาลำ สุกี้ 2",
          res_type: "à la carte",
          rating: 4.5,
          menu: {
            Soup: [
              { item: "Pork Suki", price: 80 },
              { item: "Seafood Suki", price: 90 },
            ],
            Rice: [
              { item: "Chicken Noodle Soup", price: 70 },
            ],
            Snack: [
              { item: "Mixed Vegetable Suki", price: 75 },
            ],
          },
        },
        {
          pic: "src/assets/ejapic.png",
          name: "อีจาหมาลำ สุกี้ 3",
          res_type: "à la carte",
          rating: 4.8,
          menu: {
            Soup: [
              { item: "Beef Suki", price: 90 },
              { item: "Herbal Soup", price: 60 },
            ],
            Rice: [
              { item: "Spicy Seafood Suki", price: 100 },
            ],
            Snack: [
              { item: "Clear Broth Suki", price: 65 },
            ],
          },
        },
        {
          pic: "src/assets/ejapic.png",
          name: "อีจาหมาลำ สุกี้ 4",
          res_type: "à la carte",
          rating: 4.6,
          menu: {
            Soup: [
              { item: "Chicken Noodle Soup", price: 70 },
              { item: "Herbal Soup", price: 60 },
            ],
            Rice: [
              { item: "Vegetarian Suki", price: 65 },
            ],
            Snack: [
              { item: "Fish Suki", price: 90 },
            ],
          },
        },
        {
          pic: "src/assets/ejapic.png",
          name: "อีจาหมาลำ สุกี้ 5",
          res_type: "à la carte",
          rating: 4.9,
          menu: {
            Soup: [
              { item: "Hot Pot", price: 85 },
            ],
            Rice: [
              { item: "Vegetarian Suki", price: 65 },
            ],
            Snack: [
              { item: "Fish Suki", price: 90 },
            ],
          },
        },
      ];
      setTimeout(() => {
        setRestaurants(data);
        setLoading(false);
      }, 300);
    };

    fetchData();
  }, []);

  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.name === decodeURIComponent(restaurantName)
  );

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const handleFoodClick = (category, item) => {
    const itemWithId = { ...item, id: `${item.item}-${category}`, quantity: 1 }; // Create a unique ID
    dispatch(addItem(itemWithId)); // Dispatch action to add item to cart
  };
  
  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible);
  };
  const handleContinueShopping = () => {
    setIsCartVisible(false);
  };
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  

  return (
    <div className="container-fluid">
      {selectedRestaurant ? (
        <div>
          {isCartVisible ? (
            <div className="cart-modal">
              <CartItem onContinueShopping={handleContinueShopping} cartItems={cartItems} />
            </div>
          ) : (
            <>
              <div className="card" style={{ marginBottom: '2vw', marginTop: '6vw' }}>
                <h1 className="mb-4" style={{ fontSize: '10vw' }}>{selectedRestaurant.name}</h1>
                <h2 style={{ fontSize: '5vw' }}>Menu</h2>
              </div>
              <div className="row">
                {Object.entries(selectedRestaurant.menu).map(([category, items]) => (
                  <div key={category} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-header">
                        <h3>{category}</h3>
                      </div>
                      <ul className="card">
                        {items.map((item, index) => (
                          <li 
                            key={index} 
                            className="card d-flex justify-content-between align-items-center"
                            onClick={() => handleFoodClick(category, item)} 
                          >
                            {item.item}
                            <span className="badge bg-primary rounded-pill">${item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <h2>Restaurant not found</h2>
      )}
  
      <button 
        className="btn btn-success rounded-circle cart-btn" 
        style={{
          position: 'fixed',
          bottom: '5vw',
          right: '3vw',
          width: '15vw',
          height: '15vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '5vw',
        }}
        onClick={handleCartClick}
      >
        <div style={{ position: 'relative' }}>
          <i className="bi bi-cart" style={{ color: 'white', fontSize:'7vw' }}></i>
          <i className="rounded-circle" style={{
            position: 'absolute',
            top: '-0.8vw',
            right: '-0.8vw',
            color: 'white',
            background: 'red',
            width: '5vw',
            height: '5vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '3vw',
          }}>
            {calculateTotalQuantity()}
          </i>
        </div>
      </button>
    </div>
  );
  
};

export default ResNMenu;

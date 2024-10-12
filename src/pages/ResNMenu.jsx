import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Header from "../components/Header"; // Assuming you have a Header component

const ResNMenu = () => {
  const { restaurantName } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container-fluid mt-4">
      {selectedRestaurant ? (
        <div>
          <h1 className="mb-4 text-white">{selectedRestaurant.name}</h1>
          <h2 className='text-white'>Menu</h2>
          <div className="row">
            {Object.entries(selectedRestaurant.menu).map(([category, items]) => (
              <div key={category} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h3>{category}</h3>
                  </div>
                  <ul className="list-group list-group-flush">
                    {items.map((item, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.item}
                        <span className="badge bg-primary rounded-pill">${item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2>Restaurant not found</h2>
      )}
    </div>
  );
};

export default ResNMenu;

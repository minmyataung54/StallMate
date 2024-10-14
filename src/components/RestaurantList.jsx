import React, { useState, useEffect } from "react";
import ResCard from "./ResCard";

const RestaurantList = () => {
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

      
      setRestaurants(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {restaurants.map((restaurant, index) => (
          <div className="col-12 mb-4" key={index}>
            <ResCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
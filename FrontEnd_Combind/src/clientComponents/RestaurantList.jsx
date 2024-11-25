import React, { useState, useEffect } from "react";
import ResCard from "./ResCard";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  
  useEffect(() => {
    const fetchData = () => {
        const data = [
            {
              pic: "src/assets/shoplogo.png",
              name: "Siam Brasserie 1",
              res_type: "à la carte",
              rating: 4.7,
              menu: {
                Soup: [
                  {
                    item: "Chicken Suki",
                    item_th: "สุกี้ไก่",
                    price: 80,
                    description: "Tender chicken served in a flavorful suki broth with vegetables.",
                    description_th: "ไก่เนื้อนุ่มในน้ำซุปสุกี้พร้อมผัก",
                    imageUrl: "src/assets/chicken_suki.png",
                  },
                  {
                    item: "Spicy Soup",
                    item_th: "ซุปเผ็ด",
                    price: 70,
                    description: "A hot and spicy soup to warm your taste buds.",
                    description_th: "ซุปเผ็ดร้อนเพื่อเพิ่มความอร่อย",
                    imageUrl: "src/assets/spicy_soup.png",
                  },
                  {
                    item: "Tom Yum Suki",
                    item_th: "สุกี้ต้มยำ",
                    price: 85,
                    description: "Suki with a spicy and sour Tom Yum flavor.",
                    description_th: "สุกี้รสชาติต้มยำเผ็ดเปรี้ยว",
                    imageUrl: "src/assets/tom_yum_suki.png",
                  },
                ],
                Rice: [
                  {
                    item: "Vegetable Suki",
                    item_th: "สุกี้ผัก",
                    price: 75,
                    description: "A healthy mix of vegetables in suki sauce.",
                    description_th: "สุกี้ผักเพื่อสุขภาพ",
                    imageUrl: "src/assets/vegetable_suki.png",
                  },
                ],
                Snack: [
                  {
                    item: "Pork Suki",
                    item_th: "สุกี้หมู",
                    price: 80,
                    description: "Savory pork in a light suki broth.",
                    description_th: "หมูในน้ำซุปสุกี้อร่อย",
                    imageUrl: "src/assets/pork_suki.png",
                  },
                ],
              },
            },
            {
              pic: "src/assets/shoplogo.png",
              name: "Siam Brasserie 2",
              res_type: "à la carte",
              rating: 4.5,
              menu: {
                Soup: [
                  {
                    item: "Pork Suki",
                    item_th: "สุกี้หมู",
                    price: 80,
                    description: "Savory pork in a light suki broth.",
                    description_th: "หมูในน้ำซุปสุกี้อร่อย",
                    imageUrl: "src/assets/pork_suki.png",
                  },
                  {
                    item: "Seafood Suki",
                    item_th: "สุกี้ทะเล",
                    price: 90,
                    description: "A suki dish with mixed seafood and fresh vegetables.",
                    description_th: "สุกี้ทะเลพร้อมผักสด",
                    imageUrl: "src/assets/seafood_suki.png",
                  },
                ],
                Rice: [
                  {
                    item: "Chicken Noodle Soup",
                    item_th: "ซุปก๋วยเตี๋ยวไก่",
                    price: 70,
                    description: "Comforting chicken noodle soup with herbs.",
                    description_th: "ซุปก๋วยเตี๋ยวไก่ร้อนๆ พร้อมสมุนไพร",
                    imageUrl: "src/assets/chicken_noodle_soup.png",
                  },
                ],
                Snack: [
                  {
                    item: "Mixed Vegetable Suki",
                    item_th: "สุกี้ผักรวม",
                    price: 75,
                    description: "A hearty suki with a variety of vegetables.",
                    description_th: "สุกี้ที่เต็มไปด้วยผักหลายชนิด",
                    imageUrl: "src/assets/mixed_vegetable_suki.png",
                  },
                ],
              },
            },
            {
              pic: "src/assets/shoplogo.png",
              name: "Siam Brasserie 3",
              res_type: "à la carte",
              rating: 4.8,
              menu: {
                Soup: [
                  {
                    item: "Beef Suki",
                    item_th: "สุกี้เนื้อ",
                    price: 90,
                    description: "Tender beef slices in a rich suki broth.",
                    description_th: "เนื้อวัวนุ่มในน้ำซุปสุกี้",
                    imageUrl: "src/assets/beef_suki.png",
                  },
                  {
                    item: "Herbal Soup",
                    item_th: "ซุปสมุนไพร",
                    price: 60,
                    description: "A light soup with a mix of herbs for added flavor.",
                    description_th: "ซุปเบาที่มีสมุนไพรเพิ่มรสชาติ",
                    imageUrl: "src/assets/herbal_soup.png",
                  },
                ],
                Rice: [
                  {
                    item: "Spicy Seafood Suki",
                    item_th: "สุกี้ทะเลรสเผ็ด",
                    price: 100,
                    description: "Seafood suki with a spicy kick.",
                    description_th: "สุกี้ทะเลรสเผ็ด",
                    imageUrl: "src/assets/spicy_seafood_suki.png",
                  },
                ],
                Snack: [
                  {
                    item: "Clear Broth Suki",
                    item_th: "สุกี้น้ำใส",
                    price: 65,
                    description: "Suki in a clear, light broth.",
                    description_th: "สุกี้ในน้ำใสเบา",
                    imageUrl: "src/assets/clear_broth_suki.png",
                  },
                ],
              },
            },
            {
              pic: "src/assets/shoplogo.png",
              name: "Siam Brasserie 4",
              res_type: "à la carte",
              rating: 4.6,
              menu: {
                Soup: [
                  {
                    item: "Chicken Noodle Soup",
                    item_th: "ซุปก๋วยเตี๋ยวไก่",
                    price: 70,
                    description: "Comforting chicken noodle soup with herbs.",
                    description_th: "ซุปก๋วยเตี๋ยวไก่ร้อนๆ พร้อมสมุนไพร",
                    imageUrl: "src/assets/chicken_noodle_soup.png",
                  },
                  {
                    item: "Herbal Soup",
                    item_th: "ซุปสมุนไพร",
                    price: 60,
                    description: "A light soup with a mix of herbs for added flavor.",
                    description_th: "ซุปเบาที่มีสมุนไพรเพิ่มรสชาติ",
                    imageUrl: "src/assets/herbal_soup.png",
                  },
                ],
                Rice: [
                  {
                    item: "Vegetarian Suki",
                    item_th: "สุกี้เจ",
                    price: 65,
                    description: "Vegetarian suki with a variety of vegetables.",
                    description_th: "สุกี้ผักสำหรับคนกินเจ",
                    imageUrl: "src/assets/vegetarian_suki.png",
                  },
                ],
                Snack: [
                  {
                    item: "Fish Suki",
                    item_th: "สุกี้ปลา",
                    price: 90,
                    description: "Fresh fish in suki broth with vegetables.",
                    description_th: "ปลาสดในน้ำซุปสุกี้กับผัก",
                    imageUrl: "src/assets/fish_suki.png",
                  },
                ],
              },
            },
            {
              pic: "src/assets/shoplogo.png",
              name: "Siam Brasserie 5",
              res_type: "à la carte",
              rating: 4.9,
              menu: {
                Soup: [
                  {
                    item: "Hot Pot",
                    item_th: "หม้อไฟ",
                    price: 85,
                    description: "A communal hot pot with a variety of ingredients.",
                    description_th: "หม้อไฟที่มีส่วนผสมหลากหลาย",
                    imageUrl: "src/assets/hot_pot.png",
                  },
                ],
                Rice: [
                  {
                    item: "Vegetarian Suki",
                    item_th: "สุกี้เจ",
                    price: 65,
                    description: "Vegetarian suki with a variety of vegetables.",
                    description_th: "สุกี้ผักสำหรับคนกินเจ",
                    imageUrl: "src/assets/vegetarian_suki.png",
                  },
                ],
                Snack: [
                  {
                    item: "Fish Suki",
                    item_th: "สุกี้ปลา",
                    price: 90,
                    description: "Fresh fish in suki broth with vegetables.",
                    description_th: "ปลาสดในน้ำซุปสุกี้กับผัก",
                    imageUrl: "src/assets/fish_suki.png",
                  },
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
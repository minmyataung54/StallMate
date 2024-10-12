import React from "react";
import { useNavigate } from "react-router-dom";

const ResCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/resnmenu/${encodeURIComponent(restaurant.name)}`);
  };

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <img src={restaurant.pic} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{restaurant.name}</h5>
        <p className="card-text">Type: {restaurant.res_type}</p>
        <p className="card-text">Rating: {restaurant.rating}</p>
        <p className="card-text">Menu Highlights: {Object.keys(restaurant.menu).join(", ")}</p>
      </div>
    </div>
  );
};

export default ResCard;

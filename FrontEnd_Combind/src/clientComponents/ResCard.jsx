import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ResCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/resnmenu/${encodeURIComponent(restaurant.name)}`);
  };

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" , background:"#01040F", borderRadius:"1vw"}}>
      <div className="row d-flex align-items-center justify-content-around">
        <div className="col d-flex align-items-center">
          <img src={restaurant.pic} className="image-fluid rounded" style={{
            width: "30vw",
            height: "auto",
            marginTop:"3vw"
          }} />
        </div>
        <div className="col">
          <div className="card-body">
            <h5 className="card-title text-white" style={{
              fontSize: "4.3vw",
              fontWeight:"300"
            }}>{restaurant.name}</h5>
            <p className="card-text text-white">Type: {restaurant.res_type}</p>
            <p className="card-text text-white">
                <i className="bi bi-star" style={{ color: 'yellow' }}></i> {restaurant.rating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResCard;

import React from "react";
import RestaurantList from "../components/RestaurantList";
import Header from "../components/Header";

const NearMe = () => {
  return (
    <div>
      <Header pageTitle={"Near Me"} />
      <div style={{ marginRight: "65vw" ,marginTop:'5vw'}}>
        <button
          className="btn btn-success btn-sm rounded-pill"
          style={{ color: "black", width: "20vw" }}
        >
          Sort By
        </button>
      </div>
      <div className="container-fluid">
        
        <div style={{ marginTop: "50vw" }}>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
};

export default NearMe;

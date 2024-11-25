import React, { useState, useEffect } from "react";
import axios from "axios";

const FavoriteIcon = ({ customerID, stallownerID }) => {
    const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const response = await axios.get(
                    `${BACK_END_BASE_URL}/dashboard/customer/${customerID}/favorite`,
                    { withCredentials: true }
                );

                const favorites = response.data.favorites || [];
                const extractedStallOwnerID = 
                    typeof stallownerID === "object" ? stallownerID.ownerID : stallownerID;

                const isFavorite = favorites.some(
                    (stall) => stall.id === extractedStallOwnerID
                );

                setIsFav(isFavorite);
            } catch (error) {
                console.error("Error fetching favorite status:", error);
            }
        };

        fetchFavoriteStatus();
    }, [customerID, stallownerID]);

    const handleFav = async () => {
        try {
            const ownerID = stallownerID?.ownerID || stallownerID;
            if (!ownerID) throw new Error("Invalid Stall Owner ID");

            const endpoint = `${BACK_END_BASE_URL}/dashboard/customer/${customerID}/favorite/${ownerID}`;
            const config = { withCredentials: true };

            if (isFav) {
                await axios.delete(endpoint, config);
                setIsFav(false);
            } else {
                await axios.put(endpoint, {}, config);
                setIsFav(true);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Failed to update favorites. Please try again.");
        }
    };

    return (
        <span
            className="favorite-icon d-flex align-items-center justify-content-start"
            onClick={handleFav}
            style={{ cursor: "pointer" }}
        >
            <svg
                fill={isFav ? "#B01E28" : "#FFFFFF"}
                height="6vw"
                width="6vw"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 455 455"
                stroke="#FFFFFF"
            >
                <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.383-60.399-46.92-99.132-46.92 C57.586,10.346,0,67.931,0,138.714c0,55.426,33.049,119.535,98.23,190.546c50.162,54.649,104.729,96.96,120.257,108.626l9.01,6.769 l9.009-6.768c15.53-11.667,70.099-53.979,120.26-108.625C421.95,258.251,455,194.141,455,138.714 C455,67.931,397.414,10.346,326.632,10.346z" />
            </svg>
        </span>
    );
};

export default FavoriteIcon;
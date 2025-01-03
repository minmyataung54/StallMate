import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useOwnerAuth } from "../utilities/OwnerAuthContext";
import OrderHistoryCard from "../ownerComponents/OrderHistoryCard";
import OrderDetailHistory from "../ownerComponents/OrderDetailHistory";
import axios from "axios";
import Loading from "../Loading";

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const OwnerOrderHistory = () => {
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const { authData } = useOwnerAuth();
  const [ordersList, setOrdersList] = useState([]);
  const [checkList, setCheckList] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileAuth = async () => {
      try {
        const response = await axios.get(
          `${BACK_END_BASE_URL}/dashboard/stallowner/${authData?.ownerData.ownerID}/profile`,
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-store", Pragma: "no-cache" },
          }
        );
        console.log("Make order as completed:", response);

        if (response.status === 200) {
          setProfile(response.data.profile);
          setLoading(false);
        } else {
          setProfile(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching pending orders:", error.message);
        setProfile(null);
        setLoading(false);
      }
    };
    profileAuth();
  }, []);

  console.log(profile);

  useEffect(() => {
    const orderCompleteAuth = async () => {
      try {
        const response = await axios.get(
          `${BACK_END_BASE_URL}/dashboard/stallowner/${authData.ownerData.ownerID}/orders/completed`,
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-store", Pragma: "no-cache" },
          }
        );
        if (response.status === 200) {
          if (response.data.message === "No completed orders found") {
            setCheckList(false);
            setOrdersList([]);
          } else {
            setOrdersList(response.data.orders);
          }
        } else {
          setOrdersList([]);
          setCheckList(false);
        }
      } catch (error) {
        setOrdersList([]);
        setCheckList(false);
        console.log("Error:", error);
      }
    };
    orderCompleteAuth();
  }, [authData.ownerData.ownerID]);

  const handleBackBtn = () => {
    navigate("/ownerStallProfile");
  };

  const LEFT_ARROW = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      className="bi bi-arrow-left"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
      />
    </svg>
  );

  const [detail, setDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const groupOrdersByDate = (orders) => {
    return orders.reduce((acc, order) => {
      const date = format(new Date(order.createdAt), "dd MMM yyyy");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    }, {});
  };

  const groupedOrders =
    ordersList.length > 0 ? groupOrdersByDate(ordersList) : {};

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setDetail(true); // Show detail view
  };

  if (loading === true) {
    return <Loading />;
  }

  return (
    <>
      {detail ? (
        <OrderDetailHistory
          detail={detail}
          setDetail={setDetail}
          profile={profile}
          order={selectedOrder}
        />
      ) : (
        <div className="container-fluid d-flex flex-column p-0">
          {/* Header Section */}
          <div className="container-fluid" style={{ minHeight: "14%" }}>
            <div className="row d-flex">
              <i
                className="text-white col-2 align-self-start my-3 ms-2 px-0"
                onClick={handleBackBtn}
              >
                {LEFT_ARROW}
              </i>
              <div className="text-white col-8 align-self-end mt-4 mx-0 ms-2">
                <div
                  className="d-flex justify-content-start"
                  style={{ fontSize: "2em", padding: "0px" }}
                >
                  Order History
                </div>
              </div>
            </div>
          </div>
          {checkList ? (
            <div className="container-fluid">
              {Object.keys(groupedOrders).map((date) => (
                <div key={date} className="mb-4">
                  {/* Date Header */}
                  <h5 className="text-white">{date}</h5>
                  <hr
                    className="text-white mt-0"
                    style={{ border: "1px solid white" }}
                  />

                  {/* Orders for the Date */}
                  {groupedOrders[date].map((order) => (
                    <OrderHistoryCard
                      key={order.orderId}
                      order={order}
                      profile={profile}
                      clickShowDetail={() => handleCardClick(order)}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="row mt-2 d-flex justify-content-center"
              style={{ width: "80%", margin: "0 auto" }}
            >
              <h4 className="text-white">No completed orders</h4>
              <hr
                className="text-white"
                style={{ border: "2px solid white" }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OwnerOrderHistory;

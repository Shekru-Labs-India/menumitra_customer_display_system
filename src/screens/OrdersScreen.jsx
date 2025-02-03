import React, { useState, useEffect } from "react";
import Header from "../components/Header";

function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authData = JSON.parse(localStorage.getItem("authData"));
  const outletName = authData?.outlet_name; // Get 
  const accessToken = authData?.access_token; // Get 
  const fetchOrders = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const outlet_id = authData?.outlet_id;
    const accessToken = authData?.access_token; // Get 
  
    if (!outlet_id) {
      setError("Outlet ID not found in localStorage");
      setLoading(false);
      return;
    }
  
    if (!accessToken) {
      console.error("No access token found");
      window.location.href = "/login"; // Redirect to login page if no token
      return;
    }
  
    try {
      const response = await fetch("https://menusmitra.xyz/common_api/cds_kds_order_listview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // Include the access token in the header
        },
        body: JSON.stringify({ outlet_id }),
      });
  
      if (response.status === 401) {
        console.error("Unauthorized access - redirecting to login");
        window.location.href = "/login"; // Redirect to login if 401
        return;
      }
  
      const result = await response.json();
  
      if (result.st === 1) {
        const placedOrders = result.placed_orders.map((order) => ({
          ...order,
          status: "placed",
        }));
        const ongoingOrders = result.cooking_orders.map((order) => ({
          ...order,
          status: "ongoing",
        }));
        const completedOrders = result.paid_orders.map((order) => ({
          ...order,
          status: "completed",
        }));
        setOrders([...placedOrders, ...ongoingOrders, ...completedOrders]);
      } else {
        setError(result.msg || "Failed to fetch orders");
      }
    } catch (error) {
      setError("Error fetching orders");
      console.error("Order List View Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get dynamic font sizes based on screen width
  const getFontSizes = () => {
    if (screenSize >= 2560) {
      return {
        header: "display-2",
        orderNumber: "display-3",
        itemCount: "display-4",
      };
    } else if (screenSize >= 1920) {
      return {
        header: "display-3",
        orderNumber: "display-4",
        itemCount: "display-5",
      };
    } else if (screenSize >= 1200) {
      return {
        header: "display-4",
        orderNumber: "display-5",
        itemCount: "display-6",
      };
    } else if (screenSize >= 768) {
      return { header: "display-5", orderNumber: "display-6", itemCount: "h2" };
    } else {
      return { header: "display-6", orderNumber: "h2", itemCount: "h3" };
    }
  };

  const fontSizes = getFontSizes();

  // Single order card component
  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-3 mb-3 p-3 p-md-4 order-card">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className={`${fontSizes.orderNumber} fw-bold mb-0`}>
          #{order.order_number}
        </h2>
        <div className="d-flex align-items-center">
          <span className={`${fontSizes.itemCount} me-2`}>
            <i className="bx bx-restaurant text-warning fs-1"></i>
          </span>
          <span className={`${fontSizes.itemCount} fw-bold`}>
            {order.table_number || 0}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="container-fluid p-0">
        <div className="row g-0 min-vh-100">
          {/* Left Side - Placed Orders */}
          <div className="col-12 col-md-4 bg-secondary">
            <div className="p-2 p-sm-3 p-md-4">
              <h1
                className={`${fontSizes.header} text-white text-center fw-bold mb-3 mb-md-4`}
              >
                PLACED
              </h1>
              {loading ? (
                <p className="text-white text-center">Loading... </p>
              ) : error ? (
                <p className="text-danger text-center">{error}</p>
              ) : (
                <div className="orders-container">
                  {orders
                    .filter((order) => order.status === "placed")
                    .map((order) => (
                      <OrderCard key={order.order_id} order={order} />
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Center - Ongoing Orders */}
          <div className="col-12 col-md-4 bg-warning">
            <div className="p-2 p-sm-3 p-md-4">
              <h1
                className={`${fontSizes.header} text-white text-center fw-bold mb-3 mb-md-4`}
              >
                COOKING 
              </h1>
              {loading ? (
                <p className="text-white text-center">Loading...</p>
              ) : (
                <div className="orders-container">
                  {orders
                    .filter((order) => order.status === "ongoing")
                    .map((order) => (
                      <OrderCard key={order.order_id} order={order} />
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Completed Orders */}
          <div className="col-12 col-md-4 bg-success">
            <div className="p-2 p-sm-3 p-md-4">
              <h1
                className={`${fontSizes.header} text-white text-center fw-bold mb-3 mb-md-4`}
              >
                PAID
              </h1>
              {loading ? (
                <p className="text-white text-center">Loading...</p>
              ) : (
                <div className="orders-container">
                  {orders
                    .filter((order) => order.status === "completed")
                    .map((order) => (
                      <OrderCard key={order.order_id} order={order} />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersScreen;

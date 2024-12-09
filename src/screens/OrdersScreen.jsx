import React, { useState, useEffect } from 'react'
import Header from '../components/Header'

const INITIAL_ORDERS = [
  // Placed Orders
  { id: "101", status: "placed", itemCount: 3 },
  { id: "102", status: "placed", itemCount: 1 },
  { id: "103", status: "placed", itemCount: 4 },
  { id: "104", status: "placed", itemCount: 2 },
  { id: "105", status: "placed", itemCount: 5 },

  // Ongoing Orders
  { id: "444", status: "ongoing", itemCount: 0 },
  { id: "229", status: "ongoing", itemCount: 2 },
  { id: "229", status: "ongoing", itemCount: 3 },
  { id: "229", status: "ongoing", itemCount: 1 },
  { id: "229", status: "ongoing", itemCount: 4 }
]

function OrdersScreen() {
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [screenSize, setScreenSize] = useState(window.innerWidth)

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Get dynamic font sizes based on screen width
  const getFontSizes = () => {
    if (screenSize >= 2560) { // 4K and larger screens
      return {
        header: 'display-2',
        orderNumber: 'display-3',
        itemCount: 'display-4'
      }
    } else if (screenSize >= 1920) { // Full HD
      return {
        header: 'display-3',
        orderNumber: 'display-4',
        itemCount: 'display-5'
      }
    } else if (screenSize >= 1200) { // Desktop
      return {
        header: 'display-4',
        orderNumber: 'display-5',
        itemCount: 'display-6'
      }
    } else if (screenSize >= 768) { // Tablet
      return {
        header: 'display-5',
        orderNumber: 'display-6',
        itemCount: 'h2'
      }
    } else { // Mobile
      return {
        header: 'display-6',
        orderNumber: 'h2',
        itemCount: 'h3'
      }
    }
  }

  const fontSizes = getFontSizes()

  // Single order card component
  const OrderCard = ({ order }) => (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="bg-white rounded-3 mb-3 p-3 p-md-4 order-card">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className={`${fontSizes.orderNumber} fw-bold mb-0`}>
                #{order.id}
              </h2>
              <div className="d-flex align-items-center">
                <span className={`${fontSizes.itemCount} me-2`}>
                  <i className="bx bx-restaurant text-warning fs-1"></i>
                </span>
                <span className={`${fontSizes.itemCount} fw-bold`}>
                  {order.itemCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="bg-white rounded-3 mb-3 p-3 p-md-4 order-card">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className={`${fontSizes.orderNumber} fw-bold mb-0`}>
                #{order.id}
              </h2>
              <div className="d-flex align-items-center">
                <span className={`${fontSizes.itemCount} me-2`}>
                  <i className="bx bx-restaurant text-warning fs-1"></i>
                </span>
                <span className={`${fontSizes.itemCount} fw-bold`}>
                  {order.itemCount}
                </span>
              </div>
            </div>
          </div>
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
                PLACED ORDERS
              </h1>
              <div className="orders-container">
                {orders
                  .filter((order) => order.status === "placed")
                  .map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
              </div>
            </div>
          </div>

          {/* Right Side - Ongoing Orders */}
          <div className="col-12 col-md-4 bg-warning">
            <div className="p-2 p-sm-3 p-md-4">
              <h1
                className={`${fontSizes.header} text-white text-center fw-bold mb-3 mb-md-4`}
              >
                ONGOING ORDERS
              </h1>
              <div className="orders-container">
                {orders
                  .filter((order) => order.status === "ongoing")
                  .map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
              </div>
            </div>
          </div>
          {/* Right Side - Ongoing Orders */}
          <div className="col-12 col-md-4 bg-success">
            <div className="p-2 p-sm-3 p-md-4">
              <h1
                className={`${fontSizes.header} text-white text-center fw-bold mb-3 mb-md-4`}
              >
                COMPLETED
              </h1>
              <div className="orders-container">
                {orders
                  .filter((order) => order.status === "ongoing")
                  .map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersScreen
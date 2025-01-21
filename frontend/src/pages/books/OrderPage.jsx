import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error geting orders data</div>;
  console.log(orders.productIds);
  return (
    <div className="container mx-auto p-6">
      <h2>your order</h2>
      {orders.length === 0 ? (
        <div>No order found!</div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order?.id} className="border-b mb-4 pb-4">
            <p className="p-1 bg-secondary text-white w-10 rounded mb-1">#{index + 1}</p>
              <h2 className="font-bold">Order ID:{order._id}</h2>
              <p className="text-gray-600">Name:{order.name}</p>
              <p className="text-gray-600">Email:{order.email}</p>
              <p className="text-gray-600">phone:{order.phone}</p>
              <p className="text-gray-600">Total Price:{order.totalPrice}</p>
              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                {order.address.city},{order.address.state},
                {order.address.country},{order.address.zipcode}
              </p>
              <h3 className="font-semibold mt-2">Products Id:</h3>
              <ul>
                {Array.isArray(order.productDetails) &&
                order.productDetails.length > 0 ? (
                  order.productDetails.map((product) => (
                    <li key={product.id}>{product.id}</li> // Use `product.id` to access the product ID
                  ))
                ) : (
                  <li>No products found</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;

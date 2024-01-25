import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { CartContext } from "../../contexts/CartContext";
import axios from "axios";
import { toast } from "react-toastify";

function OrderPage() {
  const { storedCart, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  // console.log("cart:", storedCart);

  const saveOrder = async () => {
    try {
      const token = localStorage.getItem("token"); // Or however you're storing the token

      // Prepare the order items from the cart
      const orderItems = storedCart.map((item) => ({
        quantity: item.amount, // Assuming 'amount' is the quantity in the cart
        price: item.price,
        product: item._id, // Assuming this is the product ID
      }));

      // Prepare the order data
      const orderData = {
        orderItems: orderItems,
      };

      // Send the request to the backend
      const response = await axios.post(
        "https://marketilo.onrender.com/order/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderPlaced(true);
      setOrderId(response.data._id); // Set the order ID from response
      clearCart(); // Clear the cart after placing the order
      console.log("Order saved:", response.data);
      toast.success("Thank you for your order!");
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("There was an issue with your order.");
    }
  };

  if (orderPlaced) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold my-4">
          Thank you for your order: {orderId}
        </h2>
        <p className="mb-4">Your order has been placed successfully.</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      {storedCart.map((item) => (
        <div
          key={item._id}
          className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500"
        >
          <div className="w-full min-h-[150px] flex items-center gap-x-4">
            {/* Image */}
            <Link to={`/product/${item._id}`}>
              <img className="max-w-[80px]" src={item.image} alt="" />
            </Link>
            <div className="w-full flex flex-col">
              {/* Title */}
              <Link
                className="text-sm uppercase font-medium max-w-[240px] text-gray-500 hover:underline"
                to={`/product/${item._id}`}
              >
                {item.name}
              </Link>
              <div className="flex gap-x-2 h-[36px]">
                {/* Quantity */}
                <div className="flex flex-1 max-w-[100px] items-center h-full border text-gray-500 font-medium">
                  <div className="flex-1 flex justify-center items-center cursor-pointer">
                    <IoMdRemove onClick={() => decreaseAmount(item._id)} />
                  </div>
                  <div className="h-full flex justify-center items-center px-2">
                    {item.amount}
                  </div>
                  <div className="flex-1 h-full flex justify-center items-center cursor-pointer">
                    <IoMdAdd onClick={() => increaseAmount(item._id)} />
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-around">
                  ${item.price}
                </div>
                <div className="flex-1 flex justify-end items-center font-medium">{`₪${parseFloat(item.price * item.amount).toFixed(2)}`}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={saveOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default OrderPage;

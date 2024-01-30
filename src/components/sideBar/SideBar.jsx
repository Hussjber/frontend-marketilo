import React, { useContext, useState } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { IoMdArrowForward } from "react-icons/io";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../cartItem/CartIem";
import { FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { isOpen, handelClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, totalPrice } = useContext(CartContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      // Display a message when the cart is empty
      setError("Cannot place an order with an empty cart.");
    } else {
      // Navigate to the order page
      navigate("/order");
    }
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[25vw] transition-all 
      duration-300 z-20 px-4 lg:px-[35px] overflow-auto`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className=" uppercase text-sm font-semibold">
          Shopping Bag({itemAmount})
        </div>
        <div
          onClick={handelClose}
          className=" cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div>
        {cart.map((item) => {
          return <CartItem item={item} key={item._id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className=" flex w-full justify-between items-center">
          {/* total */}
          {totalPrice !== 0 && (
            <div className="uppercase font-semibold">
              <span className="mr-2">Total:</span>
              {totalPrice}₪
            </div>
          )}
          {/* CLEAR CART */}
          <div
            onClick={clearCart}
            className=" cursor-pointer py-4  text-black w-6 h-6 flex justify-center items-center text-xl"
          >
            <FaTrash />
          </div>
        </div>
      </div>
      <Button
        variant="outlined"
        className="checkout-button"
        onClick={handleCheckout}
      >
        Go to checkout
      </Button>
      <div>{error && <span className="text-red-500">{error}</span>}</div>
    </div>
  );
}

export default SideBar;

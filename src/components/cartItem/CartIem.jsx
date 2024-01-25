import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

function CartItem({ item }) {
  const { _id, name, image, amount, price } = item;
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* Image */}
        <Link to={`/product/${_id}`}>
          <img className="max-w-[80px]" src={image} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          {/* Title and Remove Icon */}
          <div className="flex justify-between mb-2">
            {/* Title */}
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-gray-500 hover:underline"
              to={`/product/${_id}`}
            >
              {name}
            </Link>
            {/* Remove Icon */}
            <div
              onClick={() => removeFromCart(_id)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px]">
            {/* Quantity */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-gray-500 font-medium">
              <div className="flex-1 flex justify-center items-center cursor-pointer">
                <IoMdRemove onClick={() => decreaseAmount(_id)} />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              <div className="flex-1 h-full flex justify-center items-center cursor-pointer">
                <IoMdAdd onClick={() => increaseAmount(_id)} />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-around">
              ₪{price}
            </div>
            <div className="flex-1 flex justify-end items-center font-medium">{`₪${parseFloat(item.price * amount).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

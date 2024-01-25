import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  const { _id, size, name, price, description, gender, image } = product;

  return (
    <div>
      <Link to={`/product/${_id}`}>
        <div className=" border-[#e4e4e4] h-[385px] mb-4 relative overflow-hidden group transition">
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[300px] mx-auto flex justify-center items-center">
              <img
                className="w-full h-full object-cover"
                src={image}
                alt={name}
              />
            </div>
          </div>
          {/* image */}
        </div>
      </Link>
      <div className="text-sm capitalize text-gray-500 mb-1">{gender}</div>
      <div className="font-semibold mb-1">{name}</div>
      <h2 className="font-semibold">₪{price}</h2>
    </div>
  );
}

export default Product;

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [itemAmount, setItemAmount] = useState(0);
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState(storedCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  useEffect(() => {
    // Calculate total price whenever the cart changes
    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.amount;
    }, 0);

    setTotalPrice(total);
  }, [cart]);

  const addToCart = (product) => {
    const { _id, image, name, price } = product;
    console.log(product);
    const existingItemIndex = cart.findIndex((item) => item._id === _id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].amount += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { _id, image, name, price, amount: 1 }]);
    }
  };

  const removeFromCart = (_id) => {
    const newCart = cart.filter((item) => {
      return item._id !== _id;
    });
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
  };
  const increaseAmount = (_id) => {
    const newCart = cart.map((item) =>
      item._id === _id ? { ...item, amount: item.amount + 1 } : item
    );
    setCart(newCart);
  };

  const decreaseAmount = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);

    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item._id === _id) {
          // Decrease the amount
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });

      setCart(newCart);
      if (cartItem.amount <= 1) {
        removeFromCart(_id);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        storedCart,
        totalPrice,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

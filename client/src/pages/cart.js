import { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("CART");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("CART")) || [];
    const updatedCart = [...existingCart, ...item];
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };
  // useEffect(() => {
  //   if (localStorage.getItem("cart") === null) {
  //     localStorage.setItem("cart", JSON.stringify([]));
  //   } else {
  //     setCart(JSON.parse(localStorage.getItem("cart")));
  //   }
  // }, []);
  return (
    <CartContext.Provider value={[cart, setCart, addToCart]}>
      {children}
    </CartContext.Provider>
  );
};
//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

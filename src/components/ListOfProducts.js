import classes from "./ListOfProduct.module.css";
import CartContext from "../store/cart-context";
import { useContext } from "react";
import ShoeList from "./ShoeList";

const ListOfProduct = () => {
  const cartCntx = useContext(CartContext);

  const items = cartCntx.items.map((item) => {
    return <ShoeList title={item.Name} />;
  });
  return <div className={classes.ListOfProduct}>{items}</div>;
};

export default ListOfProduct;

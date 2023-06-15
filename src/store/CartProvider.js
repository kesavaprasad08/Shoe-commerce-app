import { useState, useEffect, useMemo } from "react";
import axios from 'axios';

import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    CrudCrudToCartCntx();
    console.log(items);
  }, []);

  const CrudCrudToCartCntx = async(props) => {
    const response = await axios.get('https://crudcrud.com/api/65fddf667abe447f9211eb0911c1af4f/AvailableItems')
    const data = await response.data;
    setItems(data)
  }

 

  //useMemo runs only if the dependency items changes, whenever an item is added it recaculates all the prices
  const totalAmount = useMemo(
    () =>
      //we can also use forEach loop or map for this calculation but reduce makes it more easier
      items.reduce(
        (prev, currentValue) =>
          prev + currentValue?.price * currentValue?.quantity,
        0
      ),
    [items]
  );

  const addProductToListHandler = async(product) => {
    
    const AvailableProduct ={...product} ;
    console.log(AvailableProduct);
    try{
    
    const response = await axios.post('https://crudcrud.com/api/65fddf667abe447f9211eb0911c1af4f/AvailableItems',AvailableProduct);
        console.log(response);
    }
    catch(err){
        console.log(err);
    }
    

  }

  const addItemToCartHandler = (item) => {
    // let isSameItem = false;

    // items.map((itemin) => {
    //   if (itemin.id === item.id) {
    //     isSameItem = true;

    //     item.quantity = (itemin.quantity - 0 + (item.quantity - 0)).toString();

    //     items.splice(items.indexOf(itemin), 1);

    //     updateTotalAmt(totalAmt + (item.quantity - 1) * item.price);

    //     updateItems([...items, item]);
    //   }
    // });

    // if (!isSameItem) {
    //   updateItems([...items, item]);
    //   updateTotalAmt(totalAmt + item.price * item.quantity);
    // }

    //check whether the item already exist, if not present add the new item and exit
    const itemIndex = items.findIndex((el) => el.id === item.id);
    if (itemIndex === -1) {
      setItems((prev) => [...prev, item]);
      return;
    }

    //if the item already exist update the quantity of the item instead of adding it again
    const updatedItems = items.map((el) => {
      if (el.id === item.id) {
        return {
          ...item,
          quantity: Number(item.quantity) + Number(el.quantity),
        };
      }
      return el;
    });
    setItems(updatedItems);
  };

  const removeItemFromCartHandler = (id) => {
    //first we mutate/change the value of quantity for same items then filter the array with only items which quantity is greater than or equal to one
    const filterItems = items
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Number(item.quantity) - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity >= 1);
    setItems(filterItems);
  };
  const cartContext = {
    items: items,
    totalAmount,
    addProduct:addProductToListHandler,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
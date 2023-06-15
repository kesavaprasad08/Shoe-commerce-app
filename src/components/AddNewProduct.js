import Button from './UI/Button/Button'
import React , { useRef, useContext } from 'react'
import classes from './AddNewProduct.module.css'
import CartContext from '../store/cart-context';

const AddNewProduct = () => {
    const cartCtx = useContext(CartContext);

    const NameRef = useRef();
    const DescRef = useRef();
    const PriceRef = useRef();
    const LQuantityRef = useRef();
    const MQuantityRef = useRef();
    const SQuantityRef = useRef();

    const addNewProductHandler = (e) => {
        
        e.preventDefault();
        const obj = {
            Name: NameRef.current.value,
            Description: DescRef.current.value,
            Price:PriceRef.current.value,
            LQuantity:LQuantityRef.current.value,
            MQuantity:MQuantityRef.current.value,
            SQuantity:SQuantityRef.current.value
        }
        
        cartCtx.addProduct(obj);
    }


  return (
    <form className={classes.form} onSubmit={addNewProductHandler}>
      <label>Shoe Name</label>
      <input ref={NameRef}></input>
      <label>Description</label>
      <input ref={DescRef}></input>
      <label>Price</label>
      <input type='number' ref={PriceRef}></input>
      <div>
        <h3>Quantity Available</h3>
      <label>L</label>
      <input type='number' ref={LQuantityRef}/>
      <label>M</label>
      <input type='number' ref={MQuantityRef}/>
      <label>S</label>
      <input type='number' ref={SQuantityRef}/>
      </div>
      <button>Add New Product</button>
    </form>
  );
};

export default AddNewProduct;

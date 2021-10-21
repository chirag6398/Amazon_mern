import React, { useState } from "react";
import productStyle from "../../styles/product.module.css";
import { useHistory } from "react-router";
import { addToCart } from "../../services/product";
import { arrayBufferToBase64 } from "../../util/getImgBuffer";
import { deleteProduct } from "../../services/product";
import { getProducts } from "../../services/product";
import { StateValue } from "../../StateProvider/StateProvider";

export default function Product({ product }) {
  const history = useHistory();
  const [state, dispatch] = StateValue();
  var imgData = null;
  const [isAdding, setIsAdding] = useState(false);

  imgData = arrayBufferToBase64(product.productImg.data);

  const productDetailHandler = () => {
    history.push(`/product/${product._id}`);
  };
  const deleteHandler = async () => {
    try {
      const data = await deleteProduct(product._id);
      if (data && data.status === 200) {
        const products = await getProducts();

        if (products) {
          alert("item deleted successfully");
          dispatch({ type: "Set_products", payload: products });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const AddtocartHandler = async () => {
    try {
      setIsAdding(true);
      const data = await addToCart({ id: product._id });
      setIsAdding(false);
      if (data) {
        alert("item added successfully");
        dispatch({ type: "InitialBasket", payload: data.cart.items });
      }

      history.push("/checkout");
      
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={productStyle.product_card}>
      <div style={{ flexDirection: "column", width: "min-content" ,padding:"10px"}}>
        <div className={productStyle.upper_card} onClick={productDetailHandler}>
          <div>
            <img src={`data:image/png;base64,${imgData}`} alt="..." />
          </div>

          <div>
            <p>{product.title}</p>
            <strong>
              Rs.<em>{product.price}</em>
            </strong>
          </div>
        </div>
        <div className={productStyle.lower_card}>
          <button
            className={productStyle.product_adToCartButton}
            disabled={isAdding}
            onClick={AddtocartHandler}
          >
           {isAdding?"adding...":"Add to cart"} 
          </button>
          {state.user?.email === "agarwalchirag112@gmail.com" ? (
            <button
              className={productStyle.product_adToCartButton}
              onClick={deleteHandler}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

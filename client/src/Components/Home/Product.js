import React, { useState } from "react";
import productStyle from "../../styles/product.module.css";
import { useHistory } from "react-router";
import { addToCart } from "../../services/product";
import { arrayBufferToBase64 } from "../../util/getImgBuffer";
import { getCartItems } from "../../services/user";
import { StateValue } from "../../StateProvider/StateProvider";

export default function Product({ product }) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [{}, dispatch] = StateValue();
  var imgData = null;

  imgData = arrayBufferToBase64(product.productImg.data);

  const productDetailHandler = () => {
    history.push(`/product/${product._id}`);
  };
  const AddtocartHandler = async () => {
    try {
      const data = await addToCart({ id: product._id });
      console.log(">>>>>", data.cart.items);
      if (data) {
        dispatch({ type: "InitialBasket", payload: data.cart.items });
      }
      history.push("/checkout");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={productStyle.product_card}>
      <div style={{ flexDirection: "column", width: "min-content" }}>
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
            onClick={AddtocartHandler}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

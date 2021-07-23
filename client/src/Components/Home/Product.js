import React from "react";
import productStyle from "../../styles/product.module.css";
import { StateValue } from "../../StateProvider/StateProvider";
// import { useSpring, animated } from "react-spring";

export default function Product({ title, imgUrl, id, price }) {
  const [state, dispatch] = StateValue();
  // let imgdata = new Buffer.from(state.user?.avatar.data).toString("ascii");

  const AddtocartHandler = () => {
    dispatch({
      type: "AddToCart",
      item: {
        title: title,
        imgUrl: imgUrl,
        id: id,
        price: price,
      },
    });
  };
  return (
    <div className={productStyle.product_card}>
      <div className="card" style={{ flexDirection: "column" }}>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <strong>
            Rs.<em>{price}</em>
          </strong>
        </div>
        <img className="card-img-top" src={imgUrl} alt="..." />

        <button
          className={productStyle.product_adToCartButton}
          onClick={AddtocartHandler}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

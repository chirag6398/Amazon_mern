import React from "react";
import productStyle from "../../styles/product.module.css";
import { useHistory } from "react-router";
// import { StateValue } from "../../StateProvider/StateProvider";
// import { useSpring, animated } from "react-spring";

export default function Product({ product }) {
  const history = useHistory();

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  var imgData = null;

  imgData = arrayBufferToBase64(product.productImg.data);

  const productDetailHandler = () => {
    history.push(`/product/${product._id}`);
  };
  const AddtocartHandler = () => {
    // dispatch({
    //   type: "AddToCart",
    //   item: {
    //     title: title,
    //     imgUrl: imgUrl,
    //     id: id,
    //     price: price,
    //   },
    // });
  };
  return (
    <div className={productStyle.product_card}>
      <div className="card" style={{ flexDirection: "column" }}>
        <div className={productStyle.upper_card} onClick={productDetailHandler}>
          <div>
            <img
              className="card-img-top"
              src={`data:image/png;base64,${imgData}`}
              alt="..."
            />
          </div>

          <div className="card-body">
            <p className="card-text">{product.title}</p>
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

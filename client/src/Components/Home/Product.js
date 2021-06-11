import React from "react";
import productStyle from "../../styles/product.module.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StateValue } from "../../StateProvider/StateProvider";
// import { useSpring, animated } from "react-spring";

export default function Product({ title, imgUrl, id, price }) {
  const [state, dispatch] = StateValue();
  // const style = useSpring({
  //   to: {
  //     transform: "scale(1.1)",
  //     boxShadow: "3px 3px 6px 3px black",
  //     delay: "5000",
  //   },
  //   from: {
  //     transition: "all 1s",
  //   },
  // });

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

        <buton
          className={productStyle.product_adToCartButton}
          onClick={AddtocartHandler}
        >
          Add to cart
        </buton>
      </div>
    </div>
  );
}

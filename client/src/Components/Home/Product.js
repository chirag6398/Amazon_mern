import React from "react";
import productStyle from "../../styles/product.module.css";
import { useHistory } from "react-router";
import { addToCart } from "../../services/product";
import { arrayBufferToBase64 } from "../../util/getImgBuffer";
export default function Product({ product }) {
  const history = useHistory();

  var imgData = null;

  imgData = arrayBufferToBase64(product.productImg.data);

  const productDetailHandler = () => {
    history.push(`/product/${product._id}`);
  };
  const AddtocartHandler = async () => {
    try {
      const data = await addToCart({ id: product._id });
    } catch (e) {
      console.log(e);
    }
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

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { StateValue } from "../StateProvider/StateProvider";
import { arrayBufferToBase64 } from "../util/getImgBuffer";

import { addToCart, getProduct } from "../services/product";
import prodtlStyle from "../styles/productDetail.module.css";

export default function ProductDetail() {
  const id = useParams();
  const history = useHistory();
  const [{}, dispatch] = StateValue();
  const [product, setProduct] = useState({
    price: null,
    desc: "",
    title: "",
    imgData: null,
  });
  const getData = async () => {
    try {
      const data = await getProduct(id.id);

      setProduct({
        price: data.price,
        title: data.title,
        desc: data.desc,
        imgData: data.productImg,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  var imgData = null;

  imgData = arrayBufferToBase64(product.imgData?.data);

  const addToCartHandler = async () => {
    try {
      const data = await addToCart(id);

      if (data) {
        dispatch({ type: "InitialBasket", payload: data.cart.items });
      }
      history.push("/checkout");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={prodtlStyle.ext_div}>
      <div className={prodtlStyle.main_container}>
        <div className={prodtlStyle.left_div}>
          <div className={prodtlStyle.img_con}>
            <img src={`data:image/png;base64,${imgData}`} alt="..." />
          </div>
        </div>
        <div className={prodtlStyle.right_div}>
          <div className={prodtlStyle.row}>
            <h3>{product.title}</h3>
          </div>
          <div className={prodtlStyle.row}>
            <span>Product Detail : </span>
            <p>{product.desc}</p>
          </div>
          <div className={prodtlStyle.row}>
            <span>Selling Price :</span>
            <p>Rs.{product.price}</p>
          </div>
          <div className={prodtlStyle.row}>
            <button className={prodtlStyle.button} onClick={addToCartHandler}>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

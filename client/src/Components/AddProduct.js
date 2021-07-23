import React, { useState } from "react";
import { uploadProduct } from "../services/product";
import RegisterStyle from "../styles/register.module.css";

export default function AddProduct() {
  const [product, setProduct] = useState({
    productImg: "",
  });
  const avatarHandler = (e) => {
    setProduct({ ...product, productImg: e.target.files[0] });
  };
  const formHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(product);
      const formData = new FormData();
      formData.append("productImg", product.productImg);
      // console.log(formData.productImg);
      const res = await uploadProduct(formData);
      console.log(res);
    } catch (e) {
      console.log("formhandler", e);
    }
  };
  return (
    <div>
      <form onSubmit={formHandler} encType="multipart/form-data">
        <div className={RegisterStyle.row}>
          <div className={RegisterStyle.rowContainer}>
            <span>Avatar</span>
            <input type="file" name="productImg" onChange={avatarHandler} />
          </div>
        </div>
        <div className={RegisterStyle.row}>
          <div className={RegisterStyle.rowContainer}>
            <input type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

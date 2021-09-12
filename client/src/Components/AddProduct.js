import React, { useState } from "react";
import { uploadProduct } from "../services/product";
import RegisterStyle from "../styles/register.module.css";

export default function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    productImg: "",
    desc: "",
    price: null,
  });
  const productImageHandler = (e) => {
    setProduct({ ...product, productImg: e.target.files[0] });
  };
  const inputHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const formHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(product);
      const formData = new FormData();
      formData.append("productImg", product.productImg);
      formData.append("title", product.title);
      formData.append("desc", product.desc);
      formData.append("price", product.price);

      const res = await uploadProduct(formData);
      console.log(res);
    } catch (e) {
      console.log("formhandler", e);
    }
  };
  return (
    <div className={RegisterStyle.addproduct__ext_div}>
      <div className={RegisterStyle.addproduct__main}>
        <div className={RegisterStyle.addproduct__heading}>
          <span>Add product</span>
        </div>
        <form onSubmit={formHandler} encType="multipart/form-data">
          <div className={RegisterStyle.row}>
            <div className={RegisterStyle.rowContainer}>
              <span>Product image</span>
              <input
                type="file"
                name="productImg"
                onChange={productImageHandler}
              />
            </div>
          </div>
          <div className={RegisterStyle.row}>
            <div className={RegisterStyle.rowContainer}>
              <span>Title</span>
              <input type="text" name="title" onChange={inputHandler} />
            </div>
          </div>
          <div className={RegisterStyle.row}>
            <div className={RegisterStyle.rowContainer}>
              <span>Description</span>
              <input type="text" name="desc" onChange={inputHandler} />
            </div>
          </div>
          <div className={RegisterStyle.row}>
            <div className={RegisterStyle.rowContainer}>
              <span>Price</span>
              <input type="number" name="price" onChange={inputHandler} />
            </div>
          </div>
          <div className={RegisterStyle.row}>
            <div className={RegisterStyle.rowContainer}>
              <input
                className={RegisterStyle.addproduct__submit}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
